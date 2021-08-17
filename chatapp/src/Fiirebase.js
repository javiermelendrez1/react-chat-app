import firebase from 'firebase/app'; //in our node modules 
import 'firebase/auth';

//exporting the firebase authentication
export const auth =  firebase.initializeApp({
    apiKey: "AIzaSyC4euyEeXWGumWGGl9qohHFc_hCnhEObPg",
    authDomain: "fir-chat-f4088.firebaseapp.com",
    projectId: "fir-chat-f4088",
    storageBucket: "fir-chat-f4088.appspot.com",
    messagingSenderId: "430819085735",
    appId: "1:430819085735:web:a928a91c04b8104fa93a82"
  }).auth();