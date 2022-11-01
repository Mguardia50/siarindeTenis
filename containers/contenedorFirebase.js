import admin from 'firebase-admin';
import Config from "../config.js";


//const db = admin.firestore();

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

    async modificarCancha(idCancha, remplazo){
        try{
        let anterior = await this.col.doc(idCancha).get()   
        await this.col.doc(idCancha).update(remplazo)
        console.log(JSON.stringify(anterior.data()) + "-->modificación " + JSON.stringify(remplazo))   
        }catch(e){
            console.log(e)
        }  
    }

    async agregarCanchaTenis(cancha){
        try{
            await this.col.add(cancha)
            console.log("agregada " + JSON.stringify(cancha))
        } catch(e){
            console.log(e)
        }
        
    }

    async eliminarCanchaTenis(idCancha){
        try{
            await this.col.doc(idCancha).delete();
            console.log("eliminado: " + idCancha)
        }catch(e){
            console.log(e)
        }
    }
}

