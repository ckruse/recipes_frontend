import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
import { ApolloError } from "@apollo/client/v4-migration";
import { type DocumentNode } from "graphql";
import _ from "lodash";
import { useTranslation } from "react-i18next";

import { updateDeletion } from "@/apolloClient/utils";
import { addErrorFlash, addSuccessFlash } from "@/features/Flash/flashSlice";
import { MutationError } from "@/handleError";

import { useAppDispatch } from ".";

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

export function useList<T extends { id: TID }>(props: PropsTypeNoDelete<T>): ReturnTypeNoDelete<T>;
export function useList<T extends { id: TID }>(props: PropsTypeDelete<T>): ReturnTypeDelete<T>;

export function useList<T extends { id: TID }>({
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

  const [deleteItemMutation] = useMutation(deleteMutation || DUMMY_MUTATION);

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

            const { data, error } = await deleteItemMutation({
              variables,
              update: (cache) => updateDeletion(cache, item.id, key),
            });
            const val = _.values(data)[0];

            if (!val) {
              console.log(error);
              // TODO: handle errors
              throw new MutationError();
            }

            dispatch(addSuccessFlash(deletionMessage || t("translation:global.successfully_deleted")));
          } catch (e) {
            console.log(e);
            dispatch(addErrorFlash(t("translation:errors.general")));
          }
        };

  return { items, error, count, countError, deleteItem };
}
