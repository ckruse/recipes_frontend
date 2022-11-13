import { ButtonGroup } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { DeleteButton, EditButton, ShowButton } from "../../components";
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
        <ul className="recipes-list">
          {recipes.map((recipe) => (
            <li className="recipes-list-item" key={recipe.id}>
              <h3>{recipe.name}</h3>

              <span className="created">{indexDate(recipe.insertedAt)}</span>

              <ul className="recipes-tags-list">
                {recipe.tags.map((tag) => (
                  <li key={tag.id}>{tag.name}</li>
                ))}
              </ul>

              <ButtonGroup size="sm">
                <ShowButton as={Link} to={showRecipePath(recipe)}>
                  {t("translation:show")}
                </ShowButton>
                <EditButton as={Link} to={editRecipePath(recipe)}>
                  {t("translation:edit")}
                </EditButton>
                <DeleteButton onClick={() => deleteItem(recipe)}>{t("translation:delete")}</DeleteButton>
              </ButtonGroup>
            </li>
          ))}
        </ul>
      )}
    </MetaList>
  );
}
