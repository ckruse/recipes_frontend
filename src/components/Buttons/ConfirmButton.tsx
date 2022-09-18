import React, { useState } from "react";

import _ from "lodash";
import { Button } from "react-bootstrap";
import Icon from "react-icons-kit";
import { ic_warning } from "react-icons-kit/md";

export const ConfirmButton: typeof Button = (props) => {
  const [active, setActive] = useState<boolean>(false);
  const isActive = _.isUndefined(props.active) ? active : props.active;

  function handleClick(ev: React.MouseEvent<HTMLButtonElement>) {
    if (isActive) {
      if (props.onClick) {
        props.onClick(ev);
      }
    } else {
      setActive(true);
    }
  }

  const cautionText = (
    <>
      <Icon icon={ic_warning} /> {"Sind Sie sicher?"}
    </>
  );

  const { children, ...buttonProps } = {
    ...props,
    variant: props.color || "danger",
    onClick: handleClick,
    onBlur: () => setActive(false),
  };

  return <Button {...buttonProps}>{isActive ? cautionText : children}</Button>;
};
