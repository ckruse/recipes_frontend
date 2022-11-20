import { useMutation } from "@apollo/client";

import { Form, Formik, FormikHelpers } from "formik";
import { TFunction } from "i18next";
import { Form as BsForm, FormGroup, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

import { CancelButton, SaveButton } from "../components";
import { Input } from "../components/Form";
import ErrorMessage from "../components/Form/ErrorMessage";
import { addErrorFlash, addSuccessFlash } from "../features/Flash/flashSlice";
import { USER_PASSWORD_MUTATION } from "../graphql/users";
import { MutationError } from "../handleError";
import { useAppDispatch, useAppSelector } from "../hooks";
import { IUserPasswordMutation } from "../types";
import { selectSession, toggleShowPasswordReset } from "./sessionSlice";

const validationSchema = (t: TFunction) =>
  yup.object().shape({
    currentPassword: yup.string().required(t("root:changePasswordModal.password_required")),
    newPassword: yup
      .string()
      .required(t("root:changePasswordModal.new_password_required"))
      .min(12, t("root:changePasswordModal.password_changed"))
      .max(1024),
    newPasswordConfirmation: yup
      .string()
      .required(t("root:changePasswordModal.new_password_confirmation_required"))
      .oneOf([yup.ref("newPassword")], t("root:changePasswordModal.passwords_must_match")),
  });

const INITIAL_VALUES = {
  currentPassword: "",
  newPassword: "",
  newPasswordConfirmation: "",
};

type TValues = typeof INITIAL_VALUES;

export default function ChangePasswordModal() {
  const { t } = useTranslation(["root"]);
  const { showPasswordReset, user } = useAppSelector(selectSession);
  const dispatch = useAppDispatch();
  const [changePasswordMutation] = useMutation<IUserPasswordMutation>(USER_PASSWORD_MUTATION);

  function toggle() {
    dispatch(toggleShowPasswordReset());
  }

  async function changePassword(values: TValues, { setSubmitting }: FormikHelpers<TValues>) {
    if (!user) return;

    try {
      setSubmitting(true);
      const { data } = await changePasswordMutation({
        variables: {
          id: user.id,
          currentPassword: values.currentPassword,
          password: values.newPassword,
          passwordConfirmation: values.newPasswordConfirmation,
        },
      });

      if (!data?.changePassword.successful) {
        throw new MutationError(data?.changePassword);
      }

      toggle();
      dispatch(addSuccessFlash(t("root:changePasswordModal.password_changed")));
    } catch (e) {
      setSubmitting(false);
      dispatch(addErrorFlash(t("translation:errors.general")));
      console.log(e);
    }
  }

  return (
    <Modal show={showPasswordReset} onHide={toggle}>
      <Formik validationSchema={validationSchema(t)} initialValues={INITIAL_VALUES} onSubmit={changePassword}>
        {() => (
          <Form>
            <Modal.Header closeButton>
              <Modal.Title>{t("root:changePasswordModal.title")}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <FormGroup>
                <BsForm.Label htmlFor="currentPassword">{t("root:changePasswordModal.current_password")}</BsForm.Label>
                <Input id="currentPassword" name="currentPassword" type="password" />
                <ErrorMessage name="currentPassword" />
              </FormGroup>

              <FormGroup>
                <BsForm.Label htmlFor="newPassword">{t("root:changePasswordModal.new_password")}</BsForm.Label>
                <Input name="newPassword" id="new-password" type="password" />
                <ErrorMessage name="newPassword" />
              </FormGroup>

              <FormGroup>
                <BsForm.Label htmlFor="newPasswordConfirmation">
                  {t("root:changePasswordModal.new_password_confirm")}
                </BsForm.Label>
                <Input id="newPasswordConfirmation" name="newPasswordConfirmation" type="password" />
                <ErrorMessage name="newPasswordConfirmation" />
              </FormGroup>
            </Modal.Body>

            <Modal.Footer>
              <SaveButton type="submit">{t("root:changePasswordModal.change_password")}</SaveButton>
              <CancelButton type="button" onClick={toggle}>
                {t("translation:cancel")}
              </CancelButton>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
