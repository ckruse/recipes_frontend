import { useQuery } from "@apollo/client/react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { RANDOM_RECIPE_QUERY } from "@graphql/recipes";

import Overview from "@/features/Recipes/Show/Overview";
import { useTitle } from "@/hooks";
import { showRecipePath } from "@/urls";

export default function Root() {
  const { t } = useTranslation(["root"]);

  useTitle(t("root:title"));

  const { data, refetch } = useQuery<IRandomRecipeQueryResult>(RANDOM_RECIPE_QUERY);
  function doRefresh() {
    refetch();
  }

  return (
    <>
      <h2>👋 Willkommen!</h2>

      <p>… auf unserer Rezeptesammlung.</p>

      <p>
        Dieses Projekt ist entstanden, weil wir unzufrieden war mit existierenden Lösungen. Und ganz in DIY-Manier
        wollten wir es besser machen.
      </p>

      <p>Ob uns das gelungen ist… keine Ahnung. Wir sind (fast) zufrieden 😊</p>

      {!!data?.randomRecipe && (
        <>
          <h2>
            zufälliges Rezept: <Link to={showRecipePath(data.randomRecipe)}>{data.randomRecipe.name}</Link>
          </h2>

          <div className="recipes-root-random-recipe">
            <Overview recipe={data.randomRecipe} />
          </div>

          <p className="home-random-recipe-links">
            <Link to={showRecipePath(data.randomRecipe)}>Rezept anzeigen</Link>

            <Button onClick={doRefresh} variant="link">
              anderes Rezept laden
            </Button>
          </p>
        </>
      )}
    </>
  );
}
