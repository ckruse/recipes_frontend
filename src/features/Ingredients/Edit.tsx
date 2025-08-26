import { useMutation, useQuery } from "@apollo/client";
import type { FormikHelpers } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import { selectSession } from "../../App/sessionSlice";
import { Loading } from "../../components";
import { INGREDIENT_QUERY, INGREDIENT_UPDATE_MUTATION } from "../../graphql/ingredients";
import { MutationError } from "../../handleError";
import { useAppDispatch, useAppSelector, usePermissionFallback, useTitle } from "../../hooks";
import useAuthRequired from "../../hooks/useAuthRequired";
import may from "../../permissions";
import type { IIngredientQueryResult, IIngredientUpdateMutation } from "../../types";
import { showIngredientPath } from "../../urls";
import { parsedInt } from "../../utils/numbers";
import { addErrorFlash, addSuccessFlash } from "../Flash/flashSlice";
import Form, { type IValues } from "./Form";

export default function Edit() {
  const { id } = useParams<"id">();
  const { t } = useTranslation(["ingredients", "translation"]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector(selectSession);

  const { data } = useQuery<IIngredientQueryResult>(INGREDIENT_QUERY, { variables: { id: parsedInt(id) } });
  const [mutateIngredient] = useMutation<IIngredientUpdateMutation>(INGREDIENT_UPDATE_MUTATION);

  useTitle(t("ingredients:edit.title", { name: data?.ingredient.name || "…" }));
  useAuthRequired();
  usePermissionFallback(may(user, "ingredients", "edit", data?.ingredient) || !!user);

  async function onSave(values: IValues, { setSubmitting }: FormikHelpers<IValues>) {
    try {
      setSubmitting(true);

      values = {
        ...values,
        units: values.units.map((unit) => ({
          ...unit,
          id: typeof unit.id === "string" && unit.id.match(/^new__/) ? undefined : unit.id,
        })),
      };

      const { data: iData, errors } = await mutateIngredient({
        variables: {
          id: data!.ingredient.id,
          ingredient: values,
        },
      });

      if (!iData?.updateIngredient) {
        // TODO: handle errors
        console.log(errors);
        throw new MutationError(undefined);
      }

      dispatch(addSuccessFlash(t("ingredients:edit.success")));
      navigate(showIngredientPath(iData.updateIngredient));
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
