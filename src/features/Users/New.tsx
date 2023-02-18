import { useMutation } from "@apollo/client";

import { FormikHelpers } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { selectSession } from "../../App/sessionSlice";
import { USER_CREATE_MUTATION } from "../../graphql/users";
import { MutationError } from "../../handleError";
import { useAppDispatch, useAppSelector, usePermissionFallback, useTitle } from "../../hooks";
import useAuthRequired from "../../hooks/useAuthRequired";
import may from "../../permissions";
import { IUserCreateMutation } from "../../types";
import { editUserPath } from "../../urls";
import { addErrorFlash, addSuccessFlash } from "../Flash/flashSlice";
import Form, { TValues } from "./Form";

export default function New() {
  const { t } = useTranslation(["users", "translation"]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector(selectSession);

  useTitle(t("users:new.title"));
  useAuthRequired();
  usePermissionFallback(may(user, "users", "create") || !!user);

  const [userMutation] = useMutation<IUserCreateMutation>(USER_CREATE_MUTATION);

  async function onSave(values: TValues, { setSubmitting }: FormikHelpers<TValues>) {
    try {
      setSubmitting(true);
      const { data, errors } = await userMutation({ variables: { user: values } });

      if (!data?.createUser) {
        console.log(errors);
        // TODO: handle error
        throw new MutationError(undefined);
      }

      dispatch(addSuccessFlash(t("users:new.created")));
      navigate(editUserPath(data.createUser));
    } catch (e) {
      setSubmitting(false);
      dispatch(addErrorFlash(t("translation:errors.general")));
      console.error(e);
    }
  }

  return (
    <>
      <h1>{t("users:new.title")}</h1>
      <Form onSave={onSave} />
    </>
  );
}
