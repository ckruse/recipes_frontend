import { Form, Navbar } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { Button } from "../components";
import { useAppDispatch, useAppSelector } from "../hooks";
import { ReactComponent as Logo } from "../logo.svg";
import { rootPath } from "../urls";
import { selectSession, toggleShowLogin } from "./sessionSlice";

export default function Header() {
  const { user } = useAppSelector(selectSession);
  const dispatch = useAppDispatch();
  const { t } = useTranslation(["root"]);

  return (
    <Navbar bg="light" id="site-header">
      <Navbar.Brand as={Link} to={rootPath()}>
        <Logo /> {t("root:title")}
      </Navbar.Brand>

      <Form>
        <Form.Label className="visually-hidden" htmlFor="site-search">
          {t("root:search")}
        </Form.Label>
        <Form.Control id="site-search" type="search" placeholder={t("root:search...")} />
      </Form>

      <div className="user-menu">
        {user && (
          <Link to="">
            <img src={user.avatar || "/default_avatar.png"} className="user-avatar" alt={user.name || ""} />
          </Link>
        )}

        {!user && (
          <Button variant="outline-primary" onClick={() => dispatch(toggleShowLogin())}>
            Login
          </Button>
        )}
      </div>
    </Navbar>
  );
}
