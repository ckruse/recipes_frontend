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
};

export default function Steps({ recipe }: TProps) {
  const session = useAppSelector(selectSession);
  const { t } = useTranslation(["translation", "recipes"]);
  const [showModal, setShowModal] = useState<{ show: boolean; step: Nullable<TStep> }>({ show: false, step: null });

  if (!recipe) {
    return null;
  }

  return (
    <>
      <h2>Arbeitsschritte</h2>

      <ol className="recipes-show-steps-list">
        {_(recipe.steps)
          .sortBy("position")
          .map((step) => (
            <li key={step.id}>
              <ReactMarkdown>{step.description}</ReactMarkdown>

              <ul>
                {step.stepIngredients.map((stepIng) => (
                  <li key={stepIng.id}>
                    {stepIng.amount} {stepIng.unit} {stepIng.ingredient.name}
                  </li>
                ))}
              </ul>

              {may(session.user, "recipes", "edit", recipe) && (
                <ButtonGroup size="sm">
                  <EditButton onClick={() => setShowModal({ show: true, step })}>{t("translation:edit")}</EditButton>

                  <DeleteButton>{t("translation:delete")}</DeleteButton>
                </ButtonGroup>
              )}
            </li>
          ))
          .valueOf()}
      </ol>

      {may(session.user, "recipes", "edit", recipe) && (
        <AddButton size="sm" onClick={() => setShowModal({ step: null, show: true })}>
          Abeitsschritt hinzufügen
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
