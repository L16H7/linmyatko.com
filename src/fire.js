import firebase from 'firebase';
var config = {
    apiKey: "AIzaSyCmQ6Qu2aoGyvQRprDkfig6p1uS7f0bUbI",
    authDomain: "myanmar-names.firebaseapp.com",
    databaseURL: "https://myanmar-names.firebaseio.com",
    projectId: "myanmar-names",
    storageBucket: "myanmar-names.appspot.com",
    messagingSenderId: "16620015866"
  };
var fire = firebase.initializeApp(config);

export default fire;
