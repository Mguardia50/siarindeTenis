import admin from 'firebase-admin';
import Config from "../../config/config.js";


//const db = admin.firestore();

admin.initializeApp({
    credential: admin.credential.cert(Config.firebase),
    databaseURL: "https://siarinde.firebaseio.com"
}); 



export default class ContenedorCanchaTenis {

    constructor(collection){
        this.col = admin.firestore().collection(collection);
        this.db = admin.firestore()
    }

   
}

