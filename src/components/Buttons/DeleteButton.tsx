import _ from "lodash";
import { Button } from "react-bootstrap";
import Icon from "react-icons-kit";
import { ic_delete_forever } from "react-icons-kit/md";

import { ConfirmButton } from ".";

export const DeleteButton: typeof Button = (props) => (
  <ConfirmButton {..._.omit(props, ["children"])}>
    <Icon icon={ic_delete_forever} /> {props.children}
  </ConfirmButton>
);
