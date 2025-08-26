import React, { useState } from "react";

import _ from "lodash";
import { Button, type ButtonProps } from "react-bootstrap";
import Icon from "react-icons-kit";
import { ic_warning } from "react-icons-kit/md";

type ConfirmButtonProps = ButtonProps & {
  color?: string;
};

export const ConfirmButton: React.FC<ConfirmButtonProps> = (props) => {
  const [active, setActive] = useState<boolean>(false);
  const isActive = _.isUndefined(props.active) ? active : props.active;

  function handleClick(ev: React.MouseEvent<HTMLButtonElement>) {
    if (isActive) {
      props.onClick?.(ev);
    } else {
      setActive(true);
    }
  }

  function handleBlur(ev: React.FocusEvent<any>) {
    setActive(false);
    props.onBlur?.(ev);
  }

  const cautionText = (
    <>
      <Icon icon={ic_warning} /> {"Sind Sie sicher?"}
    </>
  );

  const { children, color, variant: variantProp, onClick, onBlur, ...rest } = props;
  const variant = variantProp ?? color ?? "danger";

  return (
    <Button {...rest} variant={variant} onClick={handleClick} onBlur={handleBlur}>
      {isActive ? cautionText : children}
    </Button>
  );
};
