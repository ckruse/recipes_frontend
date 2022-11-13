import { useState } from "react";

import _ from "lodash";
import { ButtonGroup } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";

import { selectSession } from "../../../App/sessionSlice";
import { AddButton, DeleteButton, EditButton } from "../../../components";
import { useAppSelector } from "../../../hooks";
import may from "../../../permissions";
import { Nullable, TRecipe, TStep } from "../../../types";
import StepModal from "./StepModal";

type TProps = {
  recipe: TRecipe | undefined;
  portions: number;
  editMode: boolean;
};

export default function Steps({ recipe, portions, editMode }: TProps) {
  const session = useAppSelector(selectSession);
  const { t } = useTranslation(["translation", "recipes", "ingredients"]);
  const [showModal, setShowModal] = useState<{ show: boolean; step: Nullable<TStep> }>({ show: false, step: null });

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
                    {stepIng.amount * portions}{" "}
                    {t(`ingredients:units.${stepIng.unit?.identifier || stepIng.ingredient.reference}`)}{" "}
                    {stepIng.ingredient.name}
                  </li>
                ))}
              </ul>

              <ReactMarkdown>{step.description}</ReactMarkdown>

              {may(session.user, "recipes", "edit", recipe) && editMode && (
                <ButtonGroup size="sm">
                  <EditButton onClick={() => setShowModal({ show: true, step })}>{t("translation:edit")}</EditButton>

                  <DeleteButton>{t("translation:delete")}</DeleteButton>
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
