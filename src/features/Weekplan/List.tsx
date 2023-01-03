import { useState } from "react";

import { format, startOfISOWeek } from "date-fns";
import DatePicker from "react-date-picker";
import { useTranslation } from "react-i18next";
import Icon from "react-icons-kit";
import { ic_calendar_today } from "react-icons-kit/md";

import { FormGroup } from "../../components";
import { LIST_WEEKPLAN_QUERY } from "../../graphql/weekplan";
import { useList } from "../../hooks";
import { TWeekplanEntry } from "../../types";
import MetaList from "../MetaList";
import ListItem from "../Recipes/ListItem";

export default function List() {
  const [week, setWeek] = useState(startOfISOWeek(new Date()));
  const { t } = useTranslation(["translation"]);

  const { items } = useList<TWeekplanEntry>({
    query: LIST_WEEKPLAN_QUERY,
    variables: { week: format(week, "yyyy-MM-dd") },
  });

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
              <ListItem key={entry.id} recipe={entry.recipe} />
            ))}
          </ul>
        )}
      </MetaList>
    </>
  );
}
