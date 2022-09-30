import { Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Icon from "react-icons-kit";
import { ic_add, ic_grass, ic_home, ic_set_meal } from "react-icons-kit/md";
import { Link, useLocation } from "react-router-dom";

import { aboutPath, ingredientsPath, newIngredientPath, newRecipePath, recipesPath, rootPath } from "../urls";

export default function Sidebar() {
  const { t } = useTranslation(["root"]);
  const { pathname } = useLocation();

  const module = pathname.replace(/(?:(?:\d+(\/edit)?)|\/new)$/, "").replace(/.*\//, "");

  return (
    <Col as="nav" md={3} lg={2} className="sidebar d-flex flex-column flex-shrink-0 bg-light">
      <ul className="nav nav-pills flex-column">
        {module === "recipes" && (
          <li className="nav-item">
            <Link to={newRecipePath()} className="nav-link">
              <Icon icon={ic_add} size="24" /> {t("root:sidebar.new_recipe")}
            </Link>
          </li>
        )}

        {module === "ingredients" && (
          <li className="nav-item">
            <Link to={newIngredientPath()} className="nav-link">
              <Icon icon={ic_add} size="24" /> {t("root:sidebar.new_ingredient")}
            </Link>
          </li>
        )}
      </ul>

      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link to={rootPath()} className="nav-link">
            <Icon icon={ic_home} size="24" /> {t("root:sidebar.home")}
          </Link>
        </li>

        <li className="nav-item">
          <Link to={recipesPath()} className="nav-link">
            <Icon icon={ic_set_meal} size="24" /> {t("root:sidebar.recipes")}
          </Link>
        </li>

        <li className="nav-item">
          <Link to={ingredientsPath()} className="nav-link">
            <Icon icon={ic_grass} size="24" /> {t("root:sidebar.ingredients")}
          </Link>
        </li>
      </ul>

      <hr />
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to={aboutPath()} className="nav-link">
            {t("root:sidebar.legal_notice")}
          </Link>
        </li>
        <li className="nav-item">
          <a href="mailto:cjk@defunct.ch" className="nav-link">
            cjk@defunct.ch
          </a>
        </li>
      </ul>
    </Col>
  );
}
