import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyCdf54PmHdFLtS1UNltLEFo0l6SQxuHhLE",
  authDomain: "cf-firebase-demo.firebaseapp.com",
  databaseURL: "https://cf-firebase-demo.firebaseio.com",
  projectId: "cf-firebase-demo",
  storageBucket: "cf-firebase-demo.appspot.com",
  messagingSenderId: "1097411355494"
}
firebase.initializeApp(config)

const firebaseAuth = firebase.auth()

export { firebaseAuth }
