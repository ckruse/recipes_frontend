import { useMutation } from "@apollo/client";

import { FormikHelpers } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { USER_MUTATION } from "../../graphql/users";
import { MutationError } from "../../handleError";
import { useAppDispatch, useTitle } from "../../hooks";
import { IUserMutation } from "../../types";
import { editUserPath } from "../../urls";
import { addErrorFlash, addSuccessFlash } from "../Flash/flashSlice";
import Form, { TValues } from "./Form";

export default function New() {
  const { t } = useTranslation(["users", "translation"]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useTitle(t("users:new.title"));

  const [userMutation] = useMutation<IUserMutation>(USER_MUTATION);

  async function onSave(values: TValues, { setSubmitting }: FormikHelpers<TValues>) {
    try {
      setSubmitting(true);
      const { data } = await userMutation({ variables: { user: values } });

      if (!data?.mutateUser.successful) {
        throw new MutationError(data?.mutateUser);
      }

      dispatch(addSuccessFlash(t("users:new.created")));
      navigate(editUserPath(data.mutateUser.result));
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
