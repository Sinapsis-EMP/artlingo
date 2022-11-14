import { ApolloClient, InMemoryCache } from '@apollo/client';
import Constants from 'expo-constants';

const hasuraUri = process.env.API_URL;

export default new ApolloClient({
  cache: new InMemoryCache(),
  uri: hasuraUri,
});
