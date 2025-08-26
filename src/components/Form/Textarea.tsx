import clsx from "clsx";
import { getIn, useFormikContext } from "formik";
import _ from "lodash";
import TextareaAutosize, { type TextareaAutosizeProps } from "react-textarea-autosize";

import { fieldInvalid, fieldValid } from "./utils";

type PropsType = {
  name: string;
  validate?: boolean;
  fast?: boolean;
  maxLength?: number;
} & TextareaAutosizeProps &
  React.RefAttributes<HTMLTextAreaElement>;

export function Textarea({ name, validate, fast, ...props }: PropsType) {
  const { values, errors, touched, handleChange, handleBlur } = useFormikContext();
  const klass = clsx("form-control", {
    "is-valid": validate && fieldValid(errors, touched, name),
    "is-invalid": validate && fieldInvalid(errors, touched, name),
  });

  const cleanProps = _.omit(props, ["valid", "invalid", "forwardedRef", "className"]);

  if (fast) {
    return (
      <TextareaAutosize
        minRows={3}
        className={klass}
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        value={getIn(values, name)}
        {...cleanProps}
      />
    );
  }

  return (
    <TextareaAutosize
      className={klass}
      minRows={3}
      name={name}
      onChange={handleChange}
      onBlur={handleBlur}
      value={getIn(values, name)}
      {...cleanProps}
    />
  );
}

Textarea.defaultProps = {
  validate: true,
  fast: true,
};
