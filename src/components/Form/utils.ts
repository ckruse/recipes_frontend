import { getIn } from "formik";
import _ from "lodash";

import { TOptionProp } from "./Select";

export const fieldInvalid = (errors: Object, touched: Object, path: string) =>
  !!(getIn(errors, path) && getIn(touched, path));
export const fieldValid = (errors: Object, touched: Object, path: string) =>
  !!(!getIn(errors, path) && getIn(touched, path));

export const itemByValue = <T>(
  value: any,
  options: TOptionProp<T>[],
  isMulti: boolean = false,
  fallback: boolean = false
): TOptionProp<T> | undefined => {
  if (!value) {
    return undefined;
  }

  if (isMulti) {
    if (!_.isArray(value)) value = [];
    return value.map((val: any) => {
      const v = _.find(options, (o) => o.value === val);

      if (fallback && !v) {
        return { label: val, value: val };
      }

      return v;
    });
  } else {
    const v = _.find(options, (o) => o.value === value);

    if (fallback && !v) {
      return { label: value, value };
    }

    return v;
  }
};
