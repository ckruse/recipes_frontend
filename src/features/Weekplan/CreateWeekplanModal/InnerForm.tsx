import { startOfISOWeek } from "date-fns";
import { useFormikContext } from "formik";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import { TValues } from ".";
import { FormGroup } from "../../../components";
import { DatePicker, Input, TagSelector } from "../../../components/Form";

export default function InnerForm() {
  const { setFieldValue, setFieldTouched } = useFormikContext<TValues>();
  const { t } = useTranslation(["weekplan"]);

  function setWeek(value: Date) {
    setFieldValue("week", startOfISOWeek(value));
    setFieldTouched("week", true);
  }

  return (
    <>
      <FormGroup>
        <Form.Label htmlFor="week">{t("weekplan:create.week")}</Form.Label>
        <DatePicker onChange={setWeek} name="week" id="week" clearIcon={null} />
      </FormGroup>

      <FormGroup>
        <Form.Label htmlFor="tags">{t("weekplan:create.tags")}</Form.Label>
        <TagSelector isMulti name="tags" id="tags" />
      </FormGroup>

      <FormGroup>
        <Form.Label htmlFor="portions">{t("weekplan:create.portions")}</Form.Label>
        <Input id="portions" name="portions" type="number" step={1} min={1} />
      </FormGroup>
    </>
  );
}
