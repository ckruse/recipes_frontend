import { useState } from "react";

import { useMutation } from "@apollo/client";

import { Form, Formik, FormikHelpers } from "formik";
import { TFunction } from "i18next";
import _ from "lodash";
import { nanoid } from "nanoid";
import { Form as BsForm, Col, Modal, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { OnChangeValue } from "react-select";
import * as yup from "yup";

import { AddButton, CancelButton, DeleteButton, FormGroup, SaveButton } from "../../../components";
import { Input, Select, Textarea } from "../../../components/Form";
import { IngredientSelector } from "../../../components/Form/IngredientSelector";
import { CREATE_RECIPE_STEP_MUTATION, UPDATE_RECIPE_STEP_MUTATION } from "../../../graphql/recipes";
import { MutationError } from "../../../handleError";
import { useAppDispatch } from "../../../hooks";
import {
  ICreateRecipeStepMutation,
  IUpdateRecipeStepMutation,
  Nilable,
  Nullable,
  TIngredient,
  TRecipe,
  TStep,
} from "../../../types";
import { parsedInt } from "../../../utils/numbers";
import Flash from "../../Flash";
import { addErrorFlash, addSuccessFlash } from "../../Flash/flashSlice";

type TProps = {
  step: Nullable<TStep>;
  recipe: TRecipe;
  show: boolean;
  toggle: () => void;
};

type TIngredientRow = {
  id: string;
  amount: Nullable<number>;
  unitId: Nullable<string>;
  annotation: Nullable<string>;
  ingredientId: string;
  ingredient?: TIngredient;
};

type TValues = {
  name: Nullable<string>;
  position: number;
  preparationTime: number;
  cookingTime: number;
  description: string;
  stepIngredients: TIngredientRow[];
};

const initialValues = (recipe: TRecipe, step: Nullable<TStep>): TValues => ({
  name: step?.name || null,
  position: step?.position || (_.maxBy(recipe.steps, "position")?.position || 0) + 1,
  preparationTime: step?.preparationTime || 0,
  cookingTime: step?.cookingTime || 0,
  description: step?.description || "",
  stepIngredients:
    step?.stepIngredients.map((stepIng) => ({
      id: stepIng.id,
      amount: stepIng.amount,
      unitId: stepIng.unitId || "-",
      ingredientId: stepIng.ingredientId,
      ingredient: stepIng.ingredient,
      annotation: stepIng.annotation,
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

const validationSchema = (t: TFunction) =>
  yup.object().shape({
    description: yup.string().required(t("recipes:step_modal.description_required")),
    stepIngredients: yup.array().of(
      yup.object().shape({
        amount: yup.number().nullable().min(0, t("recipes:step_modal.amount_min")),
        ingredientId: yup.number().required(t("recipes:step_modal.ingredient_required")),
      })
    ),
  });

export default function StepModal({ show, step, recipe, toggle }: TProps) {
  const [portions, setPortions] = useState(1);

  const { t } = useTranslation(["translation", "recipes", "ingredients"]);
  const dispatch = useAppDispatch();
  const [createStep] = useMutation<ICreateRecipeStepMutation>(CREATE_RECIPE_STEP_MUTATION, {
    refetchQueries: ["recipe"],
  });
  const [updateStep] = useMutation<IUpdateRecipeStepMutation>(UPDATE_RECIPE_STEP_MUTATION, {
    refetchQueries: ["recipe"],
  });

  async function save(values: TValues, { setSubmitting }: FormikHelpers<TValues>) {
    try {
      setSubmitting(true);

      const stepData = {
        ...values,
        stepIngredients: values.stepIngredients.map(({ ingredient, ...si }) => {
          let newSi: Partial<typeof si> = { ...si };
          if (newSi.unitId === "-") {
            newSi.unitId = null;
          }

          if (!newSi.amount) {
            delete newSi.amount;
          }

          if (!newSi.annotation) {
            delete newSi.annotation;
          }

          if (typeof newSi.id === "string" && newSi.id.match(/^new__/)) {
            delete newSi.id;
          }

          newSi.amount! /= portions;

          return newSi;
        }),
      };

      if (step?.id) {
        const { data, errors } = await updateStep({
          variables: {
            id: step.id,
            step: stepData,
          },
        });

        if (!data?.updateStep) {
          // TODO: handle error
          console.log(errors);
          throw new MutationError(undefined);
        }
      } else {
        const { data, errors } = await createStep({
          variables: {
            recipeId: recipe.id,
            step: stepData,
          },
        });

        if (!data?.createStep) {
          // TODO: handle error
          console.log(errors);
          throw new MutationError(undefined);
        }
      }

      dispatch(addSuccessFlash(t("recipes:step_modal.success")));
      resetForm();
    } catch (e) {
      console.error(e);
      dispatch(addErrorFlash(t("translation:errors.general")));
      setSubmitting(false);
    }
  }

  function resetForm() {
    setPortions(1);
    toggle();
  }

  return (
    <Modal show={show} size="lg" onHide={resetForm}>
      <Formik validationSchema={validationSchema(t)} initialValues={initialValues(recipe, step)} onSubmit={save}>
        {({ values, setFieldValue }) => {
          function addIngredient() {
            const newEntry: TIngredientRow = {
              id: `new__${nanoid()}`,
              amount: 0,
              unitId: null,
              ingredientId: "",
              annotation: null,
            };
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
                <Flash />

                <FormGroup>
                  <BsForm.Label htmlFor="name">{t("recipes:fieldnames_step_ingredient.name")}</BsForm.Label>
                  <Input id="name" name="name" />
                  <BsForm.Text>{t("recipes:step_modal.name_is_optional")}</BsForm.Text>
                </FormGroup>

                <FormGroup>
                  <BsForm.Label htmlFor="portions">{t("recipes:step_modal.portions")}</BsForm.Label>
                  <BsForm.Control
                    type="number"
                    id="portions"
                    value={portions}
                    step={1}
                    min={1}
                    onChange={(ev) => setPortions(parsedInt(ev.target.value))}
                  />
                  <BsForm.Text>{t("recipes:step_modal.portions_explanation")}</BsForm.Text>
                </FormGroup>

                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <BsForm.Label htmlFor="preparationTime">
                        {t("recipes:fieldnames_step_ingredient.preparation_time")}
                      </BsForm.Label>
                      <Input type="number" name="preparationTime" id="preparationTime" />
                    </FormGroup>
                  </Col>

                  <Col md={6}>
                    <FormGroup>
                      <BsForm.Label htmlFor="cookingTime">
                        {t("recipes:fieldnames_step_ingredient.cooking_time")}
                      </BsForm.Label>
                      <Input type="number" name="cookingTime" id="cookingTime" />
                    </FormGroup>
                  </Col>
                </Row>

                <FormGroup>
                  <BsForm.Label htmlFor="description">
                    {t("recipes:fieldnames_step_ingredient.description")}
                  </BsForm.Label>
                  <Textarea name="description" id="description" />
                </FormGroup>

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
                            step={0.01}
                            min={0.01}
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

                        <FormGroup>
                          <BsForm.Label htmlFor={`stepIngredients.${i}.annotation`}>
                            {t("recipes:fieldnames_step_ingredient.annotation")}
                          </BsForm.Label>
                          <Input
                            type="text"
                            id={`stepIngredients.${i}.annotation`}
                            name={`stepIngredients.${i}.annotation`}
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
              </Modal.Body>

              <Modal.Footer>
                <SaveButton type="submit">{t("translation:save")}</SaveButton>
                <CancelButton onClick={resetForm}>{t("translation:cancel")}</CancelButton>
              </Modal.Footer>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
}
