import { Route, Routes } from "react-router-dom";

import { useSubnav } from "@/hooks";

import List from "./List";
import Subnav from "./Subnav";

export default function WeekplanInterface() {
  useSubnav(Subnav);

  return (
    <Routes>
      <Route path="/" element={<List />} />
    </Routes>
  );
}
