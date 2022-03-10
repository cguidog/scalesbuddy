import {
    ApolloClient,
    InMemoryCache,
} from "@apollo/client";

const client = new ApolloClient({
    uri: 'https://headless.local/graphql',
    cache: new InMemoryCache()
});

export default client;