import { useState } from "react";

import { format, startOfISOWeek } from "date-fns";
import _ from "lodash";
import { Button, ButtonGroup } from "react-bootstrap";
import DatePicker from "react-date-picker";
import { Trans, useTranslation } from "react-i18next";
import Icon from "react-icons-kit";
import { ic_calendar_today, ic_swap_horiz } from "react-icons-kit/md";
import { Link } from "react-router-dom";

import { selectSession } from "../../App/sessionSlice";
import { DeleteButton, FormGroup, ShowButton } from "../../components";
import { dateFormat, indexDate } from "../../dateUtils";
import { DELETE_WEEKPLAN, LIST_WEEKPLAN_QUERY } from "../../graphql/weekplan";
import { useAppDispatch, useAppSelector, useList, usePermissionFallback } from "../../hooks";
import may from "../../permissions";
import { TWeekplanEntry } from "../../types";
import { showRecipePath } from "../../urls";
import { recipeCalories, URI } from "../../utils";
import { formatIntNumberRounded } from "../../utils/numbers";
import MetaList from "../MetaList";
import ReplaceModal from "./ReplaceModal";
import { setReplaceModal } from "./weekplanSlice";

export default function List() {
  const { user } = useAppSelector(selectSession);
  const [week, setWeek] = useState(startOfISOWeek(new Date()));
  const { t } = useTranslation(["translation", "root", "recipes"]);
  const dispatch = useAppDispatch();

  usePermissionFallback(may(user, "weekplan", "list"));

  const { items, deleteItem } = useList<TWeekplanEntry>({
    query: LIST_WEEKPLAN_QUERY,
    deleteMutation: DELETE_WEEKPLAN,
    variables: { week: format(week, "yyyy-MM-dd") },
    deletionMessage: t("weekplan:list.deleted"),
  });

  function replaceRecipe(entry: TWeekplanEntry) {
    dispatch(setReplaceModal(entry));
  }

  return (
    <>
      <h2>{t("root:sidebar.weekplan")}</h2>

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
          <ul className="weekplan-recipes-list">
            {entries.length === 0 && <li className="no-data">{t("translation:no_data")}</li>}

            {entries.map((entry) => (
              <li className="weekplan-list-item" key={entry.id}>
                <div className="recipe-preview">
                  {!!entry.recipe.image && <img src={`${URI}${entry.recipe.image.thumb}`} alt="" />}
                </div>

                <h3>
                  <Link to={showRecipePath(entry.recipe)}>{entry.recipe.name}</Link>
                </h3>

                <Trans parent="span" className="calories" t={t} i18nKey="recipes:list.calories">
                  {{ calories: formatIntNumberRounded(recipeCalories(entry.recipe).calories) }} kcal pro Portion
                </Trans>
                <span className="created">{dateFormat(entry.date, "EEEE, d.M.yyyy")}</span>

                <ul className="recipes-recipes-show-tags-list">
                  {_(entry.recipe.tags)
                    .sortBy("name")
                    .map((tag) => (
                      <li className="tag" key={tag.id}>
                        {tag.name}
                      </li>
                    ))
                    .valueOf()}
                </ul>

                <ButtonGroup size="sm">
                  <ShowButton as={Link} to={showRecipePath(entry.recipe)}>
                    {t("translation:show")}
                  </ShowButton>

                  <Button variant="secondary" onClick={() => replaceRecipe(entry)}>
                    <Icon icon={ic_swap_horiz} /> {t("weekplan:list.replace")}
                  </Button>
                  <DeleteButton onClick={() => deleteItem(entry)}>{t("translation:delete")}</DeleteButton>
                </ButtonGroup>
              </li>
            ))}
          </ul>
        )}
      </MetaList>

      <ReplaceModal />
    </>
  );
}
