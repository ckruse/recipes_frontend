import { useMutation } from "@apollo/client";

import { Form, Formik, FormikHelpers } from "formik";
import { Form as BsForm, Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import { FormGroup } from "../components";
import { Input } from "../components/Form";
import { LOGIN_MUTATION } from "../graphql/session";
import { useAppDispatch, useAppSelector } from "../hooks";
import { ILoginMutation } from "../types/session";
import { selectSession, setUser, toggleShowLogin } from "./sessionSlice";

type ValuesType = {
  email: string;
  password: string;
};

const INITIAL_VALUE: ValuesType = { email: "", password: "" };

export default function LoginModal() {
  const { showLogin } = useAppSelector(selectSession);
  const dispatch = useAppDispatch();
  const { t } = useTranslation(["translation"]);

  const [loginMutation] = useMutation<ILoginMutation>(LOGIN_MUTATION);

  async function login(values: ValuesType, { setSubmitting }: FormikHelpers<ValuesType>) {
    try {
      setSubmitting(true);
      const { data } = await loginMutation({ variables: values });

      if (!data?.login) {
        // TODO: handle error
        return;
      }

      dispatch(setUser(data.login));
      dispatch(toggleShowLogin());
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Modal show={showLogin} onHide={() => dispatch(toggleShowLogin())}>
      <Formik initialValues={INITIAL_VALUE} onSubmit={login}>
        {({ isSubmitting }) => (
          <Form>
            <Modal.Header closeButton>{t("root:loginModal.title")}</Modal.Header>

            <Modal.Body>
              <FormGroup>
                <BsForm.Label htmlFor="email">{t("root:loginModal.email")}</BsForm.Label>
                <Input name="email" id="email" />
              </FormGroup>

              <FormGroup>
                <BsForm.Label htmlFor="password">{t("root:loginModal.password")}</BsForm.Label>
                <Input name="password" type="password" />
              </FormGroup>
            </Modal.Body>

            <Modal.Footer>
              <Button type="submit" disabled={isSubmitting} variant="primary">
                {t("root:loginModal.login")}
              </Button>

              <Button disabled={isSubmitting} variant="secondary" onClick={() => dispatch(toggleShowLogin())}>
                {t("translation:cancel")}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
