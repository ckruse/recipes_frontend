import { Route, Routes } from "react-router-dom";

import { useSubnav } from "../../hooks";
import List from "./List";
import New from "./New";
import Show from "./Show";
import RecipesSubNav from "./Subnav";
import WeekPlan from "./WeekPlan";

export default function RecipesInterface() {
  useSubnav(RecipesSubNav);

  return (
    <Routes>
      <Route path="new" element={<New />} />
      <Route path="week-plan" element={<WeekPlan />} />
      <Route path=":id" element={<Show />} />
      <Route path="" element={<List />} />
    </Routes>
  );
}
