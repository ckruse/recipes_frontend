import { startOfISOWeek } from "date-fns";
import { useFormikContext } from "formik";
import { Form } from "react-bootstrap";

import { TValues } from ".";
import { FormGroup } from "../../../components";
import { DatePicker, Input, TagSelector } from "../../../components/Form";

export default function InnerForm() {
  const { setFieldValue, setFieldTouched } = useFormikContext<TValues>();

  function setWeek(value: Date) {
    setFieldValue("week", startOfISOWeek(value));
    setFieldTouched("week", true);
  }

  return (
    <>
      <FormGroup>
        <Form.Label htmlFor="week">Woche</Form.Label>
        <DatePicker onChange={setWeek} name="week" id="week" />
      </FormGroup>

      <FormGroup>
        <Form.Label htmlFor="tags">Tags</Form.Label>
        <TagSelector isMulti name="tags" id="tags" />
      </FormGroup>

      <FormGroup>
        <Form.Label htmlFor="portions">Portionen</Form.Label>
        <Input id="portions" name="portions" type="number" step={1} min={1} />
      </FormGroup>
    </>
  );
}
