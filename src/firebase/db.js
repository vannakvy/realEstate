import firebase from 'firebase';
import 'firebase/storage';

const Config = {
 apiKey: 'AIzaSyAMJXryxYirYxa-kwixqvEVHvXiCveyoRo',
 authDomain: 'stable-synapse-315602.firebaseapp.com',
 projectId: 'stable-synapse-315602',
 storageBucket: 'stable-synapse-315602.appspot.com',
 messagingSenderId: '611039870176',
 appId: '1:611039870176:web:e3e8d3e6d98d103c16a485',
};
// Initialize Firebase
const initailApp = firebase.initializeApp(Config);
const db = initailApp.firestore(initailApp);
export const storageRef = firebase.storage().ref();

export const auth = firebase.auth();
export default db;
