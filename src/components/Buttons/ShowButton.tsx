import Icon from "react-icons-kit";
import { ic_remove_red_eye } from "react-icons-kit/md";

import { Button, ButtonProps } from "./Button";

export const ShowButton = ({ children, ...props }: ButtonProps) => (
  <Button variant="secondary" {...props}>
    <Icon icon={ic_remove_red_eye} /> {children}
  </Button>
);
