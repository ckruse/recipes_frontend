import { Nav } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { MdCreate } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

import { selectSession } from "@/App/sessionSlice";
import SubNav from "@/components/SubNav";
import { useAppSelector } from "@/hooks";
import may from "@/permissions";
import { newRecipePath } from "@/urls";

export default function RecipesSubNav() {
  const { user } = useAppSelector(selectSession);
  const { t } = useTranslation(["recipes"]);
  const { pathname } = useLocation();

  return (
    <SubNav>
      {may(user, "recipes", "create") && (
        <Nav.Item>
          <Nav.Link as={Link} to={newRecipePath()} active={pathname.endsWith("/new")}>
            <MdCreate /> {t("recipes:new.title")}
          </Nav.Link>
        </Nav.Item>
      )}
    </SubNav>
  );
}
