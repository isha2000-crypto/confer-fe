import * as ApiAssessments from './ApiAssessments'
import * as ApiFiles from './FileUpload'

const ApiService = () => {
  return {
    ...ApiAssessments,
    ...ApiFiles
  }
}

export default ApiService
