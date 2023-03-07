import ContenedorCanchaTenis from "../containers/contenedorFirebase.js"
import { doc, setDoc } from "firebase/firestore";

class daoCanchasTenis extends ContenedorCanchaTenis {

    constructor(){
        super('canchasTenis');
    }
    async listarCanchaTenis(){
        try{
            const canchasTenisArray = []
            const listar = await this.col.get()
   
            listar.forEach(doc => canchasTenisArray.push(doc.data()))
            
            return canchasTenisArray;
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
            
            await this.col.doc(cancha.nombre).create(cancha)
            
            
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
    
    async buscarCancha(idCancha){
        const listar = await this.col.doc(idCancha).get()
        listar == "" ? console.log("cancha no encontrada") : console.log(JSON.stringify(listar.data()))
    }
}

/*  let canchasTenisFB = new daoCanchasTenis();

export default canchasTenisFB; */

export default daoCanchasTenis;