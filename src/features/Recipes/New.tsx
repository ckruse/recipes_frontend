import { useMutation } from "@apollo/client";
import { type FormikHelpers } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { CREATE_RECIPE_MUTATION } from "../../graphql/recipes";
import { MutationError } from "../../handleError";
import { useAppDispatch, useTitle } from "../../hooks";
import useAuthRequired from "../../hooks/useAuthRequired";
import type { ICreateRecipeMutation } from "../../types";
import { showRecipePath } from "../../urls";
import { addErrorFlash, addSuccessFlash } from "../Flash/flashSlice";
import Form, { type IValues } from "./Form";

export default function New() {
  const { t } = useTranslation(["recipes", "translation"]);

  const dispatch = useAppDispatch();
  const [mutateRecipe] = useMutation<ICreateRecipeMutation>(CREATE_RECIPE_MUTATION);
  const navigate = useNavigate();

  useTitle(t("recipes:new.title"));
  useAuthRequired();

  async function onSave(recipe: IValues, { setSubmitting }: FormikHelpers<IValues>) {
    try {
      setSubmitting(true);

      const { data, errors } = await mutateRecipe({
        variables: {
          recipe: {
            ...recipe,
            tags: recipe.tags.map((tag) => tag.id),
            fittingRecipes: recipe.fittingRecipes.map((recipe) => recipe.id),
          },
        },
      });

      if (!data?.createRecipe) {
        // TODO: handle errors
        console.log(errors);
        throw new MutationError();
      }

      dispatch(addSuccessFlash(t("recipes:new.success")));
      navigate(showRecipePath(data.createRecipe));
    } catch (e) {
      setSubmitting(false);
      dispatch(addErrorFlash(t("translation:errors.general")));
      console.error(e);
    }
  }

  return (
    <>
      <h2>{t("recipes:new.title")}</h2>

      <Form onSave={onSave} />
    </>
  );
}
