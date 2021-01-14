import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import "./styles/index.css";
import "./styles/utilities.css";
import "./styles/components.css";
import App from "./App";

import { firebaseURI } from "./config";

const client = new ApolloClient({
  uri: firebaseURI,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
