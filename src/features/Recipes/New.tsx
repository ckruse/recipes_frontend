import { useMutation } from "@apollo/client";

import { FormikHelpers } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { RECIPE_MUTATION } from "../../graphql/recipes";
import { MutationError } from "../../handleError";
import { useAppDispatch, useTitle } from "../../hooks";
import useAuthRequired from "../../hooks/useAuthRequired";
import { IRecipeMutation } from "../../types";
import { editRecipePath } from "../../urls";
import { addErrorFlash, addSuccessFlash } from "../Flash/flashSlice";
import Form, { ValuesInterface } from "./Form";

export default function New() {
  const { t } = useTranslation(["recipes", "translation"]);

  const dispatch = useAppDispatch();
  const [mutateRecipe] = useMutation<IRecipeMutation>(RECIPE_MUTATION);
  const navigate = useNavigate();

  useTitle(t("recipes:new.title"));
  useAuthRequired();

  async function onSave(recipe: ValuesInterface, { setSubmitting }: FormikHelpers<ValuesInterface>) {
    try {
      setSubmitting(true);

      const { data } = await mutateRecipe({
        variables: {
          recipe: {
            ...recipe,
            tags: recipe.tags.map((tag) => tag.id),
          },
        },
      });

      if (!data?.mutateRecipe.successful) {
        throw new MutationError(data?.mutateRecipe);
      }

      dispatch(addSuccessFlash(t("recipes:new.success")));
      navigate(editRecipePath(data.mutateRecipe.result));
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
