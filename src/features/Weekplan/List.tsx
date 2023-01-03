import { useState } from "react";

import { format, startOfISOWeek } from "date-fns";
import { Button } from "react-bootstrap";
import DatePicker from "react-date-picker";
import { useTranslation } from "react-i18next";
import Icon from "react-icons-kit";
import { ic_calendar_today, ic_swap_horiz } from "react-icons-kit/md";

import { DeleteButton, FormGroup } from "../../components";
import { DELETE_WEEKPLAN, LIST_WEEKPLAN_QUERY } from "../../graphql/weekplan";
import { useAppDispatch, useList } from "../../hooks";
import { TWeekplanEntry } from "../../types";
import MetaList from "../MetaList";
import ListItem from "../Recipes/ListItem";
import ReplaceModal from "./ReplaceModal";
import { setReplaceModal } from "./weekplanSlice";

export default function List() {
  const [week, setWeek] = useState(startOfISOWeek(new Date()));
  const { t } = useTranslation(["translation"]);
  const dispatch = useAppDispatch();

  const { items, deleteItem } = useList<TWeekplanEntry>({
    query: LIST_WEEKPLAN_QUERY,
    deleteMutation: DELETE_WEEKPLAN,
    variables: { week: format(week, "yyyy-MM-dd") },
  });

  function replaceRecipe(entry: TWeekplanEntry) {
    dispatch(setReplaceModal(entry));
  }

  return (
    <>
      <h2>Wochenplan</h2>

      <MetaList
        listKey="recipes/week-plan"
        title="Wochenplan"
        items={items}
        searchBar={() => (
          <FormGroup>
            <DatePicker
              clearIcon={null}
              calendarIcon={<Icon icon={ic_calendar_today} />}
              showWeekNumbers
              value={week}
              className="form-control"
              onChange={(date: Date) => setWeek(startOfISOWeek(date))}
            />
          </FormGroup>
        )}
      >
        {(entries) => (
          <ul>
            {entries.length === 0 && <li className="no-data">{t("translation:no_data")}</li>}

            {entries.map((entry) => (
              <ListItem
                key={entry.id}
                recipe={entry.recipe}
                buttons={
                  <>
                    <Button variant="secondary" onClick={() => replaceRecipe(entry)}>
                      <Icon icon={ic_swap_horiz} /> austauschen
                    </Button>
                    <DeleteButton onClick={() => deleteItem(entry)}>löschen</DeleteButton>
                  </>
                }
              />
            ))}
          </ul>
        )}
      </MetaList>

      <ReplaceModal />
    </>
  );
}
