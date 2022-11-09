import clsx from "clsx";
import { getIn, useFormikContext } from "formik";

type TProps = {
  name: string;
  className?: string;
};

export default function ErrorMessage({ name, className }: TProps) {
  const { errors, touched } = useFormikContext();
  const error = getIn(errors, name);
  if (!error || !getIn(touched, name)) {
    return null;
  }

  return <div className={clsx("invalid-feedback", className)}>{error}</div>;
}
