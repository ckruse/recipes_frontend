import { ComponentProps } from "react";

import RBButton from "react-bootstrap/Button";

type RBButtonProps = ComponentProps<typeof RBButton>;

export type ButtonProps = Omit<RBButtonProps, "as"> & {
  as?: "button" | "a" | React.ElementType;
};

export const Button = (props: ButtonProps) => (
  // @ts-expect-error wrong types
  <RBButton {...props} />
);
