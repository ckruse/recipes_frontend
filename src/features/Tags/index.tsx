import { Route, Routes } from "react-router-dom";

import List from "./List";
import Show from "./Show";

export default function TagsInterface() {
  return (
    <Routes>
      <Route path=":id" element={<Show />} />
      <Route path="" element={<List />} />
    </Routes>
  );
}
