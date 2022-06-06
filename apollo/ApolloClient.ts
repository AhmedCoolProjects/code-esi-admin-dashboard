import { ApolloClient, InMemoryCache } from "@apollo/client";

// export const userVar = makeVar(null);

// Apollo GraphQL client.
const ApolloCustomClient = new ApolloClient({
  //   headers: {
  //     authorization: `ApiKey ${process.env.NEXT_PUBLIC_JINAEP_APP_API_KEY}`,
  //   },
  uri: `${process.env.NEXT_PUBLIC_API_APOLLO_SERVER}`,
  cache: new InMemoryCache(),
});

export default ApolloCustomClient;
