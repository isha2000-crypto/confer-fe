import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client'
import { onError } from '@apollo/client/link/error'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message }) => {
      alert(`Graphql error ${message}`)
    })
  }
})

const link = ApolloLink.from([errorLink, new HttpLink({ uri: 'http://localhost:4000/graphql' })])
export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
})

export default client
