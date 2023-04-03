import { startOfISOWeek } from "date-fns";
import { useFormikContext } from "formik";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import { TValues } from ".";
import { FormGroup } from "../../../components";
import { DatePicker, Input, TagSelector } from "../../../components/Form";
import { useAppDispatch } from "../../../hooks";
import { setWeek } from "../weekplanSlice";

export default function InnerForm() {
  const dispatch = useAppDispatch();
  const { setFieldValue, setFieldTouched, values } = useFormikContext<TValues>();
  const { t } = useTranslation(["weekplan"]);

  function setWeekValue(value: Date) {
    value = startOfISOWeek(value);
    setFieldValue("week", value);
    setFieldTouched("week", true);
    dispatch(setWeek(value));
  }

  function toggleDay(event: React.ChangeEvent<HTMLInputElement>) {
    const day = parseInt(event.target.value, 10);

    if (values.days.includes(day)) {
      setFieldValue(
        "days",
        values.days.filter((d) => d !== day)
      );
    } else {
      setFieldValue("days", [...values.days, day]);
    }
  }

  return (
    <>
      <FormGroup>
        <Form.Label htmlFor="week">{t("weekplan:create.week")}</Form.Label>
        <DatePicker onChange={setWeekValue} name="week" id="week" clearIcon={null} />
      </FormGroup>

      <FormGroup>
        <Form.Label htmlFor="tags">{t("weekplan:create.tags")}</Form.Label>
        <TagSelector isMulti name="tags" id="tags" />
      </FormGroup>

      <FormGroup>
        <Form.Label htmlFor="portions">{t("weekplan:create.portions")}</Form.Label>
        <Input id="portions" name="portions" type="number" step={1} min={1} />
      </FormGroup>

      <FormGroup>
        <Form.Check
          type="checkbox"
          id="monday"
          label={t("translation:weekdays.monday")}
          value={0}
          checked={values.days.includes(0)}
          onChange={toggleDay}
        />
        <Form.Check
          type="checkbox"
          id="tuesday"
          label={t("translation:weekdays.tuesday")}
          value={1}
          checked={values.days.includes(1)}
          onChange={toggleDay}
        />
        <Form.Check
          type="checkbox"
          id="wednesday"
          label={t("translation:weekdays.wednesday")}
          value={2}
          checked={values.days.includes(2)}
          onChange={toggleDay}
        />
        <Form.Check
          type="checkbox"
          id="thursday"
          label={t("translation:weekdays.thursday")}
          value={3}
          checked={values.days.includes(3)}
          onChange={toggleDay}
        />
        <Form.Check
          type="checkbox"
          id="friday"
          label={t("translation:weekdays.friday")}
          value={4}
          checked={values.days.includes(4)}
          onChange={toggleDay}
        />
        <Form.Check
          type="checkbox"
          id="saturday"
          label={t("translation:weekdays.saturday")}
          value={5}
          checked={values.days.includes(5)}
          onChange={toggleDay}
        />
        <Form.Check
          type="checkbox"
          id="sunday"
          label={t("translation:weekdays.sunday")}
          value={6}
          checked={values.days.includes(6)}
          onChange={toggleDay}
        />
      </FormGroup>
    </>
  );
}
