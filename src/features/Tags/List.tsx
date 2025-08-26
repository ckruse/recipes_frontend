import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { TAG_DELETE_MUTATION, TAGS_W_COUNT_QUERY } from "../../graphql/tags";
import { useList, useTitle } from "../../hooks";
import type { TTag } from "../../types";
import { showTagPath } from "../../urls";

export default function List() {
  const { t } = useTranslation(["tags"]);

  const { items } = useList<TTag>({
    query: TAGS_W_COUNT_QUERY,
    deleteMutation: TAG_DELETE_MUTATION,
  });

  useTitle(t("tags:list.title"));

  return (
    <ul className="recipes-tags-list">
      {items?.map((tag) => (
        <li key={tag.id}>
          <span className="tag">
            <Link to={showTagPath(tag)}>{tag.name}</Link> ({tag.recipesCount})
          </span>
        </li>
      ))}
    </ul>
  );
}
