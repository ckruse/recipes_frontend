import { Route, Routes } from "react-router-dom";

import Edit from "./Edit";
import List from "./List";
import New from "./New";
import Show from "./Show";

export default function IngredientsInterface() {
  return (
    <Routes>
      <Route path="new" element={<New />} />
      <Route path=":id/edit" element={<Edit />} />
      <Route path=":id" element={<Show />} />
      <Route path="" element={<List />} />
    </Routes>
  );
}
