import { useLazyQuery, useQuery } from "@apollo/client";
import { getIn, useFormikContext } from "formik";
import { useTranslation } from "react-i18next";
import type { ActionMeta, GroupBase, OnChangeValue, OptionsOrGroups } from "react-select";
import AsyncSelect from "react-select/async";

import { INGREDIENT_QUERY, INGREDIENTS_QUERY } from "../../graphql/ingredients";
import type { IIngredientQueryResult, IIngredientsQueryResult, Nilable, TIngredient } from "../../types";
import { fieldInvalid, fieldValid } from "./utils";

type OptionType = { label: string; value: string; ingredient: Nilable<TIngredient> };
type EventType = OnChangeValue<OptionType, false>;

type TProps = {
  id?: string;
  name: string;
  onChange?: (value: EventType, opts: ActionMeta<OptionType>) => void;
  defaultValue?: OptionType;
  placeholder?: string;
  noOptionsMessage?: string;
  loadingMessage?: string;
  className: string;
  validate: boolean;
  isClearable: boolean;
};

type LoadOptionsType = (
  inputValue: string,
  callback: (options: OptionsOrGroups<OptionType, GroupBase<OptionType>>) => void,
) => void;

export function IngredientSelector(props: TProps) {
  const { values, setFieldValue, setFieldTouched, errors, touched } = useFormikContext();
  const { t } = useTranslation(["translation"]);

  const value = getIn(values, props.name);

  const { data } = useQuery<IIngredientQueryResult>(INGREDIENT_QUERY, {
    variables: { id: value },
    skip: typeof value !== "number" || !value || !!props.defaultValue,
  });

  const [loadIngredients] = useLazyQuery<IIngredientsQueryResult>(INGREDIENTS_QUERY);

  function handleChange(value: EventType, opts: ActionMeta<OptionType>) {
    setFieldTouched(props.name, true, false);
    setFieldValue(props.name, value?.value, true);

    if (props.onChange) {
      props.onChange(value, opts);
    }
  }

  function handleBlur() {
    setFieldTouched(props.name, true, true);
  }

  const loadOptions: LoadOptionsType = async (inputValue, callback) => {
    const { data } = await loadIngredients({ variables: { search: inputValue, limit: 15, offset: 0 } });
    if (data?.ingredients) {
      callback(
        data.ingredients.map((ingredient) => ({
          label: ingredient.name,
          value: ingredient.id,
          ingredient,
        })),
      );
    }
  };

  let val;

  if (typeof value !== "number" && !!value) {
    val = value;
  } else if (props.defaultValue) {
    val = props.defaultValue;
  } else if (data?.ingredient) {
    val = { label: data.ingredient.name, value: data.ingredient.id, ingredient: data.ingredient };
  }

  let klass = `formik-react-select ${props.className}`;
  if (props.validate) {
    if (fieldInvalid(errors, touched, props.name)) {
      klass += " is-invalid";
    } else if (fieldValid(errors, touched, props.name)) {
      klass += " is-valid";
    }
  }

  return (
    <AsyncSelect
      loadOptions={loadOptions}
      id={props.id}
      name={props.name}
      value={val}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder={props.placeholder || t("translation:choose…")}
      classNamePrefix="formik-react-select"
      className={klass}
      noOptionsMessage={() => props.noOptionsMessage || t("translation:no_options")}
      loadingMessage={() => props.loadingMessage || t("translation:loading")}
    />
  );
}

IngredientSelector.defaultProps = {
  validate: true,
  isClearable: false,
  className: "",
};
