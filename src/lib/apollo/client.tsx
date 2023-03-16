import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import Cookies from 'js-cookie'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message }) => {
      alert(`Graphql error ${message}`)
    })
  }
})

const httpLink = ApolloLink.from([new HttpLink({ uri: 'http://localhost:4000/graphql' }), errorLink])
const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  const token = Cookies.get('access_token')

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : ''
    }
  })

  // Call the next link in the middleware chain.
  return forward(operation)
})
export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
})

export default client
