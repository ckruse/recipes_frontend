import { MdCreate } from "react-icons/md";

import { Button, type ButtonProps } from "./Button";

export const NewButton = ({ children, ...props }: ButtonProps) => (
  <Button variant="secondary" {...props}>
    <MdCreate /> {children}
  </Button>
);
