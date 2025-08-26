import { useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { USER_GET_QUERY } from "../../graphql/users";
import { useTitle } from "../../hooks";
import { type IUserData } from "../../types";
import { parsedInt } from "../../utils/numbers";

export default function Show() {
  const { id } = useParams<"id">();
  const { t } = useTranslation(["users", "translation"]);
  const { data } = useQuery<IUserData>(USER_GET_QUERY, { variables: { id: parsedInt(id) } });

  useTitle(t("users:show.title", { user: data?.user.name || data?.user.email || "…" }));

  return (
    <>
      <h1>{t("users:show.title", { user: data?.user.name || data?.user.email || "…" })}</h1>
      TODO: user-details anzeigen. Vielleicht mit Rezepten des Users?
    </>
  );
}
