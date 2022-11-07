import { Form, Formik, FormikHelpers } from "formik";
import _ from "lodash";
import { Form as BsForm } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { CancelButton, SaveButton } from "../../../components";
import { FormActions, FormGroup } from "../../../components";
import { Input, Select } from "../../../components/Form";
import { Nilable, TIngredient, TUnitIdentifier } from "../../../types";
import { ingredientsPath } from "../../../urls";
import Units from "./Units";

type TProps = {
  ingredient?: TIngredient;
  onSave: (values: ValuesInterface, helpers: FormikHelpers<ValuesInterface>) => void;
};

export interface ValuesInterface {
  name: string;
  reference: "G" | "ML";
  alc: number;
  carbs: number;
  fat: number;
  proteins: number;
  units: {
    id: string | undefined;
    identifier: TUnitIdentifier;
    baseValue: number;
  }[];
}

const initialValues = (ingredient: Nilable<TIngredient>): ValuesInterface => ({
  name: ingredient?.name || "",
  reference: ingredient?.reference || "G",
  alc: ingredient?.alc || 0,
  carbs: ingredient?.carbs || 0,
  fat: ingredient?.fat || 0,
  proteins: ingredient?.proteins || 0,
  units:
    ingredient?.units.map((unit) => ({ id: unit.id, identifier: unit.identifier, baseValue: unit.baseValue })) || [],
});

export default function IngredientForm({ ingredient, onSave }: TProps) {
  const { t } = useTranslation(["ingredients", "translation"]);

  const referenceOptions = _(t("ingredients:units", { returnObjects: true }))
    .map((label, unit) => ({ label, value: unit }))
    .valueOf();

  return (
    <Formik initialValues={initialValues(ingredient)} onSubmit={onSave}>
      {({ isSubmitting, values }) => (
        <Form>
          <FormGroup>
            <BsForm.Label htmlFor="name">{t("ingredients:fieldnames.name")}</BsForm.Label>
            <Input id="name" name="name" />
          </FormGroup>

          <FormGroup>
            <BsForm.Label htmlFor="reference">{t("ingredients:fieldnames.reference")}</BsForm.Label>
            <Select id="reference" name="reference" options={referenceOptions} />
          </FormGroup>

          <FormGroup>
            <BsForm.Label htmlFor="alc">{t("ingredients:fieldnames.alc")}</BsForm.Label>
            <Input type="number" min={0} step={0.1} id="alc" name="alc" />
          </FormGroup>

          <FormGroup>
            <BsForm.Label htmlFor="carbs">{t("ingredients:fieldnames.carbs")}</BsForm.Label>
            <Input type="number" min={0} step={0.1} id="carbs" name="carbs" />
          </FormGroup>

          <FormGroup>
            <BsForm.Label htmlFor="fat">{t("ingredients:fieldnames.fat")}</BsForm.Label>
            <Input type="number" min={0} step={0.1} id="fat" name="fat" />
          </FormGroup>

          <FormGroup>
            <BsForm.Label htmlFor="proteins">{t("ingredients:fieldnames.proteins")}</BsForm.Label>
            <Input type="number" min={0} step={0.1} id="proteins" name="proteins" />
          </FormGroup>

          <Units />

          <FormActions>
            <SaveButton disabled={isSubmitting} type="submit">
              {t("translation:save")}
            </SaveButton>

            <CancelButton disabled={isSubmitting} as={Link} to={ingredientsPath()}>
              {t("translation:cancel")}
            </CancelButton>
          </FormActions>
        </Form>
      )}
    </Formik>
  );
}
