import { useMutation, useQuery } from "@apollo/client";

import { FormikHelpers } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import { Loading } from "../../components";
import { INGREDIENT_MUTATION, INGREDIENT_QUERY } from "../../graphql/ingredients";
import { MutationError } from "../../handleError";
import { useAppDispatch, useTitle } from "../../hooks";
import { IIngredientMutation, IIngredientQueryResult } from "../../types";
import { showIngredientPath } from "../../urls";
import { addErrorFlash, addSuccessFlash } from "../Flash/flashSlice";
import Form, { ValuesInterface } from "./Form";

export default function Edit() {
  const { id } = useParams<"id">();
  const { t } = useTranslation(["ingredients", "translation"]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data } = useQuery<IIngredientQueryResult>(INGREDIENT_QUERY, { variables: { id } });
  const [mutateRecipe] = useMutation<IIngredientMutation>(INGREDIENT_MUTATION);

  useTitle(t("ingredients:edit.title", { name: data?.ingredient.name || "…" }));

  async function onSave(values: ValuesInterface, { setSubmitting }: FormikHelpers<ValuesInterface>) {
    try {
      setSubmitting(true);

      const { data: iData } = await mutateRecipe({
        variables: {
          id: data!.ingredient.id,
          ingredient: values,
        },
      });

      if (!iData?.mutateIngredient.successful) {
        throw new MutationError(iData?.mutateIngredient);
      }

      dispatch(addSuccessFlash(t("ingredients:edit.success")));
      navigate(showIngredientPath(iData.mutateIngredient.result));
    } catch (e) {
      setSubmitting(false);
      dispatch(addErrorFlash(t("translation:errors.general")));
      console.error(e);
    }
  }

  if (!data?.ingredient) {
    return <Loading expand />;
  }

  return (
    <>
      <h1>{t("ingredients:edit.title", { name: data.ingredient.name })}</h1>

      <Form ingredient={data.ingredient} onSave={onSave} />
    </>
  );
}
