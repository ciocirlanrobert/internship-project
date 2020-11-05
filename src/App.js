import React from "react";
import RouteHandler from "./Router.jsx";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import UserContextProvider from "./context/UserContext";
import ErrorBoundary from "./utils/ErrorBoundary";
import {ToastProvider} from "react-toast-notifications";

const client = new ApolloClient({
  uri: "http://localhost:4001/gql",
  cache: new InMemoryCache(),
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLErrors", graphQLErrors);
    console.log("networkError", networkError);
  },
});

export default function App() {
    return (
    <ApolloProvider client={client}>
      <ToastProvider>
      <UserContextProvider>
      <ErrorBoundary>
        <RouteHandler />
        </ErrorBoundary>
      </UserContextProvider>
      </ToastProvider>
    </ApolloProvider>
  );
}
