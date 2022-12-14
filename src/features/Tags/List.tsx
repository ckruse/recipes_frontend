import { Link } from "react-router-dom";

import { TAG_DELETE_MUTATION, TAGS_COUNT_QUERY, TAGS_W_COUNT_QUERY } from "../../graphql/tags";
import { useAppSelector, useList } from "../../hooks";
import { TTag } from "../../types";
import { showTagPath } from "../../urls";
import MetaList from "../MetaList";

export default function List() {
  const page = useAppSelector((state) => state.metaList.pages["tags"] || 0);

  const { items, count } = useList<TTag>({
    query: TAGS_W_COUNT_QUERY,
    countQuery: TAGS_COUNT_QUERY,
    deleteMutation: TAG_DELETE_MUTATION,
    variables: {
      limit: 25,
      offset: page * 25,
    },
  });

  return (
    <MetaList listKey="tags" items={items} count={count} title="TODO: Tags">
      {(tags) => (
        <ul className="recipes-tags-list">
          {tags.map((tag) => (
            <li key={tag.id}>
              <span className="tag">
                <Link to={showTagPath(tag)}>{tag.name}</Link> ({tag.recipesCount})
              </span>
            </li>
          ))}
        </ul>
      )}
    </MetaList>
  );
}
