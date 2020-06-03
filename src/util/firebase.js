import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";


const firebase_config = {
    apiKey: "AIzaSyDPMxU4ncOx5FRC_s5MMvruRmIgUKeWjok",
    authDomain: "cme-facebook-2.firebaseapp.com",
    databaseURL: "https://cme-facebook-2.firebaseio.com",
    projectId: "cme-facebook-2",
    storageBucket: "cme-facebook-2.appspot.com",
    messagingSenderId: "793918324079",
    appId: "1:793918324079:web:9c76de80f0157033893c9a",
    measurementId: "G-9FGX4CS8XW"
};

const app = firebase.initializeApp(firebase_config);
firebase.analytics();

export default app;