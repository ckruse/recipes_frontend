import { getIn, useFormikContext } from "formik";
import { Form } from "react-bootstrap";
import type { FormCheckProps } from "react-bootstrap";

type PropsType<T = any> = FormCheckProps & { name: string; checkedValue?: T };

export function Check<T = any>({ name, checkedValue, ...props }: PropsType<T>) {
  const { values, setFieldValue } = useFormikContext<any>();
  const value = getIn(values, name);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFieldValue(name, e.target.checked ? checkedValue : undefined);
    props.onChange?.(e);
  }

  return <Form.Check name={name} checked={value === checkedValue} onChange={onChange} {...props} />;
}
