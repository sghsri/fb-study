import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";


const firebase_config = {
    apiKey: "AIzaSyD4wUM0zzDJNsdUIAhVLzOjFn8nbyh7gsc",
    authDomain: "cme-faceboo.firebaseapp.com",
    databaseURL: "https://cme-faceboo.firebaseio.com",
    projectId: "cme-faceboo",
    storageBucket: "cme-faceboo.appspot.com",
    messagingSenderId: "931968360132",
    appId: "1:931968360132:web:f9f282eff560795a81f391",
    measurementId: "G-5K4LZ35VVM"
};

const app = firebase.initializeApp(firebase_config);
firebase.analytics();

export default app;