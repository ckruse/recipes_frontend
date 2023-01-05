import { Nav } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Icon from "react-icons-kit";
import { ic_create } from "react-icons-kit/md";

import { selectSession } from "../../App/sessionSlice";
import SubNav from "../../components/SubNav";
import { useAppDispatch, useAppSelector } from "../../hooks";
import may from "../../permissions";
import CreateWeekplanModal from "./CreateWeekplanModal";
import { setWeekplanCreateModal } from "./weekplanSlice";

export default function RecipesSubNav() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectSession);
  const { t } = useTranslation(["weekplan"]);

  function showCreateModal() {
    dispatch(setWeekplanCreateModal(true));
  }

  return (
    <SubNav>
      {may(user, "weekplan", "create") && (
        <Nav.Item>
          <Nav.Link as="button" onClick={showCreateModal}>
            <Icon icon={ic_create} /> {t("weekplan:subnav.create_weekplan")}
          </Nav.Link>
        </Nav.Item>
      )}

      <CreateWeekplanModal />
    </SubNav>
  );
}
