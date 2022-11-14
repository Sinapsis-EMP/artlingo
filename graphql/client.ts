import { ApolloClient, InMemoryCache } from '@apollo/client';
import Constants from 'expo-constants';

const hasuraUri = 'https://bursting-loon-17.hasura.app/v1/graphql';

console.log('hasuraUri', hasuraUri);

export default new ApolloClient({
  cache: new InMemoryCache(),
  uri: hasuraUri,
});
