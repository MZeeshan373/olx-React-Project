import firebase from 'firebase/app';
import 'firebase/storage';

 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyB-6NWhByZt2QAU-pqGjliIQqCMNL0LpAU",
    authDomain: "dummyproject-57acb.firebaseapp.com",
    databaseURL: "https://dummyproject-57acb.firebaseio.com",
    projectId: "dummyproject-57acb",
    storageBucket: "dummyproject-57acb.appspot.com",
    messagingSenderId: "284703498954"
  };
  firebase.initializeApp(config);


  const storage=firebase.storage();

export {
    storage, firebase as default
}