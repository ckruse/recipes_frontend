import { ApolloCache } from "@apollo/client";

import _ from "lodash";

import { Nilable } from "../types";

export function updateDeletion<T = any>(cache: ApolloCache<T>, id: Nilable<string>, field: string, broadcast = true) {
  if (!id) {
    return;
  }

  cache.modify({
    fields: {
      [field]: (list, { readField }) => {
        return _.filter(list, (obj) => readField("id", obj) !== id);
      },
    },
    broadcast,
  });
}

interface IdInterface {
  id: string;
  [key: string]: any;
  [key: number]: any;
}

export function updateMutationList(
  cache: ApolloCache<any>,
  object: Nilable<IdInterface>,
  field: string,
  broadcast = true
) {
  if (!object?.id) {
    return;
  }

  cache.modify({
    fields: {
      [field]: (list, { readField }) => {
        const idx = _.findIndex<any>(list, (obj) => readField("id", obj) === object.id);

        if (idx === -1) {
          return [...list, object];
        }

        return [...list.slice(0, idx), object, ...list.slice(idx + 1)];
      },
    },
    broadcast,
  });
}
