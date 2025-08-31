import { useMutation, useQuery } from "@apollo/client/react";
import { Trans, useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";

import { RECIPES_COUNT_QUERY, RECIPES_QUERY } from "@graphql/recipes";
import { TAG_DELETE_MUTATION, TAG_QUERY } from "@graphql/tags";

import { selectSession } from "@/App/sessionSlice";
import { CancelButton, DeleteButton, FormActions } from "@/components";
import { addErrorFlash, addSuccessFlash } from "@/features/Flash/flashSlice";
import MetaList from "@/features/MetaList";
import { MutationError } from "@/handleError";
import { useAppDispatch, useAppSelector, useList } from "@/hooks";
import may from "@/permissions";
import { showRecipePath, tagsPath } from "@/urls";
import { parsedInt } from "@/utils/numbers";

export default function Show() {
  const { id } = useParams<"id">();
  const { t } = useTranslation(["tags", "translation"]);
  const { user } = useAppSelector(selectSession);
  const pageId = `tags/${id}`;

  const page = useAppSelector((state) => state.metaList.pages[pageId] || 0);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data } = useQuery<ITagData>(TAG_QUERY, { variables: { id: parsedInt(id) } });
  const [deleteTagMutation] = useMutation<ITagDeleteMutation>(TAG_DELETE_MUTATION);

  const { items, count } = useList<TRecipe>({
    query: RECIPES_QUERY,
    countQuery: RECIPES_COUNT_QUERY,
    variables: {
      tags: [data?.tag.name],
      limit: 25,
      offset: page * 25,
    },
  });

  async function deleteTag() {
    try {
      const { data, error } = await deleteTagMutation({ variables: { id: parsedInt(id) } });

      if (!data?.deleteTag) {
        console.log(error);
        // TODO: handle error
        throw new MutationError();
      }

      dispatch(addSuccessFlash(t("tags:show.deleted")));
      navigate(tagsPath());
    } catch (e) {
      dispatch(addErrorFlash(t("translation:errors.general")));
      console.error(e);
    }
  }

  return (
    <>
      <h1>{t("tags:show.title", { tag: data?.tag.name || "…" })}</h1>

      <Trans parent="p" t={t} i18nKey="tags:show.no_recipes" count={count}>
        Diesem Tag sind {{ count }} Rezepte zugeordnet.
      </Trans>

      <MetaList
        listKey={pageId}
        items={items}
        count={count}
        title={t("tags:show.title", { tag: data?.tag.name || "…" })}
      >
        {(recipes) => (
          <ul>
            {recipes.map((recipe) => (
              <li key={recipe.id}>
                <Link to={showRecipePath(recipe)}>{recipe.name}</Link>
              </li>
            ))}
          </ul>
        )}
      </MetaList>

      <FormActions>
        <CancelButton as={Link} to={tagsPath()}>
          {t("translation:back")}
        </CancelButton>

        {may(user, "tags", "delete", data?.tag) && (
          <DeleteButton onClick={deleteTag}>{t("translation:delete")}</DeleteButton>
        )}
      </FormActions>
    </>
  );
}
