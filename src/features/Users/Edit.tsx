import { useMutation, useQuery } from "@apollo/client";
import { type FormikHelpers } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import { USER_GET_QUERY, USER_UPDATE_MUTATION } from "@graphql/users";

import { selectSession } from "@/App/sessionSlice";
import { Loading } from "@/components";
import { addErrorFlash, addSuccessFlash } from "@/features/Flash/flashSlice";
import { MutationError } from "@/handleError";
import { useAppDispatch, useAppSelector, usePermissionFallback, useTitle } from "@/hooks";
import useAuthRequired from "@/hooks/useAuthRequired";
import may from "@/permissions";
import { usersPath } from "@/urls";
import { parsedInt } from "@/utils/numbers";

import Form, { type TValues } from "./Form";

export default function Edit() {
  const { id } = useParams<"id">();
  const dispatch = useAppDispatch();
  const { t } = useTranslation(["users", "translation"]);
  const navigate = useNavigate();
  const { user } = useAppSelector(selectSession);

  const { data } = useQuery<IUserData>(USER_GET_QUERY, { variables: { id: parsedInt(id) } });
  const [userMutation] = useMutation<IUserUpdateMutation>(USER_UPDATE_MUTATION);

  useAuthRequired();
  usePermissionFallback(may(user, "users", "edit", data?.user) || !!user);
  useTitle(t("users:edit.title", { user: data?.user.name || data?.user.email || "…" }));

  async function onSave(values: TValues, { setSubmitting }: FormikHelpers<TValues>) {
    try {
      setSubmitting(true);
      const { data, errors } = await userMutation({ variables: { id: parsedInt(id), user: values } });
      setSubmitting(false);

      if (!data?.updateUser) {
        // TODO: handle error
        console.log(errors);
        throw new MutationError();
      }

      dispatch(addSuccessFlash(t("users:edit.updated")));
      navigate(usersPath());
    } catch (e) {
      setSubmitting(false);
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
