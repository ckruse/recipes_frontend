import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";

import { getAuthorizationToken } from "../authenticationToken";

const URI = process.env.NODE_ENV === "production" ? "https://recipes.wwwtech.de" : "http://localhost:8080";

const httpLink = new HttpLink({ uri: `${URI}/graphql` });
const authMiddleware = new ApolloLink((operation, forward) => {
  const token = getAuthorizationToken();

  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });
  return forward(operation);
});

const authLink = authMiddleware.concat(httpLink);

const client = new ApolloClient({
  link: authLink,
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
