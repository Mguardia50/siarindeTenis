import admin from 'firebase-admin';
import Config from "../config.js";

  

admin.initializeApp({
    credential: admin.credential.cert(Config.firebase),
    databaseURL: "https://siarinde.firebaseio.com"
}); 



export default class ContenedorCanchaTenis {

    constructor(collection){
        this.col = admin.firestore().collection(collection)
    }

    async listarCanchaTenis(){
        try{
            const listar = await this.col.get()
            listar.forEach(doc => console.log(doc.data()))
            
        } catch(e){
            throw new Error(e)
        }
        
        
    }

    async agregarCanchaTenis(cancha){
        await this.col.add(cancha)
    }

    async eliminarCanchaTenis(idCancha){
        await this.col({id: idCancha}).delete();
        console.log("eliminado: " + idCancha)
    }
}

