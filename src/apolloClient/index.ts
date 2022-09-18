import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";

import { getAuthorizationToken } from "../authenticationToken";

const URI = process.env.NODE_ENV === "production" ? "https://recipes.wwwtech.de" : "http://localhost:4000";

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
});

export default client;
