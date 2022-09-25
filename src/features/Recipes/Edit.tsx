import { useMutation, useQuery } from "@apollo/client";

import { FormikHelpers } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import { Loading } from "../../components";
import { RECIPE_QUERY, RECIPE_UPDATE_MUTATION } from "../../graphql/recipes";
import { useAppDispatch, useTitle } from "../../hooks";
import { IRecipeQueryResult, IRecipeUpdateMutation } from "../../types";
import { showRecipePath } from "../../urls";
import { addErrorFlash, addSuccessFlash } from "../Flash/flashSlice";
import Form, { ValuesInterface } from "./Form";

export default function Edit() {
  const { id } = useParams<"id">();
  const { t } = useTranslation(["recipes", "translation"]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data } = useQuery<IRecipeQueryResult>(RECIPE_QUERY, { variables: { id: parseInt(id || "0", 10) } });

  const [mutateRecipe] = useMutation<IRecipeUpdateMutation>(RECIPE_UPDATE_MUTATION);

  useTitle(t("recipes:edit.title", { name: data?.recipe.name || "…" }));

  async function onSave(recipe: ValuesInterface, { setSubmitting }: FormikHelpers<ValuesInterface>) {
    try {
      setSubmitting(true);

      const { data: rData } = await mutateRecipe({
        variables: {
          id: data!.recipe.id,
          recipe: {
            ...recipe,
            tags: recipe.tags.map((tag) => tag.id),
          },
        },
      });

      if (!rData?.updateRecipe) {
        // TODO: handle error
        return;
      }

      dispatch(addSuccessFlash(t("recipes:edit.success")));
      navigate(showRecipePath(rData.updateRecipe));
    } catch (e) {
      setSubmitting(false);
      dispatch(addErrorFlash(t("translation:errors.general")));
      console.error(e);
    }
  }

  if (!data?.recipe) {
    return <Loading expand />;
  }

  return (
    <>
      <h1>{t("recipes:edit.title", { name: data.recipe.name || "…" })}</h1>

      <Form recipe={data.recipe} onSave={onSave} />
    </>
  );
}
