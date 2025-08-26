import { useMutation } from "@apollo/client";
import { type FormikHelpers } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { INGREDIENT_CREATE_MUTATION } from "../../graphql/ingredients";
import { MutationError } from "../../handleError";
import { useAppDispatch, useTitle } from "../../hooks";
import useAuthRequired from "../../hooks/useAuthRequired";
import type { IIngredientCreateMutation } from "../../types";
import { ingredientsPath } from "../../urls";
import { addErrorFlash, addSuccessFlash } from "../Flash/flashSlice";
import Form, { type IValues } from "./Form";

export default function New() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation(["ingredients", "translation"]);
  const [mutateIngredient] = useMutation<IIngredientCreateMutation>(INGREDIENT_CREATE_MUTATION);

  useTitle(t("ingredients:new.title"));
  useAuthRequired();

  async function onSave(values: IValues, { setSubmitting }: FormikHelpers<IValues>) {
    try {
      setSubmitting(true);

      values = {
        ...values,
        units: values.units.map(({ id, ...unit }) => unit),
      };

      const { data, errors } = await mutateIngredient({ variables: { ingredient: values } });

      if (!data?.createIngredient) {
        // TODO: handle errors
        console.log(errors);
        throw new MutationError(undefined);
      }

      dispatch(addSuccessFlash(t("ingredients:new.success")));
      navigate(ingredientsPath());
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
