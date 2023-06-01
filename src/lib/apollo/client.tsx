import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import Cookies from 'js-cookie'
import { toast } from 'react-hot-toast'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorLink = onError(({ graphQLErrors, networkError, response }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message }) => {
      toast.error(message)
    })
  } else if (response?.errors) {
    response.errors.map(({ message }) => {
      toast.error(message)
    })
  }
  if (networkError) {
    toast.error('Server is not connected ')
  }
})
const uri = process.env.NEXT_PUBLIC_SERVER_URL
const httpLink = ApolloLink.from([errorLink, new HttpLink({ uri: `${uri}/graphql` })])
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
  cache: new InMemoryCache({
    addTypename: false,
    resultCaching: false
  }),
  link: authLink.concat(httpLink),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache'
    },
    mutate: {
      fetchPolicy: 'no-cache'
    }
  }
})

export default client
