import { ApolloError, gql, useMutation, useQuery } from "@apollo/client";

import { DocumentNode } from "graphql";
import _ from "lodash";
import { useTranslation } from "react-i18next";

import { useAppDispatch } from ".";
import { updateDeletion } from "../apolloClient/utils";
import { addErrorFlash, addSuccessFlash } from "../features/Flash/flashSlice";
import { MutationError } from "../handleError";

type PropsTypeNoDelete<T> = {
  query: DocumentNode;
  countQuery?: DocumentNode;
  variables?: Record<string, any>;
  deleteMutation?: undefined;
  deletionMessage?: string;
  deletionParameterName?: string;
  deletionParameters?: (item: T) => Record<string, any>;
};

type PropsTypeDelete<T> = {
  query: DocumentNode;
  countQuery?: DocumentNode;
  variables?: Record<string, any>;
  deleteMutation: DocumentNode;
  deletionMessage?: string;
  deletionParameterName?: string;
  deletionParameters?: (item: T) => Record<string, any>;
};

type PropsType<T> = PropsTypeNoDelete<T> | PropsTypeDelete<T>;

type ReturnTypeNoDelete<T> = {
  items: T[] | undefined;
  error: ApolloError | undefined;
  count: number;
  countError: ApolloError | undefined;
  deleteItem: undefined;
};

type ReturnTypeDelete<T> = {
  items: T[] | undefined;
  error: ApolloError | undefined;
  count: number;
  countError: ApolloError | undefined;
  deleteItem: (item: T) => Promise<void>;
};

type ReturnType<T> = ReturnTypeNoDelete<T> | ReturnTypeDelete<T>;

const DUMMY_QUERY = gql`
  query {
    dummy
  }
`;

const DUMMY_MUTATION = gql`
  mutation {
    dummy
  }
`;

export function useList<T extends { id: string }>(props: PropsTypeNoDelete<T>): ReturnTypeNoDelete<T>;
export function useList<T extends { id: string }>(props: PropsTypeDelete<T>): ReturnTypeDelete<T>;

export function useList<T extends { id: string }>({
  query,
  countQuery,
  variables,
  deleteMutation,
  deletionMessage,
  deletionParameterName = "id",
  deletionParameters,
}: PropsType<T>): ReturnType<T> | ReturnTypeNoDelete<T> {
  const dispatch = useAppDispatch();
  const { t } = useTranslation(["translation"]);

  const { data, error } = useQuery(query, { variables });
  const { data: countData, error: countError } = useQuery(countQuery || DUMMY_QUERY, { variables, skip: !countQuery });

  const key = _.keys(data)[0];

  const [deleteItemMutation] = useMutation(deleteMutation || DUMMY_MUTATION, {
    update: (cache, { data }) => {
      const item = _.values(data)[0];

      if (item.successful === undefined) {
        updateDeletion(cache, item.id, key);
      } else {
        if (item.result) {
          updateDeletion(cache, item.result.id, key);
        }
      }
    },
  });

  const items: T[] | undefined = _.values(data)[0];
  const count: number = _.values(countData)[0] || 0;

  const deleteItem =
    deleteMutation === undefined
      ? undefined
      : async (item: T) => {
          try {
            const variables = deletionParameters
              ? deletionParameters(item)
              : {
                  [deletionParameterName]: item.id,
                };

            const { data } = await deleteItemMutation({ variables });
            const val = _.values(data)[0];

            if (!val?.successful) {
              throw new MutationError(val);
            }

            dispatch(addSuccessFlash(deletionMessage || t("translation:global.successfully_deleted")));
          } catch (e) {
            console.log(e);
            dispatch(addErrorFlash(t("translation:errors.general")));
          }
        };

  return { items, error, count, countError, deleteItem };
}
