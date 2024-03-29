import React, { useState } from "react";

import { useMutation, useQuery } from "@apollo/client";

import clsx from "clsx";
import { Form, Formik, FormikHelpers } from "formik";
import { TFunction } from "i18next";
import { Form as BsForm } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ActionMeta, MultiValue } from "react-select";
import Select from "react-select/creatable";
import * as yup from "yup";

import { FormActions, FormGroup } from "../../components";
import { CancelButton, SaveButton } from "../../components/Buttons";
import { Input, Textarea } from "../../components/Form";
import ErrorMessage from "../../components/Form/ErrorMessage";
import { TAG_CREATE_MUTATION, TAGS_QUERY } from "../../graphql/tags";
import { MutationError } from "../../handleError";
import { useDebounce } from "../../hooks";
import { ITagCreateMutation, ITagsData, TRecipe } from "../../types";
import { recipesPath } from "../../urls";
import FittingRecipesSelector from "./FittingRecipesSelector";

const MAX_TAGS_COUNT = 5;

type TProps = {
  recipe?: TRecipe;
  onSave: (recipe: IValues, helpers: FormikHelpers<IValues>) => void;
  btnSize?: "sm" | "md";
  hideCancel?: boolean;
};

type OptionType = { value: string; label: string };

export interface IValues {
  name: string;
  defaultServings: number;
  description: string;
  image: File | null;
  tags: { id: string; name: string }[];
  fittingRecipes: { id: string; name: string }[];
}

const validationSchema = (t: TFunction) =>
  yup.object({
    name: yup.string().required(t("recipes:form.name_required")),
    defaultServings: yup.number().required(t("recipes:form.default_servings_required")),
    description: yup.string(),
    tags: yup.array().max(MAX_TAGS_COUNT, t("recipes:form.max_tags")),
  });

const initialValues = (recipe?: TRecipe): IValues => ({
  name: recipe?.name || "",
  defaultServings: recipe?.defaultServings || 2,
  image: null,
  description: recipe?.description || "",
  tags: recipe?.tags.map((tag) => ({ id: tag.id, name: tag.name })) || [],
  fittingRecipes: recipe?.fittingRecipes.map((recipe) => ({ id: recipe.id, name: recipe.name })) || [],
});

export default function RecipesForm({ recipe, onSave, btnSize = "md", hideCancel = false }: TProps) {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 200);
  const { t } = useTranslation(["recipes", "translation"]);

  const [mutateTag] = useMutation<ITagCreateMutation>(TAG_CREATE_MUTATION);
  const { data, loading } = useQuery<ITagsData>(TAGS_QUERY, {
    variables: { search: debouncedSearch, limit: 50, offset: 0 },
    skip: !search,
  });

  return (
    <Formik validationSchema={validationSchema(t)} initialValues={initialValues(recipe)} onSubmit={onSave}>
      {({ values, errors, touched, setFieldValue, setFieldTouched }) => {
        async function onSelect(value: MultiValue<OptionType>, actionMeta: ActionMeta<OptionType>) {
          setFieldTouched("tags", true, true);

          if (actionMeta.action === "create-option") {
            const { data, errors } = await mutateTag({ variables: { name: actionMeta.option.label } });

            if (!data?.createTag) {
              console.log(errors);
              throw new MutationError(undefined);
            }

            setFieldValue("tags", [...values.tags, { id: data.createTag.id, name: data.createTag.name }], true);
          } else {
            setFieldValue(
              "tags",
              value.map((tag) => ({ id: tag.value, name: tag.label })),
              true
            );
          }
        }

        function setImage(ev: React.ChangeEvent<HTMLInputElement>) {
          const file = ev.target.files?.[0];
          setFieldValue("image", file);
        }

        const tagValues: OptionType[] = values.tags.map((tag) => ({ value: tag.id, label: tag.name }));
        const options: OptionType[] = data?.tags.map((tag) => ({ value: tag.id, label: tag.name })) || [];

        return (
          <Form>
            <FormGroup>
              <BsForm.Label htmlFor="name">{t("recipes:fieldnames.name")}</BsForm.Label>
              <Input name="name" id="name" />
              <ErrorMessage name="name" />
            </FormGroup>

            <FormGroup>
              <BsForm.Label htmlFor="defaultServings">{t("recipes:fieldnames.defaultServings")}</BsForm.Label>
              <Input type="number" name="defaultServings" id="defaultServings" />
              <ErrorMessage name="defaultServings" />
            </FormGroup>

            <FormGroup>
              <BsForm.Label htmlFor="image">{t("recipes:fieldnames.image")}</BsForm.Label>
              <BsForm.Control type="file" name="image" id="image" onChange={setImage} />
            </FormGroup>

            <FormGroup>
              <BsForm.Label htmlFor="description">{t("recipes:fieldnames.description")}</BsForm.Label>
              <Textarea name="description" id="description" />
              <ErrorMessage name="description" />
            </FormGroup>

            <FormGroup>
              <BsForm.Label htmlFor="tags">{t("recipes:fieldnames.tags")}</BsForm.Label>
              <Select
                className={clsx("recipes-react-select", {
                  "is-invalid": errors.tags && touched.tags,
                  "is-valid": !errors.tags && touched.tags,
                })}
                id="tags"
                isClearable
                isLoading={loading}
                isMulti
                onInputChange={setSearch}
                options={options}
                value={tagValues}
                onChange={onSelect}
                inputValue={search}
                placeholder={t("recipes:form.tags_placeholder")}
                noOptionsMessage={() => t("recipes:form.no_tags_found")}
                formatCreateLabel={(inputValue) => t("recipes:form.create_tag", { name: inputValue })}
                loadingMessage={() => t("translation:loading")}
                isOptionDisabled={(option) =>
                  tagValues.length >= MAX_TAGS_COUNT || tagValues.some((tag) => tag.value === option.value)
                }
              />
              <ErrorMessage name="tags" />
            </FormGroup>

            <FormGroup>
              <BsForm.Label htmlFor="fittingRecipes">{t("recipes:fieldnames.fittingRecipes")}</BsForm.Label>
              <FittingRecipesSelector />
              <ErrorMessage name="fittingRecipes" />
            </FormGroup>

            <FormActions>
              <SaveButton size={btnSize} type="submit">
                {t("translation:save")}
              </SaveButton>

              {!hideCancel && (
                <CancelButton size={btnSize} as={Link} to={recipesPath()}>
                  {t("translation:cancel")}
                </CancelButton>
              )}
            </FormActions>
          </Form>
        );
      }}
    </Formik>
  );
}
