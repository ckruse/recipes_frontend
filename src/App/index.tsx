import { Container, Form, Navbar } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link, Route, Routes } from "react-router-dom";

import { Button } from "../components";
import Flash from "../features/Flash";
import RecipesInterface from "../features/Recipes";
import { useAppDispatch, useAppSelector, useTitle } from "../hooks";
import { ReactComponent as Logo } from "../logo.svg";
import { aboutPath, rootPath } from "../urls";
import LoginModal from "./LoginModal";
import { selectSession, toggleShowLogin } from "./sessionSlice";

function App() {
  const { user } = useAppSelector(selectSession);
  const { t } = useTranslation(["root"]);
  const dispatch = useAppDispatch();

  useTitle(t("root:title"));

  return (
    <>
      <Navbar bg="light" id="site-header">
        <Container>
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
        </Container>
      </Navbar>

      <main className="container" id="site-content">
        <Flash />

        <Routes>
          <Route path="/recipes/*" element={<RecipesInterface />} />
        </Routes>

        <LoginModal />
      </main>

      <footer id="site-footer">
        <Container>
          <ul>
            <li>
              <Link to={aboutPath()}>Legal Notice</Link>
            </li>
            <li>
              <a href="mailto:cjk@defunct.ch">cjk@defunct.ch</a>
            </li>
          </ul>
        </Container>
      </footer>
    </>
  );
}

export default App;
