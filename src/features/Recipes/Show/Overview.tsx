import _ from "lodash";
import { Form } from "react-bootstrap";
import { Trans, useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";

import { FormGroup } from "../../../components";
import { TIngredient, TRecipe } from "../../../types";
import { bringImportUri, showRecipePath } from "../../../urls";
import { recipeCalories, URI } from "../../../utils";
import { formatIntNumberRounded, formatNumber } from "../../../utils/numbers";

type TProps = {
  recipe: TRecipe;
  portions?: number;
  setPortions?: (portions: number) => void;
};

type TIngredientDict = Record<
  number,
  Record<number | string, { ingredient: TIngredient; unit: string; amount: number; annotation: string[] }>
>;

export default function Overview({ recipe, portions = 2, setPortions }: TProps) {
  const { t } = useTranslation(["recipes", "ingredients", "translation"]);
  const allIngredients: TIngredientDict = recipe.steps
    .flatMap((step) => step.stepIngredients)
    .reduce<TIngredientDict>((acc, stepIngredient) => {
      const key = stepIngredient.unit?.identifier || stepIngredient.ingredient.reference;

      acc[stepIngredient.ingredientId] ||= {};
      acc[stepIngredient.ingredientId][key] ||= {
        ingredient: stepIngredient.ingredient,
        unit: key,
        amount: 0,
        annotation: [],
      };

      if (stepIngredient.amount) {
        acc[stepIngredient.ingredientId][key].amount += stepIngredient.amount * (portions || 1);
      }

      if (stepIngredient.annotation) {
        acc[stepIngredient.ingredientId][key].annotation.push(stepIngredient.annotation);
      }

      return acc;
    }, {});

  const sortedIngredients: [number | string, TIngredientDict[number]][] = _.map(allIngredients, (row, id) => [id, row]);
  sortedIngredients.sort(([_id1, a], [_id2, b]) => {
    const aName = _.values(a)[0].ingredient.name;
    const bName = _.values(b)[0].ingredient.name;
    return aName.localeCompare(bName);
  });

  const calories = recipeCalories(recipe);
  const preparationTime = _.sumBy(recipe.steps, "preparationTime");
  const cookingTime = _.sumBy(recipe.steps, "cookingTime");

  return (
    <>
      {recipe.image && (
        <p className="recipes-show-image">
          <img src={`${URI}${recipe.image.large}`} alt="" />
        </p>
      )}

      <ul className="recipes-recipes-show-tags-list">
        {_(recipe.tags)
          .sortBy("name")
          .map((tag) => (
            <li className="tag" key={tag.id}>
              {tag.name}
            </li>
          ))
          .valueOf()}
      </ul>

      <h2>{t("recipes:show.ingredients")}</h2>

      {!!setPortions && (
        <FormGroup>
          <Form.Label>{t("recipes:show.no_portions")}</Form.Label>
          <Form.Control
            className="recipes-show-portions"
            type="number"
            step={1}
            min={1}
            value={portions}
            onChange={(ev) => setPortions(parseInt(ev.target.value, 10))}
          />
        </FormGroup>
      )}

      <ul className="recipes-show-overview-ingredients-list">
        {sortedIngredients.map(([id, outerRow]) =>
          _.map(outerRow, (row, unitId) => (
            <li key={`${id}-${unitId}`}>
              {!!row.amount && (
                <>
                  {formatNumber(row.amount)} {t(`ingredients:units.${row.unit}`)}{" "}
                </>
              )}
              {row.ingredient.name}
              {!!row.annotation.length && row.annotation.map((annotation) => <small>{annotation}</small>)}
            </li>
          ))
        )}
      </ul>

      <ReactMarkdown>{recipe.description || ""}</ReactMarkdown>

      <p>
        <a href={bringImportUri(recipe, portions)}>{t("recipes:show.import_in_bring")}</a>
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

        {recipe.fittingRecipes.length > 0 && (
          <>
            <h2>{t("recipes:show.fitting_recipes")}</h2>

            <ul>
              {recipe.fittingRecipes.map((fittingRecipe) => (
                <li key={fittingRecipe.id}>
                  <Link to={showRecipePath(fittingRecipe)}>{fittingRecipe.name}</Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
}
