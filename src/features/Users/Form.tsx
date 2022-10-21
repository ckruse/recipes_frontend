import { ChangeEvent } from "react";

import { Form, Formik, FormikHelpers } from "formik";
import _ from "lodash";
import { Form as BsForm } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { CancelButton, FormActions, FormGroup, SaveButton } from "../../components";
import { Check, Input, Select } from "../../components/Form";
import { Nilable, TUser, TUserRole } from "../../types";
import { usersPath } from "../../urls";

export type TValues = {
  email: string;
  name: string;
  active: boolean;
  role: TUserRole;
};

type PropsType = {
  user?: TUser;
  onSave: (values: TValues, helpers: FormikHelpers<TValues>) => void;
};

const initialValues = (user: Nilable<TUser>): TValues => ({
  email: user?.email || "",
  name: user?.name || "",
  active: user?.active ?? false,
  role: user?.role || "USER",
});

export default function UserForm({ user, onSave }: PropsType) {
  const { t } = useTranslation(["users", "translation"]);

  const roleOptions = _(t("users:roles", { returnObjects: true }))
    .map((name, role) => ({ label: name, value: role }))
    .valueOf();

  return (
    <Formik initialValues={initialValues(user)} onSubmit={onSave}>
      {({ isSubmitting, setFieldValue }) => {
        function setAvatar(e: ChangeEvent<HTMLInputElement>) {
          setFieldValue("avatar", e.target.files?.[0]);
        }

        return (
          <Form>
            <FormGroup>
              <BsForm.Label>{t("users:field_names.email")}</BsForm.Label>
              <Input name="email" id="email" type="email" />
            </FormGroup>

            <FormGroup>
              <BsForm.Label>{t("users:field_names.name")}</BsForm.Label>
              <Input name="name" id="name" />
            </FormGroup>

            <FormGroup>
              <BsForm.Label>{t("users:field_names.avatar")}</BsForm.Label>
              <BsForm.Control name="avatar" id="avatar" type="file" onChange={setAvatar} />
            </FormGroup>

            <FormGroup>
              <Check name="active" id="active" checkedValue={true} label={t("users:form.active")} />
            </FormGroup>

            <FormGroup>
              <BsForm.Label>{t("users:field_names.role")}</BsForm.Label>
              <Select id="role" name="role" options={roleOptions} />
            </FormGroup>

            <FormGroup>
              <BsForm.Label>{t("users:field_names.password")}</BsForm.Label>
              <Input type="password" name="password" id="password" />
            </FormGroup>

            <FormActions>
              <SaveButton disabled={isSubmitting} type="submit">
                {t("translation:save")}
              </SaveButton>
              <CancelButton disabled={isSubmitting} as={Link} to={usersPath()}>
                {t("translation:cancel")}
              </CancelButton>
            </FormActions>
          </Form>
        );
      }}
    </Formik>
  );
}
