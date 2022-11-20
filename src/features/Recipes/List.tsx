import { ButtonGroup } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { DeleteButton, EditButton, ShowButton } from "../../components";
import { indexDate } from "../../dateUtils";
import { RECIPE_DELETE_MUTATION, RECIPES_COUNT_QUERY, RECIPES_QUERY } from "../../graphql/recipes";
import { useAppSelector, useDebouncedCallback, useList } from "../../hooks";
import { TRecipe } from "../../types";
import { editRecipePath, recipesPath, showRecipePath } from "../../urls";
import MetaList from "../MetaList";
import Searchbar from "./Searchbar";

export default function List() {
  const { t } = useTranslation(["recipes", "translation"]);
  const page = useAppSelector((state) => state.metaList.pages["recipes"] || 0);
  const { search: queryString } = useLocation();
  const navigate = useNavigate();
  const search = (new URLSearchParams(queryString).get("search") || "").trim();

  const { items, count, deleteItem } = useList<TRecipe>({
    query: RECIPES_QUERY,
    countQuery: RECIPES_COUNT_QUERY,
    deleteMutation: RECIPE_DELETE_MUTATION,
    variables: {
      search,
      limit: 25,
      offset: page * 25,
    },
    deletionMessage: t("recipes:list.deleted"),
  });

  const doSearch = useDebouncedCallback((search: string) => {
    navigate(recipesPath(search));
  }, 500);

  return (
    <MetaList
      listKey="recipes"
      items={items}
      count={count}
      title={t("recipes:list.title")}
      searchBar={() => <Searchbar setSearch={doSearch} searchTerm={search} />}
    >
      {(recipes) => (
        <ul className="recipes-list">
          {recipes.map((recipe) => (
            <li className="recipes-list-item" key={recipe.id}>
              <h3>{recipe.name}</h3>

              <span className="calories">{recipe.calories} kcal</span>
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
