import Alert from "react-bootstrap/Alert";

import { useAppDispatch } from "../../hooks";
import { FlashMessageType, FlashTypeType } from "../../types/flash";
import { removeFlash } from "./flashSlice";

type FlashProps = {
  flash: FlashMessageType;
};

const CLASSES: Record<FlashTypeType, string> = {
  error: "danger",
  success: "success",
  warning: "warning",
  info: "notice",
};

export default function Flashmessage({ flash }: FlashProps) {
  const dispatch = useAppDispatch();

  function toggle() {
    dispatch(removeFlash(flash.id));
  }

  const color = CLASSES[flash.type];

  return (
    <Alert variant={color} onClose={toggle} dismissible>
      {flash.message}
    </Alert>
  );
}
