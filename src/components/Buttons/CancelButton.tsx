import _ from "lodash";
import Icon from "react-icons-kit";
import { ic_cancel } from "react-icons-kit/md";

import { Button, type ButtonProps } from ".";

export const CancelButton = (props: ButtonProps) => (
  <Button variant="secondary" {..._.omit(props, ["children"])}>
    <Icon icon={ic_cancel} /> {props.children}
  </Button>
);
