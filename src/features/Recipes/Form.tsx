import React, { useState } from "react";

import { useMutation, useQuery } from "@apollo/client";

import { Form, Formik, FormikHelpers } from "formik";
import { Form as BsForm } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ActionMeta, MultiValue } from "react-select";
import Select from "react-select/creatable";

import { FormActions, FormGroup } from "../../components";
import { CancelButton, SaveButton } from "../../components/Buttons";
import { Input, Textarea } from "../../components/Form";
import { TAG_CREATE_MUTATION, TAGS_QUERY } from "../../graphql/tags";
import { MutationError } from "../../handleError";
import { useDebounce } from "../../hooks";
import { TagCreateMutationInterface, TagsDataInterface, TRecipe } from "../../types";
import { recipesPath } from "../../urls";

type PropsType = {
  recipe?: TRecipe;
  onSave: (recipe: ValuesInterface, helpers: FormikHelpers<ValuesInterface>) => void;
};

type OptionType = { value: string; label: string };

export interface ValuesInterface {
  name: string;
  description: string;
  image: File | null;
  tags: { id: string; name: string }[];
}

const initialValues = (recipe?: TRecipe): ValuesInterface => ({
  name: recipe?.name || "",
  image: null,
  description: recipe?.description || "",
  tags: recipe?.tags.map((tag) => ({ id: tag.id, name: tag.name })) || [],
});

export default function RecipesForm({ recipe, onSave }: PropsType) {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 200);
  const { t } = useTranslation(["recipes", "translation"]);

  const [mutateTag] = useMutation<TagCreateMutationInterface>(TAG_CREATE_MUTATION);
  const { data, loading } = useQuery<TagsDataInterface>(TAGS_QUERY, {
    variables: { search: debouncedSearch, limit: 50, offset: 0 },
    skip: !search,
  });

  return (
    <Formik initialValues={initialValues(recipe)} onSubmit={onSave}>
      {({ values, setFieldValue }) => {
        async function onSelect(value: MultiValue<OptionType>, actionMeta: ActionMeta<OptionType>) {
          if (actionMeta.action === "create-option") {
            const { data, errors } = await mutateTag({ variables: { name: actionMeta.option.label } });

            if (!data?.createTag) {
              console.log(errors);
              throw new MutationError(undefined);
            }

            setFieldValue("tags", [...values.tags, { id: data.createTag.id, name: data.createTag.name }]);
          } else {
            setFieldValue(
              "tags",
              value.map((tag) => ({ id: tag.value, name: tag.label }))
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
            </FormGroup>

            <FormGroup>
              <BsForm.Label htmlFor="image">{t("recipes:fieldnames.image")}</BsForm.Label>
              <BsForm.Control type="file" name="image" id="image" onChange={setImage} />
            </FormGroup>

            <FormGroup>
              <BsForm.Label htmlFor="description">{t("recipes:fieldnames.description")}</BsForm.Label>
              <Textarea name="description" id="description" />
            </FormGroup>

            <FormGroup>
              <BsForm.Label htmlFor="tags">{t("recipes:fieldnames.tags")}</BsForm.Label>
              <Select
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
              />
            </FormGroup>

            <FormActions>
              <SaveButton type="submit">{t("translation:save")}</SaveButton>

              <CancelButton as={Link} to={recipesPath()}>
                {t("translation:cancel")}
              </CancelButton>
            </FormActions>
          </Form>
        );
      }}
    </Formik>
  );
}
