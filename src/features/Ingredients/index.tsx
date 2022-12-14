import { Route, Routes } from "react-router-dom";

import { useSubnav } from "../../hooks";
import Edit from "./Edit";
import List from "./List";
import New from "./New";
import Show from "./Show";
import IngredientsSubnav from "./Subnav";

export default function IngredientsInterface() {
  useSubnav(IngredientsSubnav);

  return (
    <Routes>
      <Route path="new" element={<New />} />
      <Route path=":id/edit" element={<Edit />} />
      <Route path=":id" element={<Show />} />
      <Route path="" element={<List />} />
    </Routes>
  );
}
