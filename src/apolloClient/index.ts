import { ApolloClient, InMemoryCache } from "@apollo/client";

import { createUploadLink } from "apollo-upload-client";

import { URI } from "../utils";

const uploadLink = createUploadLink({ uri: `${URI}/graphql`, fetchOptions: { credentials: "include" } });

const client = new ApolloClient({
  link: uploadLink,
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
