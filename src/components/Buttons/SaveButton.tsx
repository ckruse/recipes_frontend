import _ from "lodash";
import Icon from "react-icons-kit";
import { ic_save } from "react-icons-kit/md";

import { Button, ButtonProps } from ".";

export const SaveButton = (props: ButtonProps) => (
  <Button variant="primary" {..._.omit(props, ["children"])}>
    <Icon icon={ic_save} /> {props.children}
  </Button>
);
