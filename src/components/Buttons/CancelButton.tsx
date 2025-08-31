import _ from "lodash";
import { MdCancel } from "react-icons/md";

import { Button, type ButtonProps } from ".";

export const CancelButton = (props: ButtonProps) => (
  <Button variant="secondary" {..._.omit(props, ["children"])}>
    <MdCancel /> {props.children}
  </Button>
);
