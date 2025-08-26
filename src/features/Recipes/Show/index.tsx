import { useEffect, useState } from "react";

import { useMutation, useQuery } from "@apollo/client";
import { type FormikHelpers } from "formik";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";

import { selectSession } from "../../../App/sessionSlice";
import { CancelButton, EditButton, Loading } from "../../../components";
import { RECIPE_QUERY, UPDATE_RECIPE_MUTATION } from "../../../graphql/recipes";
import { useAppDispatch, useAppSelector, useTitle } from "../../../hooks";
import may from "../../../permissions";
import type { IRecipeQueryResult, IUpdateRecipeMutation } from "../../../types";
import { recipesPath } from "../../../urls";
import { parsedInt } from "../../../utils/numbers";
import { addSuccessFlash } from "../../Flash/flashSlice";
import RecipeForm, { type IValues } from "../Form";
import Overview from "./Overview";
import Steps from "./Steps";

export default function Show() {
  const [portions, setPortions] = useState(2);
  const [editMode, setEditMode] = useState(false);

  const { id } = useParams<"id">();
  const dispatch = useAppDispatch();
  const { t } = useTranslation(["recipes", "ingredients", "translation"]);
  const { user } = useAppSelector(selectSession);
  const { data } = useQuery<IRecipeQueryResult>(RECIPE_QUERY, { variables: { id: parsedInt(id) } });
  const [mutateRecipe] = useMutation<IUpdateRecipeMutation>(UPDATE_RECIPE_MUTATION);

  useTitle(t("recipes:show.title", { name: data?.recipe.name || "…" }));

  useEffect(() => {
    if (data?.recipe) {
      setPortions(data.recipe.defaultServings);
    }
  }, [data]);

  async function saveRecipe(values: IValues, { setSubmitting }: FormikHelpers<IValues>) {
    try {
      setSubmitting(true);

      const { data: rData, errors } = await mutateRecipe({
        variables: {
          id: data!.recipe.id,
          recipe: {
            ...values,
            tags: values.tags.map((tag) => tag.id),
            fittingRecipes: values.fittingRecipes.map((recipe) => recipe.id),
          },
        },
      });

      if (!rData?.updateRecipe) {
        // TODO: handle errors
        console.log(errors);
        throw new Error("Mutation failed");
      }

      dispatch(addSuccessFlash(t("recipes:edit.success")));
    } catch (_error) {
      setSubmitting(false);
    }
  }

  if (!data?.recipe) {
    return <Loading expand />;
  }

  return (
    <>
      <h1>{t("recipes:show.title", { name: data.recipe.name || "…" })}</h1>

      {!editMode && <Overview recipe={data.recipe} portions={portions} setPortions={setPortions} />}
      {editMode && <RecipeForm recipe={data.recipe} onSave={saveRecipe} btnSize="sm" hideCancel />}

      <Steps recipe={data.recipe} portions={portions || 1} editMode={editMode} />

      <div className="recipes-action-list">
        {may(user, "recipes", "edit", data.recipe) && (
          <>
            {!editMode && <EditButton onClick={() => setEditMode(true)}>{t("translation:edit")}</EditButton>}
            {editMode && <CancelButton onClick={() => setEditMode(false)}>{t("recipes:show.stop_edit")}</CancelButton>}
          </>
        )}

        <CancelButton as={Link} to={recipesPath()}>
          {t("translation:back")}
        </CancelButton>
      </div>
    </>
  );
}
