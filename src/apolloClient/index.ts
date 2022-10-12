import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const URI = process.env.NODE_ENV === "production" ? "https://recipes.wwwtech.de" : "http://localhost:8080";

const httpLink = new HttpLink({ uri: `${URI}/graphql`, fetchOptions: { credentials: "include" } });

const client = new ApolloClient({
  link: httpLink,
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
