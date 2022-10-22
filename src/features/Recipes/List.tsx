import { Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { ActionColumn, DeleteButton, EditButton, NoDataTd, ShowButton } from "../../components";
import { indexDate } from "../../dateUtils";
import { RECIPE_DELETE_MUTATION, RECIPES_COUNT_QUERY, RECIPES_QUERY } from "../../graphql/recipes";
import { useAppSelector, useList } from "../../hooks";
import { TRecipe } from "../../types";
import { editRecipePath, showRecipePath } from "../../urls";
import MetaList from "../MetaList";

export default function List() {
  const { t } = useTranslation(["recipes", "translation"]);
  const page = useAppSelector((state) => state.metaList.pages["recipes"] || 0);

  const { items, count, deleteItem } = useList<TRecipe>({
    query: RECIPES_QUERY,
    countQuery: RECIPES_COUNT_QUERY,
    deleteMutation: RECIPE_DELETE_MUTATION,
    variables: {
      limit: 25,
      offset: page * 25,
    },
    deletionMessage: t("recipes:list.deleted"),
  });

  return (
    <MetaList listKey="recipes" items={items} count={count} title={t("recipes:list.title")}>
      {(recipes) => (
        <Table>
          <thead>
            <tr>
              <th>{t("recipes:fieldnames.name")}</th>
              <th>{t("recipes:fieldnames.inserted_at")}</th>
              <th>{t("recipes:fieldnames.updated_at")}</th>
              <th>{t("recipes:fieldnames.tags")}</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            <NoDataTd data={recipes} />

            {recipes.map((recipe) => (
              <tr key={recipe.id}>
                <td>{recipe.name}</td>
                <td>{indexDate(recipe.insertedAt)}</td>
                <td>{indexDate(recipe.updatedAt)}</td>
                <td>{recipe.tags.map((tag) => tag.tag).join(", ")}</td>
                <ActionColumn>
                  <ShowButton as={Link} to={showRecipePath(recipe)}>
                    {t("translation:show")}
                  </ShowButton>
                  <EditButton as={Link} to={editRecipePath(recipe)}>
                    {t("translation:edit")}
                  </EditButton>
                  <DeleteButton onClick={() => deleteItem(recipe)}>{t("translation:delete")}</DeleteButton>
                </ActionColumn>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </MetaList>
  );
}
