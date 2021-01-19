import firebase from 'firebase'
require('@firebase/firestore')
var firebaseConfig = {
    apiKey: "AIzaSyCRRGfieUe_Cv4NHjDPKs4qT2oGcWf_iPQ",
    authDomain: "book-santa-ea9af.firebaseapp.com",
    projectId: "book-santa-ea9af",
    storageBucket: "book-santa-ea9af.appspot.com",
    messagingSenderId: "244992882947",
    appId: "1:244992882947:web:c5bb8dc2b50730432dd136"
  };

firebase.initiazeApp(firebaseConfig);

export default firebase.firestore();