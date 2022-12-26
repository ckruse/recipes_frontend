import { useState } from "react";

import { RANDOM_RECIPES_QUERY } from "../../../graphql/recipes";
import { useDebounce, useList } from "../../../hooks";
import { TRecipe } from "../../../types";
import MetaList from "../../MetaList";
import ListItem from "../ListItem";
import Searchbar from "./Searchbar";

export default function WeekPlan() {
  const [noOfRecipes, setNoOfRecipes] = useState(7);
  const [searchTerm, setSearchTerm] = useState("");

  const limit = useDebounce(noOfRecipes, 500);
  const tags = useDebounce(
    searchTerm.split(/\s+/).filter((s) => !!s),
    500
  );

  const { items } = useList<TRecipe>({
    query: RANDOM_RECIPES_QUERY,
    variables: { limit, tags },
  });

  return (
    <>
      <h2>Wochenplan</h2>

      <MetaList
        listKey="recipes/week-plan"
        title="Wochenplan"
        items={items}
        searchBar={() => (
          <Searchbar
            noRecipes={noOfRecipes}
            setNoRecipes={setNoOfRecipes}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        )}
      >
        {(recipes) => (
          <ul>
            {recipes.map((recipe) => (
              <ListItem key={recipe.id} recipe={recipe} />
            ))}
          </ul>
        )}
      </MetaList>
    </>
  );
}
