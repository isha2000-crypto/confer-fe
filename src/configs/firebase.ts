// Import the functions you need from the SDKs you need
import Firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA88yCTj3ui8SAt-XwDa6GWuj0dZQgwvSU',
  authDomain: 'confer-dev-a5e2f.firebaseapp.com',
  projectId: 'confer-dev-a5e2f',
  storageBucket: 'confer-dev-a5e2f.appspot.com',
  messagingSenderId: '106523568380',
  appId: '1:106523568380:web:9f74219740a5f87b858f79'
}

const app = Firebase.initializeApp(firebaseConfig)

export default app
