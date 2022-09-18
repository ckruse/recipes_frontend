import { ButtonGroup } from "react-bootstrap";

type TProps = {
  children?: React.ReactNode;
};

export function ActionColumn({ children }: TProps) {
  return (
    <td className="action-column">
      <ButtonGroup size="sm">{children}</ButtonGroup>
    </td>
  );
}
