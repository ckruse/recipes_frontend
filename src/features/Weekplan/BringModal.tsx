import { useState } from "react";

import { getDay } from "date-fns";
import { Form, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import { selectSession } from "../../App/sessionSlice";
import { CancelButton, DownloadButton, FormGroup } from "../../components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { weekplanBringImportUri } from "../../urls";
import { selectWeekplan, setShowBringModal } from "./weekplanSlice";

const defaultDays = [0, 5, 6].includes(getDay(new Date())) ? [4, 5, 6] : [0, 1, 2, 3];

export default function BringModal() {
  const { showBringModal } = useAppSelector(selectWeekplan);
  const { user } = useAppSelector(selectSession);
  const dispatch = useAppDispatch();
  const { week } = useAppSelector(selectWeekplan);
  const [selectedDays, setSelectedDays] = useState(defaultDays);
  const { t } = useTranslation(["translation", "weekplan"]);

  function onHide() {
    dispatch(setShowBringModal(false));
  }

  function toggleDay(event: React.ChangeEvent<HTMLInputElement>) {
    const day = event.target.valueAsNumber;

    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  }

  if (!user) return null;

  return (
    <Modal show={showBringModal} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t("weekplan:bring_modal.title")}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>{t("weekplan:bring_modal.select_days")}</p>

        <FormGroup>
          <Form.Check
            type="checkbox"
            id="monday"
            label={t("translation:weekdays.monday")}
            value={0}
            checked={selectedDays.includes(0)}
            onChange={toggleDay}
          />
          <Form.Check
            type="checkbox"
            id="tuesday"
            label={t("translation:weekdays.tuesday")}
            value={1}
            checked={selectedDays.includes(1)}
            onChange={toggleDay}
          />
          <Form.Check
            type="checkbox"
            id="wednesday"
            label={t("translation:weekdays.wednesday")}
            value={2}
            checked={selectedDays.includes(2)}
            onChange={toggleDay}
          />
          <Form.Check
            type="checkbox"
            id="thursday"
            label={t("translation:weekdays.thursday")}
            value={3}
            checked={selectedDays.includes(3)}
            onChange={toggleDay}
          />
          <Form.Check
            type="checkbox"
            id="friday"
            label={t("translation:weekdays.friday")}
            value={4}
            checked={selectedDays.includes(4)}
            onChange={toggleDay}
          />
          <Form.Check
            type="checkbox"
            id="saturday"
            label={t("translation:weekdays.saturday")}
            value={5}
            checked={selectedDays.includes(5)}
            onChange={toggleDay}
          />
          <Form.Check
            type="checkbox"
            id="monday"
            label={t("translation:weekdays.sunday")}
            value={6}
            checked={selectedDays.includes(6)}
            onChange={toggleDay}
          />
        </FormGroup>
      </Modal.Body>

      <Modal.Footer>
        <DownloadButton as="a" href={weekplanBringImportUri(user, week, selectedDays)} variant="primary">
          {t("translation:export")}
        </DownloadButton>

        <CancelButton onClick={onHide}>{t("translation:cancel")}</CancelButton>
      </Modal.Footer>
    </Modal>
  );
}
