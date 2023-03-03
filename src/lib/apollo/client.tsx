import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client'
import { onError } from 'apollo-link-error'


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message }) => {
      alert(`Graphql error ${message}`)
    })
  }
})

const link = from([errorLink, new HttpLink({ uri: 'http://localhost:4000/graphql' })])
export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
})

export default client
