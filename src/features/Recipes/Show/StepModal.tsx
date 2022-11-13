import { useMutation } from "@apollo/client";

import { Form, Formik, FormikHelpers } from "formik";
import { TFunction } from "i18next";
import _ from "lodash";
import { nanoid } from "nanoid";
import { Form as BsForm, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { OnChangeValue } from "react-select";

import { AddButton, CancelButton, DeleteButton, FormGroup, SaveButton } from "../../../components";
import { Input, Select, Textarea } from "../../../components/Form";
import { IngredientSelector } from "../../../components/Form/IngredientSelector";
import { RECIPE_STEP_MUTATION } from "../../../graphql/recipes";
import { MutationError } from "../../../handleError";
import { useAppDispatch } from "../../../hooks";
import { IRecipeStepMutation, Nilable, Nullable, TIngredient, TRecipe, TStep } from "../../../types";
import { addErrorFlash, addSuccessFlash } from "../../Flash/flashSlice";

type TProps = {
  step: Nullable<TStep>;
  recipe: TRecipe;
  show: boolean;
  toggle: () => void;
};

type TIngredientRow = {
  id: string;
  amount: number;
  unitId: Nullable<string>;
  ingredientId: string;
  ingredient?: TIngredient;
};

type TValues = {
  position: number;
  description: string;
  stepIngredients: TIngredientRow[];
};

const initialValues = (recipe: TRecipe, step: Nullable<TStep>): TValues => ({
  position: step?.position || recipe.steps.length,
  description: step?.description || "",
  stepIngredients:
    step?.stepIngredients.map((stepIng) => ({
      id: stepIng.id,
      amount: stepIng.amount,
      unitId: stepIng.unitId || "-",
      ingredientId: stepIng.ingredientId,
      ingredient: stepIng.ingredient,
    })) || [],
});

const unitOptions = (t: TFunction, si: TIngredientRow) => {
  if (!si.ingredient) return [];

  return [
    { value: "-", label: t(`ingredients:units.${si.ingredient.reference}`) },
    ...si.ingredient.units.map((unit) => ({
      value: unit.id,
      label: t(`ingredients:units.${unit.identifier}`),
    })),
  ];
};

export default function StepModal({ show, step, recipe, toggle }: TProps) {
  const { t } = useTranslation(["translation", "recipes", "ingredients"]);
  const dispatch = useAppDispatch();
  const [mutateStep] = useMutation<IRecipeStepMutation>(RECIPE_STEP_MUTATION, { refetchQueries: ["recipe"] });

  async function save(values: TValues, { setSubmitting }: FormikHelpers<TValues>) {
    try {
      setSubmitting(true);

      const stepData = {
        ...values,
        stepIngredients: values.stepIngredients.map(({ ingredient, ...si }) => {
          si = { ...si };
          if (si.unitId === "-") {
            si.unitId = null;
          }

          if (si.id.match(/^new__/)) {
            return _.omit(si, ["id"]);
          }

          return si;
        }),
      };

      const { data } = await mutateStep({
        variables: {
          recipeId: recipe.id,
          id: step?.id,
          step: stepData,
        },
      });

      if (!data?.mutateStep.successful) {
        throw new MutationError(data?.mutateStep);
      }

      dispatch(addSuccessFlash(t("recipes:step_modal.success")));
      toggle();
    } catch (e) {
      console.error(e);
      dispatch(addErrorFlash(t("translation:errors.general")));
      setSubmitting(false);
    }
  }

  return (
    <Modal onHide={toggle} show={show} size="lg">
      <Formik initialValues={initialValues(recipe, step)} onSubmit={save}>
        {({ values, setFieldValue }) => {
          function addIngredient() {
            const newEntry: TIngredientRow = { id: `new__${nanoid()}`, amount: 0, unitId: null, ingredientId: "" };
            setFieldValue("stepIngredients", [...values.stepIngredients, newEntry]);
          }

          function delIngredient(id: string) {
            setFieldValue(
              "stepIngredients",
              values.stepIngredients.filter((si) => si.id !== id)
            );
          }

          function changeIngredient(idx: number, value: OnChangeValue<{ ingredient: Nilable<TIngredient> }, false>) {
            const ingredient = value?.ingredient;

            if (!ingredient) {
              return;
            }

            setFieldValue(`stepIngredients.${idx}.ingredientId`, ingredient.id);
            setFieldValue(`stepIngredients.${idx}.ingredient`, ingredient);
          }

          return (
            <Form>
              <Modal.Header closeButton>
                <Modal.Title>
                  {t(!!step ? "recipes:step_modal.title_edit" : "recipes:step_modal.title_new")}
                </Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <fieldset>
                  <legend>{t("recipes:step_modal.ingredients")}</legend>

                  <ul className="recipes-show-step-model-ingredients-list">
                    {values.stepIngredients.map((si, i) => (
                      <li key={si.id}>
                        <FormGroup>
                          <BsForm.Label htmlFor={`stepIngredients.${i}.ingredientId`}>
                            {t("recipes:fieldnames_step_ingredient.ingredient_id")}
                          </BsForm.Label>
                          <IngredientSelector
                            defaultValue={
                              si.ingredient
                                ? { label: si.ingredient.name, value: si.ingredient.id, ingredient: si.ingredient }
                                : undefined
                            }
                            id={`stepIngredients.${i}.ingredientId`}
                            name={`stepIngredients.${i}.ingredientId`}
                            onChange={(ev) => changeIngredient(i, ev)}
                          />
                        </FormGroup>

                        <FormGroup>
                          <BsForm.Label htmlFor={`stepIngredients.${i}.amount`}>
                            {t("recipes:fieldnames_step_ingredient.amount")}
                          </BsForm.Label>
                          <Input
                            type="number"
                            step={1}
                            min={1}
                            id={`stepIngredients.${i}.amount`}
                            name={`stepIngredients.${i}.amount`}
                          />
                        </FormGroup>

                        <FormGroup>
                          <BsForm.Label htmlFor={`stepIngredients.${i}.unitId`}>
                            {t("recipes:fieldnames_step_ingredient.unit")}
                          </BsForm.Label>
                          <Select
                            id={`stepIngredients.${i}.unitId`}
                            name={`stepIngredients.${i}.unitId`}
                            options={unitOptions(t, si)}
                          />
                        </FormGroup>

                        <DeleteButton size="sm" onClick={() => delIngredient(si.id)}>
                          {t("translation:delete")}
                        </DeleteButton>
                      </li>
                    ))}
                  </ul>

                  <AddButton size="sm" onClick={addIngredient}>
                    {t("recipes:step_modal.add_ingredient")}
                  </AddButton>
                </fieldset>

                <FormGroup>
                  <BsForm.Label htmlFor="description">
                    {t("recipes:fieldnames_step_ingredient.description")}
                  </BsForm.Label>
                  <Textarea name="description" id="description" />
                </FormGroup>
              </Modal.Body>

              <Modal.Footer>
                <SaveButton type="submit">{t("translation:save")}</SaveButton>
                <CancelButton onClick={toggle}>{t("translation:cancel")}</CancelButton>
              </Modal.Footer>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
}
