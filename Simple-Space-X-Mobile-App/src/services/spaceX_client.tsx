import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// Apollo Client
const client = new ApolloClient({
    uri: 'https://spacex-production.up.railway.app/',
    cache: new InMemoryCache()
  });

export default client;