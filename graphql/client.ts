import { ApolloClient, InMemoryCache } from '@apollo/client';
import Constants from 'expo-constants';

const hasuraUri = Constants.expoConfig.extra.apiUrl;

export default new ApolloClient({
  cache: new InMemoryCache(),
  uri: hasuraUri,
});
