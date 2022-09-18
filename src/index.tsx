import "./styles/index.scss";

import React from "react";

import { ApolloProvider } from "@apollo/client";

import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import client from "./apolloClient";
import App from "./App";
import { refreshUser, setUser } from "./App/sessionSlice";
import { getAuthorizationToken } from "./authenticationToken";
import "./i18n";
import { store } from "./store";

const token = getAuthorizationToken();
if (token) {
  store.dispatch(refreshUser(client));
} else {
  store.dispatch(setUser(null));
}

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Router>
          <App />
        </Router>
      </ApolloProvider>
    </Provider>
  </React.StrictMode>
);
