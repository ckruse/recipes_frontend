import { useMutation } from "@apollo/client/react";
import { type FormikHelpers } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { USER_CREATE_MUTATION } from "@graphql/users";

import { selectSession } from "@/App/sessionSlice";
import { addErrorFlash, addSuccessFlash } from "@/features/Flash/flashSlice";
import { MutationError } from "@/handleError";
import { useAppDispatch, useAppSelector, usePermissionFallback, useTitle } from "@/hooks";
import useAuthRequired from "@/hooks/useAuthRequired";
import may from "@/permissions";
import { editUserPath } from "@/urls";

import Form, { type TValues } from "./Form";

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
      const { data, error } = await userMutation({ variables: { user: values } });

      if (!data?.createUser) {
        console.log(error);
        // TODO: handle error
        throw new MutationError();
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
