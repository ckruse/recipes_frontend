import { ApolloClient, from, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

import { getAuthorizationToken } from "@/authorizationToken";
import { URI } from "@/utils";

const uploadLink = createUploadLink({ uri: `${URI}/graphql`, fetchOptions: { credentials: "include" } });

const link = from([
  setContext((_, { headers }) => {
    const token = getAuthorizationToken();

    if (token) {
      headers = {
        ...headers,
        authorization: token ? `Bearer ${token}` : undefined,
      };
    }

    return { headers };
  }).concat(uploadLink),
]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache({}),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
    query: {
      fetchPolicy: "network-only",
    },
  },
});

export default client;
