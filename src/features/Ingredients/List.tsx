import { Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { selectSession } from "../../App/sessionSlice";
import { ActionColumn, DeleteButton, EditButton, NoDataTd, ShowButton } from "../../components";
import { indexDate } from "../../dateUtils";
import { INGREDIENT_DELETE_MUTATION, INGREDIENTS_COUNT_QUERY, INGREDIENTS_QUERY } from "../../graphql/ingredients";
import { useAppSelector, useList } from "../../hooks";
import may from "../../permissions";
import { TIngredient } from "../../types";
import { editIngredientPath, showIngredientPath } from "../../urls";
import { calories } from "../../utils";
import { formatIntNumberRounded } from "../../utils/numbers";
import MetaList from "../MetaList";

export default function List() {
  const { user } = useAppSelector(selectSession);
  const page = useAppSelector((state) => state.metaList.pages["ingredients"] || 0);
  const { t } = useTranslation(["ingredients", "translation"]);

  const { items, count, deleteItem } = useList<TIngredient>({
    query: INGREDIENTS_QUERY,
    countQuery: INGREDIENTS_COUNT_QUERY,
    deleteMutation: INGREDIENT_DELETE_MUTATION,
    variables: {
      limit: 25,
      offset: page * 25,
    },
    deletionMessage: t("ingredients:list.deleted"),
  });

  return (
    <MetaList listKey="recipes" items={items} count={count} title={t("ingredients:list.title")} perPage={25}>
      {(ingredients) => (
        <Table>
          <thead>
            <tr>
              <th>{t("ingredients:fieldnames.name")}</th>
              <th>{t("ingredients:fieldnames.reference")}</th>
              <th>{t("ingredients:fieldnames.calories")}</th>
              <th>{t("ingredients:fieldnames.inserted_at")}</th>
              <th>{t("ingredients:fieldnames.updated_at")}</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            <NoDataTd data={ingredients} />

            {ingredients.map((ingredient) => (
              <tr key={ingredient.id}>
                <td>{ingredient.name}</td>
                <td>{t(`ingredients:units.${ingredient.reference}`)}</td>
                <td>{formatIntNumberRounded(calories(ingredient))} kcal</td>
                <td>{indexDate(ingredient.insertedAt)}</td>
                <td>{indexDate(ingredient.updatedAt)}</td>
                <ActionColumn>
                  <ShowButton as={Link} to={showIngredientPath(ingredient)}>
                    {t("translation:show")}
                  </ShowButton>

                  {may(user, "ingredients", "edit", ingredient) && (
                    <EditButton as={Link} to={editIngredientPath(ingredient)}>
                      {t("translation:edit")}
                    </EditButton>
                  )}

                  {may(user, "ingredients", "delete", ingredient) && (
                    <DeleteButton onClick={() => deleteItem(ingredient)}>{t("translation:delete")}</DeleteButton>
                  )}
                </ActionColumn>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </MetaList>
  );
}
