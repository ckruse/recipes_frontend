import { Dropdown, Form, Nav, Navbar } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Icon from "react-icons-kit";
import { ic_grass, ic_home, ic_set_meal } from "react-icons-kit/md";
import { Link } from "react-router-dom";

import { removeAuthorizationToken } from "../authorizationToken";
import { Button } from "../components";
import { useAppDispatch, useAppSelector } from "../hooks";
import { ReactComponent as Logo } from "../logo.svg";
import { ingredientsPath, recipesPath, rootPath, showUserPath } from "../urls";
import { selectSession, setUser, toggleShowLogin, toggleShowPasswordReset } from "./sessionSlice";

export default function Header() {
  const { user } = useAppSelector(selectSession);
  const dispatch = useAppDispatch();
  const { t } = useTranslation(["root"]);

  async function logout() {
    removeAuthorizationToken();
    dispatch(setUser(null));
  }

  return (
    <Navbar bg="light" id="site-header">
      <Navbar.Brand as={Link} to={rootPath()}>
        <Logo /> {t("root:title")}
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="site-navbar" />
      <Navbar.Collapse id="site-navbar">
        <Nav as="ul">
          <Nav.Item as="li">
            <Nav.Link as={Link} to={rootPath()}>
              <Icon icon={ic_home} size="24" /> {t("root:sidebar.home")}
            </Nav.Link>
          </Nav.Item>

          <Nav.Item as="li">
            <Nav.Link as={Link} to={recipesPath()}>
              <Icon icon={ic_set_meal} size="24" /> {t("root:sidebar.recipes")}
            </Nav.Link>
          </Nav.Item>

          <Nav.Item as="li">
            <Nav.Link as={Link} to={ingredientsPath()}>
              <Icon icon={ic_grass} size="24" /> {t("root:sidebar.ingredients")}
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>

      <Form>
        <Form.Label className="visually-hidden" htmlFor="site-search">
          {t("root:search")}
        </Form.Label>
        <Form.Control id="site-search" type="search" placeholder={t("root:search...")} />
      </Form>

      <div className="user-menu">
        {!!user && (
          <Dropdown align="end">
            <Dropdown.Toggle variant="link">
              <img src={user.avatar.thumb} className="user-avatar" alt={user.name || ""} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item as={Link} to={showUserPath(user)}>
                {t("root:profile")}
              </Dropdown.Item>

              <Dropdown.Item as={Button} variant="link" onClick={() => dispatch(toggleShowPasswordReset())}>
                {t("root:change_password")}
              </Dropdown.Item>

              <Dropdown.Divider />

              <Dropdown.Item as={Button} variant="link" onClick={logout}>
                {t("root:logout")}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}

        {!user && (
          <Button variant="outline-primary" onClick={() => dispatch(toggleShowLogin())}>
            {t("root:login")}
          </Button>
        )}
      </div>
    </Navbar>
  );
}
