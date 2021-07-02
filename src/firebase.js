import * as firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyA_DUAuBXRTIOp0K7stTKfyS4BebPPQfiY",
    authDomain: "ecommerce-dc209.firebaseapp.com",
    projectId: "ecommerce-dc209",
    storageBucket: "ecommerce-dc209.appspot.com",
    messagingSenderId: "761624794055",
    appId: "1:761624794055:web:7e13abc50b6f20ad303fe2"
  };

firebase.initializeApp(firebaseConfig)

// export 
export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider(); 