import { useState } from "react";

import { useQuery } from "@apollo/client";

import _ from "lodash";
import { Form } from "react-bootstrap";
import { Trans, useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";

import { selectSession } from "../../../App/sessionSlice";
import { CancelButton, EditButton, FormGroup, Loading } from "../../../components";
import { RECIPE_QUERY } from "../../../graphql/recipes";
import { useAppSelector, useTitle } from "../../../hooks";
import may from "../../../permissions";
import { IRecipeQueryResult, TIngredient, TUnit } from "../../../types";
import { bringImportUri, editRecipePath, recipesPath } from "../../../urls";
import { recipeCalories } from "../../../utils";
import { formatIntNumberRounded, formatNumber } from "../../../utils/numbers";
import Steps from "./Steps";

export default function Show() {
  const [portions, setPortions] = useState(1);
  const [editMode, setEditMode] = useState(false);

  const { id } = useParams<"id">();
  const { t } = useTranslation(["recipes", "ingredients", "translation"]);
  const { user } = useAppSelector(selectSession);
  const { data } = useQuery<IRecipeQueryResult>(RECIPE_QUERY, { variables: { id } });

  useTitle(t("recipes:show.title", { name: data?.recipe.name || "…" }));

  const allIngredients = _(data?.recipe.steps)
    .flatMap((step) => step.stepIngredients)
    .map<[string, number, TUnit | null, TIngredient]>((stepIngredient) => [
      stepIngredient.id,
      stepIngredient.amount * (portions || 1),
      stepIngredient.unit,
      stepIngredient.ingredient,
    ])
    .valueOf();

  if (!data?.recipe) {
    return <Loading expand />;
  }

  const calories = recipeCalories(data.recipe);
  const preparationTime = _.sumBy(data.recipe.steps, "preparationTime");
  const cookingTime = _.sumBy(data.recipe.steps, "cookingTime");

  return (
    <>
      <h1>{t("recipes:show.title", { name: data.recipe.name || "…" })}</h1>

      {data.recipe.image && (
        <p className="recipes-show-image">
          <img src={data.recipe.image.medium} alt="" />
        </p>
      )}

      <ul className="recipes-tags-list">
        {data.recipe.tags.map((tag) => (
          <li key={tag.id}>{tag.name}</li>
        ))}
      </ul>

      <h2>Zutaten</h2>

      <FormGroup>
        <Form.Label>Anzahl Portionen</Form.Label>
        <Form.Control
          className="recipes-show-portions"
          type="number"
          step={1}
          min={1}
          value={portions}
          onChange={(ev) => setPortions(parseInt(ev.target.value, 10))}
        />
      </FormGroup>

      <ul>
        {allIngredients.map(([id, amount, unit, ingredient]) => (
          <li key={id}>
            {formatNumber(amount)} {t(`ingredients:units.${unit?.identifier || ingredient.reference}`)}{" "}
            {ingredient.name}
          </li>
        ))}
      </ul>

      <p>
        <a href={bringImportUri(data.recipe, portions)}>{t("recipes:show.import_in_bring")}</a>
      </p>

      <div>
        {t("recipes:show.calories_per_portion")}
        <ul className="recipes-show-calories-list">
          {!!calories.alc && (
            <li>
              {formatIntNumberRounded(calories.alc)} g {t("recipes:show.alc")}
            </li>
          )}
          {!!calories.fat && (
            <li>
              {formatIntNumberRounded(calories.fat)} g {t("recipes:show.fat")}
            </li>
          )}
          {!!calories.carbs && (
            <li>
              {formatIntNumberRounded(calories.carbs)} g {t("recipes:show.carbs")}
            </li>
          )}
          {!!calories.proteins && (
            <li>
              {formatIntNumberRounded(calories.proteins)} g {t("recipes:show.protein")}
            </li>
          )}
          {!!calories.calories && (
            <li>{t("recipes:show.and_therefore", { cal: formatIntNumberRounded(calories.calories) })}</li>
          )}
        </ul>

        <Trans parent="p" t={t} i18nKey="recipes:show.prep_and_cooking_time">
          Die Vorbereitungszeit beträgt {{ prepTime: formatIntNumberRounded(preparationTime) }} Minuten und und die
          Garzeit beträgt etwa {{ cookingTime: formatIntNumberRounded(cookingTime) }} Minuten.
        </Trans>
      </div>

      <ReactMarkdown>{data.recipe.description || ""}</ReactMarkdown>

      <Steps recipe={data.recipe} portions={portions || 1} editMode={editMode} />

      <div className="recipes-action-list">
        {may(user, "recipes", "edit", data.recipe) && (
          <>
            <EditButton as={Link} to={editRecipePath(data.recipe)}>
              {t("translation:edit")}
            </EditButton>

            {!editMode && <EditButton onClick={() => setEditMode(true)}>{t("recipes:show.edit_steps")}</EditButton>}
            {editMode && (
              <CancelButton onClick={() => setEditMode(false)}>{t("recipes:show.stop_edit_steps")}</CancelButton>
            )}
          </>
        )}

        <CancelButton as={Link} to={recipesPath()}>
          {t("translation:back")}
        </CancelButton>
      </div>
    </>
  );
}
