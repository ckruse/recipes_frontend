import { Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { selectSession } from "../../App/sessionSlice";
import { ActionColumn, DeleteButton, EditButton, ShowButton } from "../../components";
import { indexDate } from "../../dateUtils";
import { USER_COUNT_QUERY, USER_DELETE_MUTATION, USERS_QUERY } from "../../graphql/users";
import { useAppSelector, useList, usePermissionFallback } from "../../hooks";
import may from "../../permissions";
import type { TUser } from "../../types";
import { editUserPath, showUserPath } from "../../urls";
import MetaList from "../MetaList";

export default function List() {
  const { user: currentUser } = useSelector(selectSession);
  const page = useAppSelector((state) => state.metaList.pages["users"] || 0);
  const { t } = useTranslation(["users", "translation"]);
  usePermissionFallback(may(currentUser, "users", "list"));

  const { items, count, deleteItem } = useList<TUser>({
    query: USERS_QUERY,
    countQuery: USER_COUNT_QUERY,
    deleteMutation: USER_DELETE_MUTATION,
    variables: {
      limit: 25,
      offset: page * 25,
    },
    deletionMessage: t("users:list.deleted"),
  });

  return (
    <MetaList listKey="users" items={items} count={count} title={t("users:list.title")}>
      {(users) => (
        <Table>
          <thead>
            <tr>
              <th>{t("users:field_names.email")}</th>
              <th>{t("users:field_names.role")}</th>
              <th>{t("users:field_names.active")}</th>
              <th>{t("users:field_names.inserted_at")}</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={showUserPath(user)}>{user.email}</Link>
                </td>
                <td>{t(`users:roles.${user.role}`)}</td>
                <td>{user.active ? t("translation:yes") : t("translation:no")}</td>
                <td>{indexDate(user.insertedAt)}</td>
                <ActionColumn>
                  {may(currentUser, "users", "show", user) && (
                    <ShowButton as={Link} to={showUserPath(user)}>
                      {t("translation:show")}
                    </ShowButton>
                  )}

                  {may(currentUser, "users", "edit", user) && (
                    <EditButton as={Link} to={editUserPath(user)}>
                      {t("translation:edit")}
                    </EditButton>
                  )}

                  {may(currentUser, "users", "delete", user) && (
                    <DeleteButton onClick={() => deleteItem(user)}>{t("translation:delete")}</DeleteButton>
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
