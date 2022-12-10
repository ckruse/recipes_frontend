import { useState } from "react";

import { useMutation } from "@apollo/client";

import _ from "lodash";
import { ButtonGroup } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";

import { selectSession } from "../../../App/sessionSlice";
import { AddButton, DeleteButton, EditButton } from "../../../components";
import { DELETE_RECIPE_STEP_MUTATION } from "../../../graphql/recipes";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import may from "../../../permissions";
import { IDeleteRecipeStepMutation, Nullable, TRecipe, TStep } from "../../../types";
import { formatNumber } from "../../../utils/numbers";
import { addErrorFlash, addSuccessFlash } from "../../Flash/flashSlice";
import StepModal from "./StepModal";

type TProps = {
  recipe: TRecipe | undefined;
  portions: number;
  editMode: boolean;
};

export default function Steps({ recipe, portions, editMode }: TProps) {
  const session = useAppSelector(selectSession);
  const { t } = useTranslation(["translation", "recipes", "ingredients"]);
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState<{ show: boolean; step: Nullable<TStep> }>({ show: false, step: null });
  const [deleteStepMutation] = useMutation<IDeleteRecipeStepMutation>(DELETE_RECIPE_STEP_MUTATION, {
    refetchQueries: ["recipe"],
  });

  async function deleteStep(step: TStep) {
    try {
      const { data, errors } = await deleteStepMutation({ variables: { id: step.id } });
      if (!data?.deleteStep) {
        console.log(errors);
        throw new Error("delete failed");
      }

      dispatch(addSuccessFlash(t("recipes:show.step_deleted")));
    } catch (e) {
      dispatch(addErrorFlash(t("translation:errors.general")));
      console.error(e);
    }
  }

  if (!recipe) {
    return null;
  }

  return (
    <>
      <h2>{t("recipes:show.steps")}</h2>

      <ol className="recipes-show-steps-list">
        {_(recipe.steps)
          .sortBy("position")
          .map((step, i) => (
            <li key={step.id}>
              <h3>Schritt {i + 1}</h3>

              <ul className="recipes-recipe-show-steps-list-ingredients-list">
                {step.stepIngredients.map((stepIng) => (
                  <li key={stepIng.id}>
                    {formatNumber(stepIng.amount * portions)}{" "}
                    {t(`ingredients:units.${stepIng.unit?.identifier || stepIng.ingredient.reference}`)}{" "}
                    {stepIng.ingredient.name}
                  </li>
                ))}
              </ul>

              <ReactMarkdown>{step.description}</ReactMarkdown>

              {may(session.user, "recipes", "edit", recipe) && editMode && (
                <ButtonGroup size="sm">
                  <EditButton onClick={() => setShowModal({ show: true, step })}>{t("translation:edit")}</EditButton>

                  <DeleteButton onClick={() => deleteStep(step)}>{t("translation:delete")}</DeleteButton>
                </ButtonGroup>
              )}
            </li>
          ))
          .valueOf()}
      </ol>

      {may(session.user, "recipes", "edit", recipe) && editMode && (
        <AddButton size="sm" onClick={() => setShowModal({ step: null, show: true })}>
          {t("recipes:show.add_step")}
        </AddButton>
      )}

      <StepModal
        toggle={() => setShowModal({ show: false, step: null })}
        show={showModal.show}
        recipe={recipe}
        step={showModal.step}
      />
    </>
  );
}
