import { useLazyQuery } from "@apollo/client";

import { getIn, useFormikContext } from "formik";
import _ from "lodash";
import { ActionMeta, GroupBase, OnChangeValue, OptionsOrGroups } from "react-select";
import { MultiValue, SingleValue } from "react-select";
import Select, { AsyncProps } from "react-select/async";

import { TAGS_QUERY } from "../../graphql/tags";
import { ITagsData, TTag } from "../../types";

type TOption = { label: string; value: string; tag: TTag };
type TEvent<IsMulti extends boolean> = OnChangeValue<TOption, IsMulti>;
type TLoadOptions = (
  inputValue: string,
  callback: (options: OptionsOrGroups<TOption, GroupBase<TOption>>) => void
) => void;

type TProps<Option, IsMulti extends boolean> = AsyncProps<Option, IsMulti, GroupBase<Option>> & {
  name: string;
};

const isMulti = (value: MultiValue<TOption> | SingleValue<TOption>): value is MultiValue<TOption> => _.isArray(value);

const multiValue = (value: TTag[] | null | undefined): TOption[] =>
  (value || []).map((tag) => ({ value: tag.id, label: tag.name, tag }));

const singleValue = (value: TTag | null | undefined): TOption | null =>
  value ? { value: value.id, label: value.name, tag: value } : null;

export function TagSelector<IsMulti extends boolean>(props: TProps<TOption, IsMulti>) {
  const { values, handleBlur, setFieldValue } = useFormikContext();
  const [loadTags] = useLazyQuery<ITagsData>(TAGS_QUERY);
  const value: TTag[] = getIn(values, props.name);

  const loadOptions: TLoadOptions = async (inputValue, callback) => {
    const { data } = await loadTags({ variables: { search: inputValue, limit: 15, offset: 0 } });
    if (data?.tags) {
      callback(
        data.tags.map((tag) => ({
          label: tag.name,
          value: tag.id,
          tag,
        }))
      );
    }
  };

  function handleChange(value: TEvent<IsMulti>, _opts: ActionMeta<TOption>) {
    if (isMulti(value)) {
      setFieldValue(
        props.name,
        value.map((v) => v.tag)
      );
    } else {
      setFieldValue(props.name, value?.tag);
    }
  }

  const selectedTags = props.isMulti ? multiValue(value) : singleValue(value as unknown as TTag | null | undefined);

  return (
    <Select
      placeholder="Tag auswählen…"
      loadOptions={loadOptions}
      onChange={handleChange}
      onBlur={handleBlur}
      value={selectedTags}
      {...props}
    />
  );
}
