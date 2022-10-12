import { useMutation, useQuery } from "@apollo/client";

import { FormikHelpers } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import { Loading } from "../../components";
import { USER_GET_QUERY, USER_UPDATE_MUTATION } from "../../graphql/users";
import { useAppDispatch, useTitle } from "../../hooks";
import { IUserData, IUserUpdateMutation } from "../../types";
import { usersPath } from "../../urls";
import { addErrorFlash, addSuccessFlash } from "../Flash/flashSlice";
import Form, { TValues } from "./Form";

export default function Edit() {
  const { id } = useParams<"id">();
  const dispatch = useAppDispatch();
  const { t } = useTranslation(["users", "translation"]);
  const navigate = useNavigate();

  const { data } = useQuery<IUserData>(USER_GET_QUERY, { variables: { id: parseInt(id || "0", 10) } });
  const [userMutation] = useMutation<IUserUpdateMutation>(USER_UPDATE_MUTATION);

  useTitle(t("users:edit.title", { user: data?.user.name || data?.user.email || "…" }));

  async function onSave(values: TValues, { setSubmitting }: FormikHelpers<TValues>) {
    try {
      setSubmitting(true);
      const { data } = await userMutation({ variables: { id: parseInt(id || "0"), user: values } });
      setSubmitting(false);

      if (!data?.updateUser) {
        // TODO: handle error
        dispatch(addErrorFlash(t("translation:errors.general")));
        return;
      }

      dispatch(addSuccessFlash(t("users:edit.updated")));
      navigate(usersPath());
    } catch (e) {
      setSubmitting(false);
      // TODO: handle error
      dispatch(addErrorFlash(t("translation:errors.general")));
      console.error(e);
    }
  }

  if (!data?.user) {
    return <Loading expand />;
  }

  return (
    <>
      <h1>{t("users:edit.title", { user: data.user.name || data.user.email })}</h1>
      <Form onSave={onSave} user={data.user} />
    </>
  );
}
