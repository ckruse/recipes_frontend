import { useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { RANDOM_RECIPE_QUERY } from "@graphql/recipes";

import Overview from "@/features/Recipes/Show/Overview";
import { useTitle } from "@/hooks";
import { showRecipePath } from "@/urls";

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
          <h2>
            zufälliges Rezept: <Link to={showRecipePath(data.randomRecipe)}>{data.randomRecipe.name}</Link>
          </h2>

          <div className="recipes-root-random-recipe">
            <Overview recipe={data.randomRecipe} />
          </div>

          <p>
            <Link to={showRecipePath(data.randomRecipe)}>Rezept anzeigen</Link>
          </p>
        </>
      )}
    </>
  );
}
