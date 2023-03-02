// here we will export all the functions
import * as ApiUsers from './ApiUsers'

const ApiService = () => {
  return {
    ...ApiUsers
  }
}
export default ApiService
