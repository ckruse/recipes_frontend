import { useMutation } from "@apollo/client";

import { FormikHelpers } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { INGREDIENT_CREATE_MUTATION } from "../../graphql/ingredients";
import { useAppDispatch, useTitle } from "../../hooks";
import { IIngredientCreateMutation } from "../../types";
import { showIngredientPath } from "../../urls";
import { addErrorFlash, addSuccessFlash } from "../Flash/flashSlice";
import Form, { ValuesInterface } from "./Form";

export default function New() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation(["ingredients", "translation"]);
  const [mutateIngredient] = useMutation<IIngredientCreateMutation>(INGREDIENT_CREATE_MUTATION);

  useTitle(t("ingredients:new.title"));

  async function onSave(values: ValuesInterface, { setSubmitting }: FormikHelpers<ValuesInterface>) {
    try {
      setSubmitting(true);
      const { data } = await mutateIngredient({ variables: { ingredient: values } });

      if (!data?.createIngredient) {
        // TODO: handle error
        return;
      }

      dispatch(addSuccessFlash(t("ingredients:new.success")));
      navigate(showIngredientPath(data.createIngredient));
    } catch (e) {
      setSubmitting(false);
      dispatch(addErrorFlash(t("translation:errors.general")));
      console.error(e);
    }
  }

  return (
    <>
      <h1>{t("ingredients:new.title")}</h1>

      <Form onSave={onSave} />
    </>
  );
}
