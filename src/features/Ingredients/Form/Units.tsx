import { useFormikContext } from "formik";
import { nanoid } from "nanoid";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import { IValues } from ".";
import { AddButton, DeleteButton, FormGroup } from "../../../components";
import { Input, Select } from "../../../components/Form";

export default function Units() {
  const { t } = useTranslation(["ingredients"]);
  const { values, setFieldValue } = useFormikContext<IValues>();

  function addUnit() {
    setFieldValue("units", [...values.units, { id: `new__${nanoid()}`, identifier: "", baseValue: 0 }]);
  }

  function removeUnit(id: string) {
    setFieldValue(
      "units",
      values.units.filter((unit) => unit.id !== id),
    );
  }

  const unitOptions = Object.entries(t(`ingredients:units`, { returnObjects: true }))
    .filter(([identifier, _]) => !["G", "ML"].includes(identifier))
    .map(([identifier, label]) => ({
      label: label as string,
      value: identifier,
    }));

  return (
    <fieldset>
      <legend>Einheiten</legend>

      <ul className="recipes-ingredient-form-units-list">
        {values.units.map((unit, i) => (
          <li key={unit.id}>
            <FormGroup>
              <Form.Label htmlFor={`units.${i}.identifier`}>Einheit</Form.Label>
              <Select id={`units.${i}.identifier`} name={`units.${i}.identifier`} options={unitOptions} />
            </FormGroup>

            <FormGroup>
              <Form.Label htmlFor={`units.${i}.baseValue`}>Basiswert</Form.Label>
              <Input type="number" id={`units.${i}.baseValue`} name={`units.${i}.baseValue`} />
              <Form.Text>{t(`ingredients:units.${values.reference}`)}</Form.Text>
            </FormGroup>

            <DeleteButton size="sm" onClick={() => removeUnit(unit.id!)}>
              löschen
            </DeleteButton>
          </li>
        ))}
      </ul>

      <p>
        <AddButton size="sm" onClick={addUnit}>
          Einheit hinzufügen
        </AddButton>
      </p>
    </fieldset>
  );
}
