import { getIn, useFormikContext } from "formik";
import { useTranslation } from "react-i18next";
import ReactSelect, { ActionMeta, MultiValue, OnChangeValue, SingleValue } from "react-select";

import { fieldInvalid, fieldValid, itemByValue } from "./utils";

export type TOptionProp<T> = {
  value: T;
  label: string;
};

type TProps<T> = {
  options: TOptionProp<T>[];
  name: string;
  id?: string;
  placeholder?: string;
  noOptionsMessage?: string;
  className: string;
  validate: boolean;
  isMulti: boolean;
  isClearable: boolean;
  onChange?: (
    value: SingleValue<TOptionProp<T>> | MultiValue<TOptionProp<T>>,
    actionMeta: ActionMeta<TOptionProp<T>>
  ) => void;
};

export function Select<T>(props: TProps<T>) {
  const { options, name, id, className, placeholder, noOptionsMessage, validate, isMulti, isClearable, onChange } =
    props;
  const formik = useFormikContext();
  const { t } = useTranslation(["translation"]);

  function handleChange(
    ev: OnChangeValue<TOptionProp<T>, false> | OnChangeValue<TOptionProp<T>, true>,
    opts: ActionMeta<TOptionProp<T>>
  ) {
    let value;

    if (isMulti) {
      value = ((ev as TOptionProp<T>[]) || []).map((row) => row.value);
    } else {
      value = getIn(ev, "value");
    }

    formik.setFieldTouched(name, true, false);
    formik.setFieldValue(name, value, true);

    if (onChange) {
      onChange(ev, opts);
    }
  }

  function handleBlur() {
    formik.setFieldTouched(name, true, true);
  }

  let klass = `formik-react-select ${className}`;
  if (validate) {
    if (fieldInvalid(formik.errors, formik.touched, name)) {
      klass += " is-invalid";
    } else if (fieldValid(formik.errors, formik.touched, name)) {
      klass += " is-valid";
    }
  }

  return (
    <ReactSelect
      placeholder={placeholder || t("translation:choose…")}
      noOptionsMessage={() => noOptionsMessage || t("translation:no_options")}
      classNamePrefix="formik-react-select"
      className={klass}
      name={name}
      id={id}
      options={options}
      value={itemByValue(getIn(formik.values, name), options, isMulti) || null}
      onBlur={handleBlur}
      onChange={handleChange}
      isClearable={isClearable}
      isMulti={isMulti}
    />
  );
}

Select.defaultProps = {
  validate: true,
  isMulti: false,
  isClearable: false,
  className: "",
};
