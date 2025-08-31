import { MdRemoveRedEye } from "react-icons/md";

import { Button, type ButtonProps } from "./Button";

export const ShowButton = ({ children, ...props }: ButtonProps) => (
  <Button variant="secondary" {...props}>
    <MdRemoveRedEye /> {children}
  </Button>
);
