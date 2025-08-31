import { MdAdd } from "react-icons/md";

import { Button, type ButtonProps } from "./Button";

export const AddButton = ({ children, ...props }: ButtonProps) => (
  <Button variant="secondary" {...props}>
    <MdAdd /> {children}
  </Button>
);
