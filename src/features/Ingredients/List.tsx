import { Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { ActionColumn, DeleteButton, EditButton, NoDataTd, ShowButton } from "../../components";
import { indexDate } from "../../dateUtils";
import { INGREDIENT_DELETE_MUTATION, INGREDIENTS_COUNT_QUERY, INGREDIENTS_QUERY } from "../../graphql/ingredients";
import { useAppSelector, useList } from "../../hooks";
import { TIngredient } from "../../types";
import { editIngredientPath, showIngredientPath } from "../../urls";
import { calories } from "../../utils";
import MetaList from "../MetaList";

export default function List() {
  const page = useAppSelector((state) => state.metaList.pages["ingredients"] || 0);
  const { t } = useTranslation(["ingredients", "translation"]);

  const { items, count, deleteItem } = useList<TIngredient>({
    query: INGREDIENTS_QUERY,
    countQuery: INGREDIENTS_COUNT_QUERY,
    deleteMutation: INGREDIENT_DELETE_MUTATION,
    variables: {
      limit: 50,
      offset: page * 50,
    },
    deletionMessage: t("ingredients:list.deleted"),
  });

  return (
    <MetaList listKey="recipes" items={items} count={count} title={t("ingredients:list.title")}>
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
                <td>{ingredient.reference}</td>
                <td>{calories(ingredient)}</td>
                <td>{indexDate(ingredient.insertedAt)}</td>
                <td>{indexDate(ingredient.updatedAt)}</td>
                <ActionColumn>
                  <ShowButton as={Link} to={showIngredientPath(ingredient)}>
                    {t("translation:show")}
                  </ShowButton>
                  <EditButton as={Link} to={editIngredientPath(ingredient)}>
                    {t("translation:edit")}
                  </EditButton>
                  <DeleteButton onClick={() => deleteItem(ingredient)}>{t("translation:delete")}</DeleteButton>
                </ActionColumn>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </MetaList>
  );
}
