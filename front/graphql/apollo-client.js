import { ApolloClient, InMemoryCache, from, HttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

const httpLink = new HttpLink({
  uri: 'http://localhost:3002/graphql',
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Log any GraphQL errors or network error that occurred
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    )
  if (networkError) console.error(`[Network error]: ${JSON.stringify(networkError, null, 2)})`)
})

const client = new ApolloClient({
  link: from([errorLink, httpLink]), // `httpLink` must be the last
  cache: new InMemoryCache(),
})

// const client = new ApolloClient({
//     uri:"http://localhost:3002/graphql",
//     cache: new InMemoryCache
// })

export default client;