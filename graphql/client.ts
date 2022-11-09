import { ApolloClient, InMemoryCache } from '@apollo/client';

const hasuraUri = 'https://bursting-loon-17.hasura.app/v1/graphql';

export default new ApolloClient({
  cache: new InMemoryCache(),
  uri: hasuraUri,
});
