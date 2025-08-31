import _ from "lodash";
import { MdSave } from "react-icons/md";

import { Button, type ButtonProps } from ".";

export const SaveButton = (props: ButtonProps) => (
  <Button variant="primary" {..._.omit(props, ["children"])}>
    <MdSave /> {props.children}
  </Button>
);
