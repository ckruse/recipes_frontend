import { Nav, Navbar } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { aboutPath } from "../urls";

export default function Footer() {
  const { t } = useTranslation(["root"]);

  return (
    <Navbar as="footer" id="site-footer" bg="light">
      <Nav as="ul">
        <Nav.Item as="li">
          <Nav.Link as={Link} to={aboutPath()}>
            {t("root:sidebar.legal_notice")}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link href="mailto:cjk@defunct.ch">cjk@defunct.ch</Nav.Link>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
}
