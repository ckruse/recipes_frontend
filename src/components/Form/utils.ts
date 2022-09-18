import { getIn } from "formik";

export const fieldInvalid = (errors: Object, touched: Object, path: string) =>
  !!(getIn(errors, path) && getIn(touched, path));
export const fieldValid = (errors: Object, touched: Object, path: string) =>
  !!(!getIn(errors, path) && getIn(touched, path));
