import { ApolloClient, InMemoryCache } from '@apollo/client';
// import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

const hasuraUri = 'https://bursting-loon-17.hasura.app/v1/graphql';

// const httpLink = new HttpLink({
//   uri: hasuraUri,
// });

export default new ApolloClient({
  cache: new InMemoryCache(),
  uri: hasuraUri,
  //link: asyncAuthLink.concat(httpLink),
});
