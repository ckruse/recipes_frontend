import { useQuery } from "@apollo/client";

import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";

import { RECIPE_QUERY } from "../../graphql/recipes";
import { useTitle } from "../../hooks";
import { IRecipeQueryResult } from "../../types";

export default function Show() {
  const { id } = useParams<"id">();
  const { t } = useTranslation(["recipes", "translation"]);
  const { data } = useQuery<IRecipeQueryResult>(RECIPE_QUERY, { variables: { id } });

  useTitle(t("recipes:show.title", { name: data?.recipe.name || "…" }));

  return (
    <>
      <h1>{t("recipes:show.title", { name: data?.recipe.name || "…" })}</h1>

      <ul>
        {data?.recipe.tags.map((tag) => (
          <li key={tag.id}>{tag.tag}</li>
        ))}
      </ul>

      <ReactMarkdown>{data?.recipe.description || ""}</ReactMarkdown>
    </>
  );
}
