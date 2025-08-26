import { useLazyQuery } from "@apollo/client";
import { useFormikContext } from "formik";
import { useTranslation } from "react-i18next";
import type { GroupBase, OnChangeValue, OptionsOrGroups } from "react-select";
import AsyncSelect from "react-select/async";

import { RECIPES_QUERY } from "../../graphql/recipes";
import type { IRecipesQueryResult } from "../../types";
import type { IValues } from "./Form";

type OptionType = { label: string; value: string };
type EventType = OnChangeValue<OptionType, true>;

type LoadOptionsType = (
  inputValue: string,
  callback: (options: OptionsOrGroups<OptionType, GroupBase<OptionType>>) => void,
) => void;

export default function FittingRecipesSelector() {
  const { values, setFieldTouched, setFieldValue } = useFormikContext<IValues>();
  const { t } = useTranslation(["translation"]);

  const [loadrecipes] = useLazyQuery<IRecipesQueryResult>(RECIPES_QUERY);

  const value = values.fittingRecipes.map((recipe) => ({
    value: recipe.id,
    label: recipe.name,
  }));

  function handleChange(value: EventType) {
    setFieldTouched("fittingRecipes", true, false);

    setFieldValue(
      "fittingRecipes",
      value.map((v) => ({ id: v.value, name: v.label })),
      true,
    );
  }

  function handleBlur() {
    setFieldTouched("fittingRecipes", true, true);
  }

  const loadOptions: LoadOptionsType = async (inputValue, callback) => {
    const { data } = await loadrecipes({ variables: { search: inputValue, limit: 15, offset: 0 } });
    if (data?.recipes) {
      callback(
        data.recipes.map((recipe) => ({
          label: recipe.name,
          value: recipe.id,
        })),
      );
    }
  };

  return (
    <AsyncSelect
      isMulti
      isClearable
      loadOptions={loadOptions}
      onChange={handleChange}
      onBlur={handleBlur}
      id="fittingRecipes"
      name="fittingRecipes"
      value={value}
      placeholder={t("translation:choose…")}
      noOptionsMessage={() => t("translation:no_options")}
      loadingMessage={() => t("translation:loading")}
    />
  );
}
