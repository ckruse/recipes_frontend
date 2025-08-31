import { Nav } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { MdCreate } from "react-icons/md";

import { selectSession } from "@/App/sessionSlice";
import SubNav from "@/components/SubNav";
import { useAppDispatch, useAppSelector } from "@/hooks";
import may from "@/permissions";

import BringModal from "./BringModal";
import CreateWeekplanModal from "./CreateWeekplanModal";
import { setShowBringModal, setWeekplanCreateModal } from "./weekplanSlice";

export default function RecipesSubNav() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectSession);
  const { t } = useTranslation(["weekplan"]);

  function showCreateModal() {
    dispatch(setWeekplanCreateModal(true));
  }

  function showBring() {
    dispatch(setShowBringModal(true));
  }

  return (
    <SubNav>
      {may(user, "weekplan", "create") && (
        <Nav.Item>
          <Nav.Link as="button" onClick={showCreateModal}>
            <MdCreate /> {t("weekplan:subnav.create_weekplan")}
          </Nav.Link>
        </Nav.Item>
      )}

      {!!user && (
        <Nav.Item>
          <Nav.Link as="button" className="nav-button" onClick={showBring}>
            Bring!
          </Nav.Link>
        </Nav.Item>
      )}

      <CreateWeekplanModal />
      <BringModal />
    </SubNav>
  );
}
