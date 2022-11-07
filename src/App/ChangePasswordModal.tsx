import { Form, Formik } from "formik";
import { Form as BsForm, FormGroup, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import { CancelButton, SaveButton } from "../components";
import { Input } from "../components/Form";
import { useAppDispatch, useAppSelector } from "../hooks";
import { selectSession, toggleShowPasswordReset } from "./sessionSlice";

export default function ChangePasswordModal() {
  const { t } = useTranslation(["root"]);
  const { showPasswordReset } = useAppSelector(selectSession);
  const dispatch = useAppDispatch();

  function toggle() {
    dispatch(toggleShowPasswordReset());
  }

  return (
    <Modal show={showPasswordReset} onHide={toggle}>
      <Formik initialValues={{}} onSubmit={() => {}}>
        {() => (
          <Form>
            <Modal.Header closeButton>
              <Modal.Title>{t("root:changePasswordModal.title")}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form>
                <FormGroup>
                  <BsForm.Label htmlFor="current-password">
                    {t("root:changePasswordModal.current_password")}
                  </BsForm.Label>
                  <Input id="current-password" name="current-password" type="password" />
                </FormGroup>

                <FormGroup>
                  <BsForm.Label htmlFor="new-password">{t("root:changePasswordModal.new_password")}</BsForm.Label>
                  <Input name="new-password" id="new-password" type="password" />
                </FormGroup>

                <FormGroup>
                  <BsForm.Label htmlFor="password-confirm">
                    {t("root:changePasswordModal.new_password_confirm")}
                  </BsForm.Label>
                  <Input id="password-confirm" name="password-confirm" type="password" />
                </FormGroup>
              </Form>
            </Modal.Body>

            <Modal.Footer>
              <SaveButton type="submit">{t("root:changePasswordModal.change_password")}</SaveButton>
              <CancelButton type="button" onClick={toggle}>
                {t("root:cancel")}
              </CancelButton>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
