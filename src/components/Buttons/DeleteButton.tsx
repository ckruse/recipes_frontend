import _ from "lodash";
import { Button } from "react-bootstrap";
import { MdDeleteForever } from "react-icons/md";

import { ConfirmButton } from ".";

export const DeleteButton: typeof Button = (props) => (
  <ConfirmButton {..._.omit(props, ["children"])}>
    <MdDeleteForever /> {props.children}
  </ConfirmButton>
);
