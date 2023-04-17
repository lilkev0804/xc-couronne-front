import { ApolloClient, InMemoryCache } from "@apollo/client";

const xcApollo = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_ADRESS_GRAPHQL,
  cache: new InMemoryCache({
    addTypename: false,
  }),
});
export default xcApollo;
