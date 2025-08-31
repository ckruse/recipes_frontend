import { MdEdit } from "react-icons/md";

import { Button, type ButtonProps } from "./Button";

export const EditButton = ({ children, ...props }: ButtonProps) => (
  <Button variant="secondary" {...props}>
    <MdEdit /> {children}
  </Button>
);
