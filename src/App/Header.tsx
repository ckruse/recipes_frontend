import { FormEvent, useState } from "react";

import { Dropdown, Form, Nav, Navbar } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Icon from "react-icons-kit";
import { ic_grass, ic_home, ic_set_meal, ic_tag, ic_view_week } from "react-icons-kit/md";
import { Link, useNavigate } from "react-router-dom";

import { removeAuthorizationToken } from "../authorizationToken";
import { Button } from "../components";
import { useAppDispatch, useAppSelector } from "../hooks";
import Logo from "../logo.svg";
import may from "../permissions";
import { ingredientsPath, recipesPath, rootPath, showUserPath, tagsPath, weekplanPath } from "../urls";
import { URI } from "../utils";
import { selectSession, setShowLogin, setUser, toggleShowPasswordReset } from "./sessionSlice";

export default function Header() {
  const [search, setSearch] = useState("");
  const { user } = useAppSelector(selectSession);
  const dispatch = useAppDispatch();
  const { t } = useTranslation(["root"]);
  const navigate = useNavigate();

  async function logout() {
    removeAuthorizationToken();
    dispatch(setUser(null));
  }

  function startSearch(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    navigate(recipesPath(search));
  }

  return (
    <Navbar bg="light" id="site-header" collapseOnSelect expand="lg">
      <Navbar.Brand as={Link} to={rootPath()}>
        <Logo /> {t("root:title")}
      </Navbar.Brand>

      <Navbar id="site-navbar">
        <Nav as="ul">
          <Nav.Item as="li">
            <Nav.Link as={Link} to={rootPath()}>
              <Icon icon={ic_home} size="24" /> {t("root:sidebar.home")}
            </Nav.Link>
          </Nav.Item>

          {may(user, "weekplan") && (
            <Nav.Item as="li">
              <Nav.Link as={Link} to={weekplanPath()}>
                <Icon icon={ic_view_week} size="24" /> {t("root:sidebar.weekplan")}
              </Nav.Link>
            </Nav.Item>
          )}

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

          <Nav.Item as="li">
            <Nav.Link as={Link} to={tagsPath()}>
              <Icon icon={ic_tag} size="24" /> {t("root:sidebar.tags")}
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar>

      <Form onSubmit={startSearch}>
        <Form.Label className="visually-hidden" htmlFor="site-search">
          {t("root:search")}
        </Form.Label>
        <Form.Control
          id="site-search"
          type="search"
          onChange={(ev) => setSearch(ev.target.value)}
          value={search}
          placeholder={t("root:search...")}
        />
      </Form>

      <div className="user-menu">
        {!!user && (
          <Dropdown align="end">
            <Dropdown.Toggle variant="link">
              <img
                src={user.avatar?.thumb ? `${URI}${user.avatar.thumb}` : "/default_avatar.png"}
                className="user-avatar"
                alt={user.name || ""}
              />
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
          <Button variant="outline-primary" onClick={() => dispatch(setShowLogin(true))}>
            {t("root:login")}
          </Button>
        )}
      </div>
    </Navbar>
  );
}
