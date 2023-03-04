import { useLazyQuery } from "@apollo/client";

import { getIn, useFormikContext } from "formik";
import _ from "lodash";
import { useTranslation } from "react-i18next";
import { ActionMeta, GroupBase, OnChangeValue, OptionsOrGroups } from "react-select";
import { MultiValue, SingleValue } from "react-select";
import Select, { AsyncProps } from "react-select/async";

import { RECIPES_QUERY } from "../../graphql/recipes";
import { IRecipesQueryResult, TRecipe } from "../../types";

type TOption = { label: string; value: string; recipe: TRecipe };
type TEvent<IsMulti extends boolean> = OnChangeValue<TOption, IsMulti>;
type TLoadOptions = (
  inputValue: string,
  callback: (options: OptionsOrGroups<TOption, GroupBase<TOption>>) => void
) => void;

type TProps<Option, IsMulti extends boolean> = AsyncProps<Option, IsMulti, GroupBase<Option>> & {
  name: string;
};

const isMulti = (value: MultiValue<TOption> | SingleValue<TOption>): value is MultiValue<TOption> => _.isArray(value);

const multiValue = (value: TRecipe[] | null | undefined): TOption[] =>
  (value || []).map((recipe) => ({ value: recipe.id, label: recipe.name, recipe }));

const singleValue = (value: TRecipe | null | undefined): TOption | null =>
  value ? { value: value.id, label: value.name, recipe: value } : null;

export function RecipeSelector<IsMulti extends boolean>(props: TProps<TOption, IsMulti>) {
  const { values, handleBlur, setFieldValue } = useFormikContext();
  const [loadTags] = useLazyQuery<IRecipesQueryResult>(RECIPES_QUERY);
  const value: TRecipe[] = getIn(values, props.name);
  const { t } = useTranslation(["recipes"]);

  const loadOptions: TLoadOptions = async (inputValue, callback) => {
    const { data } = await loadTags({ variables: { search: inputValue, limit: 15, offset: 0 } });
    if (data?.recipes) {
      callback(
        data.recipes.map((recipe) => ({
          label: recipe.name,
          value: recipe.id,
          recipe,
        }))
      );
    }
  };

  function handleChange(value: TEvent<IsMulti>, _opts: ActionMeta<TOption>) {
    if (isMulti(value)) {
      setFieldValue(
        props.name,
        value.map((v) => v.recipe)
      );
    } else {
      setFieldValue(props.name, value?.recipe);
    }
  }

  const selectedTags = props.isMulti ? multiValue(value) : singleValue(value as unknown as TRecipe | null | undefined);

  return (
    <Select
      placeholder={t("recipes:selector.choose_recipe")}
      loadOptions={loadOptions}
      onChange={handleChange}
      onBlur={handleBlur}
      value={selectedTags}
      {...props}
    />
  );
}
