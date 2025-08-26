import React from "react";

import { FastField, Field, getIn, useFormikContext } from "formik";
import _ from "lodash";
import FormControl, { type FormControlProps } from "react-bootstrap/FormControl";

import { fieldInvalid, fieldValid } from "./utils";

type FormInputProps = {
  fast?: boolean;
  validate?: boolean;
  name: string;
  children?: React.ReactNode;
  step?: number;
  min?: number;
  max?: number;
} & FormControlProps;

export function Input(props: FormInputProps) {
  const formik = useFormikContext();
  const tag = props.fast ? FastField : Field;

  const cleanProps = _.omit(props, ["fast", "validate"]);

  if (props.validate) {
    const { errors, touched } = formik;
    const name = props.name;
    const value = getIn(formik.values, props.name);

    return (
      <FormControl
        as={tag}
        value={value === null || value === undefined ? "" : value}
        {...cleanProps}
        isValid={fieldValid(errors, touched, name)}
        isInvalid={fieldInvalid(errors, touched, name)}
      />
    );
  }

  return <FormControl as={tag} {...cleanProps} />;
}

Input.defaultProps = {
  validate: true,
  fast: true,
};
