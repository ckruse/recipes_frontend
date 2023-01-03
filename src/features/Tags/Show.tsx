import { useQuery } from "@apollo/client";

import { Trans, useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";

import { RECIPES_COUNT_QUERY, RECIPES_QUERY } from "../../graphql/recipes";
import { TAG_QUERY } from "../../graphql/tags";
import { useAppSelector, useList } from "../../hooks";
import { ITagData, TRecipe } from "../../types";
import { showRecipePath } from "../../urls";
import { parsedInt } from "../../utils/numbers";
import MetaList from "../MetaList";

export default function Show() {
  const { id } = useParams<"id">();
  const { t } = useTranslation(["tags", "translation"]);

  const page = useAppSelector((state) => state.metaList.pages[`tags/${id}`] || 0);

  const { data } = useQuery<ITagData>(TAG_QUERY, { variables: { id: parsedInt(id) } });

  const { items, count } = useList<TRecipe>({
    query: RECIPES_QUERY,
    countQuery: RECIPES_COUNT_QUERY,
    variables: {
      tags: [data?.tag.name],
      limit: 25,
      offset: page * 25,
    },
  });

  return (
    <>
      <h1>{t("tags:show.title", { tag: data?.tag.name || "…" })}</h1>

      <Trans parent="p" t={t} i18nKey="tags:show.no_recipes" count={count}>
        Diesem Tag sind {{ count }} Rezepte zugeordnet.
      </Trans>

      <MetaList
        listKey="recipes"
        items={items}
        count={count}
        title={t("tags:show.title", { tag: data?.tag.name || "…" })}
      >
        {(recipes) => (
          <ul>
            {recipes.map((recipe) => (
              <li key={recipe.id}>
                <Link to={showRecipePath(recipe)}>{recipe.name}</Link>
              </li>
            ))}
          </ul>
        )}
      </MetaList>
    </>
  );
}
