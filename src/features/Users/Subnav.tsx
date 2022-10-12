import { Nav } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Icon from "react-icons-kit";
import { ic_add } from "react-icons-kit/md";
import { Link, useLocation } from "react-router-dom";

import { selectSession } from "../../App/sessionSlice";
import SubNav from "../../components/SubNav";
import { useAppSelector } from "../../hooks";
import may from "../../permissions";
import { newUserPath } from "../../urls";

export default function UsersSubNav() {
  const { user } = useAppSelector(selectSession);
  const { t } = useTranslation(["users"]);
  const { pathname } = useLocation();

  return (
    <SubNav>
      {may(user, "users", "create") && (
        <Nav.Item>
          <Nav.Link as={Link} to={newUserPath()} active={pathname.endsWith("/new")}>
            <Icon icon={ic_add} /> {t("users:new.title")}
          </Nav.Link>
        </Nav.Item>
      )}
    </SubNav>
  );
}
