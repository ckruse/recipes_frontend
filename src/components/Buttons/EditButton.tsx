import Icon from "react-icons-kit";
import { ic_edit } from "react-icons-kit/md";

import { Button, ButtonProps } from "./Button";

export const EditButton = ({ children, ...props }: ButtonProps) => (
  <Button variant="secondary" {...props}>
    <Icon icon={ic_edit} /> {children}
  </Button>
);
