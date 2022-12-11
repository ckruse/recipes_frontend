import _ from "lodash";
import { Form } from "react-bootstrap";
import { Trans, useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";

import { FormGroup } from "../../../components";
import { TIngredient, TRecipe, TUnit } from "../../../types";
import { bringImportUri } from "../../../urls";
import { recipeCalories, URI } from "../../../utils";
import { formatIntNumberRounded, formatNumber } from "../../../utils/numbers";

type TProps = {
  recipe: TRecipe;
  portions?: number;
  setPortions?: (portions: number) => void;
};

export default function Overview({ recipe, portions = 2, setPortions }: TProps) {
  const { t } = useTranslation(["recipes", "ingredients", "translation"]);
  const allIngredients = _(recipe.steps)
    .flatMap((step) => step.stepIngredients)
    .map<[string, number | null, TUnit | null, string | null, TIngredient]>((stepIngredient) => [
      stepIngredient.id,
      stepIngredient.amount ? stepIngredient.amount * (portions || 1) : null,
      stepIngredient.unit,
      stepIngredient.annotation,
      stepIngredient.ingredient,
    ])
    .valueOf();

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

      <ul className="recipes-tags-list">
        {_(recipe.tags)
          .sortBy("name")
          .map((tag) => <li key={tag.id}>{tag.name}</li>)
          .valueOf()}
      </ul>

      <h2>Zutaten</h2>

      {!!setPortions && (
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
      )}

      <ul className="recipes-show-overview-ingredients-list">
        {allIngredients.map(([id, amount, unit, annotation, ingredient]) => (
          <li key={id}>
            {!!amount && (
              <>
                {formatNumber(amount)} {t(`ingredients:units.${unit?.identifier || ingredient.reference}`)}{" "}
              </>
            )}
            {ingredient.name}
            {!!annotation && <small>{annotation}</small>}
          </li>
        ))}
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
      </div>
    </>
  );
}
