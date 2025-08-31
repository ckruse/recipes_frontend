import Icon from "react-icons-kit";
import { ic_add } from "react-icons-kit/md";

import { Button, type ButtonProps } from "./Button";

export const AddButton = ({ children, ...props }: ButtonProps) => (
  <Button variant="secondary" {...props}>
    <Icon icon={ic_add} /> {children}
  </Button>
);
