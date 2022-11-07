import { Suspense } from "react";

import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router-dom";

import { Loading } from "../components";
import Flash from "../features/Flash";
import IngredientsInterface from "../features/Ingredients";
import RecipesInterface from "../features/Recipes";
import UsersInterface from "../features/Users";
import { useAppSelector, useTitle } from "../hooks";
import ChangePasswordModal from "./ChangePasswordModal";
import Footer from "./Footer";
import Header from "./Header";
import LoginModal from "./LoginModal";
import { selectSession } from "./sessionSlice";

function App() {
  const { subNav, checked } = useAppSelector(selectSession);
  const { t } = useTranslation(["root"]);

  useTitle(t("root:title"));

  if (!checked) {
    return <Loading expand />;
  }

  return (
    <Suspense fallback={<Loading expand />}>
      <Header />

      <main className="container-fluid" id="site-content">
        <Suspense fallback={<Loading />}>{subNav}</Suspense>

        <Flash />

        <Suspense fallback={<Loading expand />}>
          <Routes>
            <Route path="/recipes/*" element={<RecipesInterface />} />
            <Route path="/ingredients/*" element={<IngredientsInterface />} />
            <Route path="/users/*" element={<UsersInterface />} />
            <Route path="/" element={<h1>Root</h1>} />
          </Routes>
        </Suspense>

        <LoginModal />
        <ChangePasswordModal />
      </main>

      <Footer />
    </Suspense>
  );
}

export default App;
