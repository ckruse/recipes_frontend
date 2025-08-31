import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";
import UploadHttpLink from "apollo-upload-client/UploadHttpLink.mjs";

import { getAuthorizationToken } from "@/authorizationToken";
import { URI } from "@/utils";

const uploadLink = new UploadHttpLink({ uri: `${URI}/graphql`, fetchOptions: { credentials: "include" } });

const authLink = new SetContextLink(({ headers }, _operation) => {
  const token = getAuthorizationToken();

  if (token) {
    headers = {
      ...headers,
      authorization: token ? `Bearer ${token}` : undefined,
    };
  }

  return { headers };
});

const link = ApolloLink.from([authLink.concat(uploadLink)]);

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
