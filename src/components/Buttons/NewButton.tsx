import Icon from "react-icons-kit";
import { ic_create } from "react-icons-kit/md";

import { Button, ButtonProps } from "./Button";

export const NewButton = ({ children, ...props }: ButtonProps) => (
  <Button variant="secondary" {...props}>
    <Icon icon={ic_create} /> {children}
  </Button>
);
