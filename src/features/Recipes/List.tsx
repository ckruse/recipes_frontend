import { ButtonGroup } from "react-bootstrap";
import { Trans, useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { selectSession } from "../../App/sessionSlice";
import { DeleteButton, ShowButton } from "../../components";
import { indexDate } from "../../dateUtils";
import { RECIPE_DELETE_MUTATION, RECIPES_COUNT_QUERY, RECIPES_QUERY } from "../../graphql/recipes";
import { useAppSelector, useDebouncedCallback, useList } from "../../hooks";
import may from "../../permissions";
import { TRecipe } from "../../types";
import { recipesPath, showRecipePath } from "../../urls";
import { recipeCalories, URI } from "../../utils";
import { formatIntNumberRounded } from "../../utils/numbers";
import MetaList from "../MetaList";
import Searchbar from "./Searchbar";

export default function List() {
  const { t } = useTranslation(["recipes", "translation"]);
  const { user } = useAppSelector(selectSession);
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
              {!!recipe.image && <img className="recipe-preview" src={`${URI}${recipe.image.thumb}`} alt="" />}

              <h3>{recipe.name}</h3>

              <Trans parent="span" className="calories" t={t} i18nKey="recipes:list.calories">
                {{ calories: formatIntNumberRounded(recipeCalories(recipe).calories) }} kcal pro Portion
              </Trans>
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
                {may(user, "recipes", "create") && (
                  <DeleteButton onClick={() => deleteItem(recipe)}>{t("translation:delete")}</DeleteButton>
                )}
              </ButtonGroup>
            </li>
          ))}
        </ul>
      )}
    </MetaList>
  );
}
