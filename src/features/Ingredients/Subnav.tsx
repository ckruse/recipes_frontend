import { Nav } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { MdCreate } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

import { selectSession } from "@/App/sessionSlice";
import SubNav from "@/components/SubNav";
import { useAppSelector } from "@/hooks";
import may from "@/permissions";
import { newIngredientPath } from "@/urls";

export default function IngredientsSubnav() {
  const { user } = useAppSelector(selectSession);
  const { t } = useTranslation(["ingredients"]);
  const { pathname } = useLocation();

  return (
    <SubNav>
      {may(user, "ingredients", "create") && (
        <Nav.Item>
          <Nav.Link as={Link} to={newIngredientPath()} active={pathname.endsWith("/new")}>
            <MdCreate /> {t("ingredients:new.title")}
          </Nav.Link>
        </Nav.Item>
      )}
    </SubNav>
  );
}
