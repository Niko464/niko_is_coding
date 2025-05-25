import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("access_token");
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(
    new HttpLink({
      uri: `${import.meta.env.VITE_BACKEND_URL!}/graphql`,
    })
  ),
  cache: new InMemoryCache(),
});
