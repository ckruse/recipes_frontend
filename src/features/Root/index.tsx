import { useQuery } from "@apollo/client";

import { useTranslation } from "react-i18next";

import { RANDOM_RECIPE_QUERY } from "../../graphql/recipes";
import { useTitle } from "../../hooks";
import { IRandomRecipeQueryResult } from "../../types";
import Overview from "../Recipes/Show/Overview";

export default function Root() {
  const { t } = useTranslation(["root"]);

  useTitle(t("root:title"));

  const { data } = useQuery<IRandomRecipeQueryResult>(RANDOM_RECIPE_QUERY);

  return (
    <>
      <h2>👋 Willkommen!</h2>

      <p>… auf meiner Rezeptesammlung.</p>

      <p>
        Dieses Projekt ist entstanden, weil ich unzufrieden war mit existierenden Lösungen. Und ganz in DIY-Manier
        wollte ich es besser machen.
      </p>

      <p>Ob mir das gelungen ist… keine Ahnung. Ich bin zufrieden 😊</p>

      {!!data?.randomRecipe && (
        <>
          <h2>zufälliges Rezept: {data.randomRecipe.name}</h2>

          <div className="recipes-root-random-recipe">
            <Overview recipe={data.randomRecipe} />
          </div>
        </>
      )}
    </>
  );
}
