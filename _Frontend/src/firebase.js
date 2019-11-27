import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyAKqVgwv_eyF2i_NsLiq3l8TICPWtHWggY",
    authDomain: "melbourne-datathon-ce336.firebaseapp.com",
    databaseURL: "https://melbourne-datathon-ce336.firebaseio.com",
    projectId: "melbourne-datathon-ce336",
    storageBucket: "melbourne-datathon-ce336.appspot.com",
    messagingSenderId: "200342952136",
    appId: "1:200342952136:web:421a6dd8f8c44639eeadfd",
    measurementId: "G-LQQ2V4RY19"
  };

  export const firebaseApp = firebase.initializeApp(firebaseConfig);
  
