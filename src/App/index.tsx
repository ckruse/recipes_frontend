import { Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router-dom";

import Flash from "../features/Flash";
import IngredientsInterface from "../features/Ingredients";
import RecipesInterface from "../features/Recipes";
import { useTitle } from "../hooks";
import Header from "./Header";
import LoginModal from "./LoginModal";
import Sidebar from "./Sidebar";

function App() {
  const { t } = useTranslation(["root"]);

  useTitle(t("root:title"));

  return (
    <>
      <Header />

      <main className="container-fluid" id="site-content">
        <Row>
          <Sidebar />

          <Col md={9} lg={10} className="main">
            <Flash />

            <Routes>
              <Route path="/recipes/*" element={<RecipesInterface />} />
              <Route path="/ingredients/*" element={<IngredientsInterface />} />
              <Route path="/" element={<h1>Root</h1>} />
            </Routes>
          </Col>
        </Row>

        <LoginModal />
      </main>
    </>
  );
}

export default App;
