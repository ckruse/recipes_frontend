import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

import { RECIPE_DELETE_MUTATION, RECIPES_COUNT_QUERY, RECIPES_QUERY } from "../../graphql/recipes";
import { useAppSelector, useDebouncedCallback, useList } from "../../hooks";
import { TRecipe } from "../../types";
import { recipesPath } from "../../urls";
import MetaList from "../MetaList";
import ListItem from "./ListItem";
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
            <ListItem key={recipe.id} recipe={recipe} deleteItem={deleteItem} />
          ))}
        </ul>
      )}
    </MetaList>
  );
}
