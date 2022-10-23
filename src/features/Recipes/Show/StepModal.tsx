import { useMutation } from "@apollo/client";

import { Form, Formik, FormikHelpers } from "formik";
import _ from "lodash";
import { nanoid } from "nanoid";
import { Form as BsForm, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import { AddButton, CancelButton, DeleteButton, FormGroup, SaveButton } from "../../../components";
import { Input, Select, Textarea } from "../../../components/Form";
import { IngredientSelector } from "../../../components/Form/IngredientSelector";
import { RECIPE_STEP_MUTATION } from "../../../graphql/recipes";
import { MutationError } from "../../../handleError";
import { useAppDispatch } from "../../../hooks";
import { IRecipeStepMutation, Nullable, TRecipe, TStep } from "../../../types";
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
  unit: string;
  ingredientId: string;
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
      unit: stepIng.unit,
      ingredientId: stepIng.ingredientId,
    })) || [],
});

export default function StepModal({ show, step, recipe, toggle }: TProps) {
  const { t } = useTranslation(["translation", "recipes"]);
  const dispatch = useAppDispatch();
  const [mutateStep] = useMutation<IRecipeStepMutation>(RECIPE_STEP_MUTATION);

  async function save(values: TValues, { setSubmitting }: FormikHelpers<TValues>) {
    try {
      setSubmitting(true);

      const stepData = {
        ...values,
        stepIngredients: values.stepIngredients.map((si) => {
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
            const newEntry: TIngredientRow = { id: `new__${nanoid()}`, amount: 0, unit: "G", ingredientId: "" };
            setFieldValue("stepIngredients", [...values.stepIngredients, newEntry]);
          }

          function delIngredient(id: string) {
            setFieldValue(
              "stepIngredients",
              values.stepIngredients.filter((si) => si.id !== id)
            );
          }

          const unitOptions = _.map(t("recipes:units", { returnObjects: true }), (v, k) => ({ label: v, value: k }));

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
                            id={`stepIngredients.${i}.ingredientId`}
                            name={`stepIngredients.${i}.ingredientId`}
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
                          <BsForm.Label htmlFor={`stepIngredients.${i}.unit`}>
                            {t("recipes:fieldnames_step_ingredient.unit")}
                          </BsForm.Label>
                          <Select
                            id={`stepIngredients.${i}.unit`}
                            name={`stepIngredients.${i}.unit`}
                            options={unitOptions}
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
                  <BsForm.Label htmlFor="description">Beschreibung</BsForm.Label>
                  <Textarea name="description" id="description" />
                </FormGroup>
              </Modal.Body>

              <Modal.Footer>
                <SaveButton type="submit">speichern</SaveButton>
                <CancelButton onClick={toggle}>abbrechen</CancelButton>
              </Modal.Footer>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
}
