import { useQuery } from "@apollo/client";

import _ from "lodash";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";

import { RECIPE_QUERY } from "../../../graphql/recipes";
import { useTitle } from "../../../hooks";
import { IRecipeQueryResult, TIngredient } from "../../../types";
import Steps from "./Steps";

export default function Show() {
  const { id } = useParams<"id">();
  const { t } = useTranslation(["recipes", "translation"]);
  const { data } = useQuery<IRecipeQueryResult>(RECIPE_QUERY, { variables: { id } });

  useTitle(t("recipes:show.title", { name: data?.recipe.name || "…" }));

  const allIngredients = _(data?.recipe.steps)
    .flatMap((step) => step.stepIngredients)
    .map<[string, TIngredient]>((stepIngredient) => [stepIngredient.id, stepIngredient.ingredient])
    .valueOf();

  return (
    <>
      <h1>{t("recipes:show.title", { name: data?.recipe.name || "…" })}</h1>

      <ul className="recipes-show-tags-list">
        {data?.recipe.tags.map((tag) => (
          <li key={tag.id}>{tag.name}</li>
        ))}
      </ul>

      <h2>Zutaten</h2>

      <ul>
        {allIngredients.map(([id, ingredient]) => (
          <li key={id}>{ingredient.name}</li>
        ))}
      </ul>

      <ReactMarkdown>{data?.recipe.description || ""}</ReactMarkdown>

      <Steps recipe={data?.recipe} />
    </>
  );
}
