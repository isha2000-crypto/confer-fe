import { Assessment } from '@custom-types/assessmentsType'
import { UserDataType } from '@custom-types/contextTypes'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import Firebase from 'src/configs/firebase'

// 'file' comes from the Blob or File API
export const uploadFile = async (file: Blob, user: UserDataType, assessment: Assessment) => {
  const storage = getStorage(Firebase)
  const storageRef = ref(storage, `videos/assessments/${assessment.id}/${user.id}/${file.name ?? Date.now()}`)
  const snapshot = await uploadBytes(storageRef, file)
  const downloadUrl = await getDownloadURL(snapshot.ref)

  return downloadUrl
}

export default {
  uploadFile: uploadFile
}
