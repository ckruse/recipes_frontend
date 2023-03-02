import { Form, Formik, FormikHelpers } from "formik";
import { Form as BsForm } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import * as yup from "yup";

import { CancelButton, SaveButton } from "../../../components";
import { FormActions, FormGroup } from "../../../components";
import { Input, Select } from "../../../components/Form";
import ErrorMessage from "../../../components/Form/ErrorMessage";
import { Nilable, TIngredient, TUnitIdentifier } from "../../../types";
import { ingredientsPath } from "../../../urls";
import Units from "./Units";

type TProps = {
  ingredient?: TIngredient;
  onSave: (values: IValues, helpers: FormikHelpers<IValues>) => void;
};

export interface IValues {
  name: string;
  reference: "G" | "ML";
  alc: number;
  carbs: number;
  fat: number;
  proteins: number;
  units: {
    id?: string;
    identifier: TUnitIdentifier;
    baseValue: number;
  }[];
}

const initialValues = (ingredient: Nilable<TIngredient>): IValues => ({
  name: ingredient?.name || "",
  reference: ingredient?.reference || "G",
  alc: ingredient?.alc || 0,
  carbs: ingredient?.carbs || 0,
  fat: ingredient?.fat || 0,
  proteins: ingredient?.proteins || 0,
  units:
    ingredient?.units.map((unit) => ({ id: unit.id, identifier: unit.identifier, baseValue: unit.baseValue })) || [],
});

const validationSchema = yup.object({
  name: yup.string().required("Bitte geben Sie einen Namen ein!"),
  reference: yup.string().required("Bitte geben Sie eine Einheit an!"),
  alc: yup.number().required("Bitte geben Sie einen Alkoholgehalt an!"),
  carbs: yup.number().required("Bitte geben Sie einen Kohlenhydratgehalt an!"),
  fat: yup.number().required("Bitte geben Sie einen Fettgehalt an!"),
  proteins: yup.number().required("Bitte geben Sie einen Proteingehalt an!"),
  // units: yup.array().of(
  //   yup.object({
  //     identifier: yup.string().required(),
  //     baseValue: yup.number().required(),
  //   })
  // ),
});

export default function IngredientForm({ ingredient, onSave }: TProps) {
  const { t } = useTranslation(["ingredients", "translation"]);

  const referenceOptions = [
    { value: "G", label: t("ingredients:units.G") },
    { value: "ML", label: t("ingredients:units.ML") },
  ];

  return (
    <Formik initialValues={initialValues(ingredient)} onSubmit={onSave} validationSchema={validationSchema}>
      {({ isSubmitting }) => (
        <Form>
          <FormGroup>
            <BsForm.Label htmlFor="name">{t("ingredients:fieldnames.name")}</BsForm.Label>
            <Input id="name" name="name" />
            <ErrorMessage name="name" />
          </FormGroup>

          <FormGroup>
            <BsForm.Label htmlFor="reference">{t("ingredients:fieldnames.reference")}</BsForm.Label>
            <Select id="reference" name="reference" options={referenceOptions} />
            <ErrorMessage name="reference" />
          </FormGroup>

          <FormGroup>
            <BsForm.Label htmlFor="alc">{t("ingredients:form.alc_in_g")}</BsForm.Label>
            <Input type="number" min={0} step={0.1} id="alc" name="alc" />
            <ErrorMessage name="alc" />
          </FormGroup>

          <FormGroup>
            <BsForm.Label htmlFor="carbs">{t("ingredients:form.carbs_in_g")}</BsForm.Label>
            <Input type="number" min={0} step={0.1} id="carbs" name="carbs" />
            <ErrorMessage name="carbs" />
          </FormGroup>

          <FormGroup>
            <BsForm.Label htmlFor="fat">{t("ingredients:form.fat_in_g")}</BsForm.Label>
            <Input type="number" min={0} step={0.1} id="fat" name="fat" />
            <ErrorMessage name="fat" />
          </FormGroup>

          <FormGroup>
            <BsForm.Label htmlFor="proteins">{t("ingredients:form.proteins_in_g")}</BsForm.Label>
            <Input type="number" min={0} step={0.1} id="proteins" name="proteins" />
            <ErrorMessage name="proteins" />
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
