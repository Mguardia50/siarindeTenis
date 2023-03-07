
import mongoose from "mongoose";
import ContenedorMongoTenis from "../containers/contenedorMongo.js";

class daoChatTenisPersonal extends ContenedorMongoTenis {

    constructor(){
        super("chatTenisPersonal", {
            
            mailDe: String,
            mailPara: String,
            timeStamp: String,
            mensaje: [String],  
            
        })
    }

    async agregarMensaje(mensaje){
        try{
            await this.col.create(mensaje)
            console.log("cargado")
      
        } catch(e){
            throw new Error(e);
        }
        
    }

    async listarMensajes(remitente, destinatario){
        try{
        let msjPersonal = []
        let enviados = await this.col.find({mailDe: remitente})
        let recividos = await this.col.find({mailPara: remitente})
        enviados.forEach(msj => {
            if (msj.mailPara == destinatario){
                msjPersonal.push(msj)
            }
        })
        recividos.forEach(msj => {
            if (msj.mailDe == destinatario){
                msjPersonal.push(msj)
            }
        })
        return msjPersonal;

            }catch(e){
                throw new Error(e)
            }
    }

    async modificarMensaje(mail, msg){
        
        await this.col.updateOne( {mailTenista: mail}, {$push: {mensaje: [msg]}});
        let todos = await this.col.find({mailTenista: mail})
        console.log (todos + "modificao")
   
    }

    async eliminarMensajes(){
        try{
            await this.col.deleteMany({})
            console.log("eliminados todos los msj")
        
    }catch(e){
        throw new Error(e)
    }
   
    }

}


const chatTenisPersonal = new daoChatTenisPersonal();
export default chatTenisPersonal;

/* export default daoChatTenis; */