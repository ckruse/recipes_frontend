// import { useLazyQuery } from "@apollo/client";

// import { Col, FormGroup, Row } from "react-bootstrap";
// import { Form } from "react-bootstrap";
// import { useTranslation } from "react-i18next";
// import { ActionMeta, GroupBase, OnChangeValue, OptionsOrGroups } from "react-select";
// import Select from "react-select/async";

// import { TAGS_QUERY } from "../../graphql/tags";
// import { useAppDispatch, useAppSelector } from "../../hooks";
// import { ITagsData, TTag } from "../../types";
// import { selectWeekplan, setNoRecipes, setTags } from "./weekplanSlice";

// type TOption = { label: string; value: string; tag: TTag };
// type TEvent = OnChangeValue<TOption, true>;
// type TLoadOptions = (
//   inputValue: string,
//   callback: (options: OptionsOrGroups<TOption, GroupBase<TOption>>) => void
// ) => void;

export default function Searchbar() {
  //   const { noRecipes, tags } = useAppSelector(selectWeekplan);
  //   const dispatch = useAppDispatch();
  //   const { t } = useTranslation(["translation"]);
  //   const [loadTags] = useLazyQuery<ITagsData>(TAGS_QUERY);
  //   const changeNoRecipes = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     dispatch(setNoRecipes(parseInt(event.target.value)));
  //   };
  //   const loadOptions: TLoadOptions = async (inputValue, callback) => {
  //     const { data } = await loadTags({ variables: { search: inputValue, limit: 15, offset: 0 } });
  //     if (data?.tags) {
  //       callback(
  //         data.tags.map((tag) => ({
  //           label: tag.name,
  //           value: tag.id,
  //           tag,
  //         }))
  //       );
  //     }
  //   };
  //   function handleChange(value: TEvent, opts: ActionMeta<TOption>) {
  //     dispatch(setTags(value.map(({ tag }) => tag)));
  //   }
  //   const selectedTags = tags.map((tag) => ({ value: tag.id, label: tag.name, tag }));
  //   return (
  //     <Row className="recipes-weekplan-searchbar">
  //       <FormGroup as={Col} md={4}>
  //         <Form.Label htmlFor="recipes-search">Anzahl Rezepte</Form.Label>
  //         <Form.Control type="number" id="recipes-cnt" value={noRecipes} onChange={changeNoRecipes} />
  //       </FormGroup>
  //       <FormGroup as={Col} md={8}>
  //         <Form.Label htmlFor="recipes-tags">Tags</Form.Label>
  //         <Select
  //           id="tags"
  //           isMulti
  //           isClearable
  //           placeholder="Tag auswählen…"
  //           loadOptions={loadOptions}
  //           onChange={handleChange}
  //           value={selectedTags}
  //         />
  //       </FormGroup>
  //     </Row>
  //   );
}
