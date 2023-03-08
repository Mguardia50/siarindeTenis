
import mongoose from "mongoose";
import ContenedorMongoTenis from "../containers/contenedorMongo.js";

class daoChatTenisPersonal extends ContenedorMongoTenis {

    constructor(){
        super("chatTenisPersonal", {
            
            mailDe: String,
            mailPara: String,
            
            mensaje: [{
                mensaje: String,
                timeStamp: String,}],  
            
        })
    }

    async agregarMensaje(mensaje){
        
        try{
        let existe = await this.listarMensajes(mensaje.mailDe, mensaje.mailPara);
        const remitente = existe =="" ? null  : (existe[0].mailDe);
        if (mensaje.mailDe == remitente) {
           await this.modificarMensaje(mensaje.mailDe, mensaje.mensaje)
        }else{
            await this.col.create(mensaje)
            console.log("cargado")
        }
        
            
        } catch(e){
            throw new Error(e);
        }
        
    }

    async listarMensajes(remitente, destinatario){
        try{
        let msjPersonal = []
        let enviados = await this.col.find({mailDe: remitente})
        let recibidos = await this.col.find({mailPara: remitente})
        enviados.forEach(msj => {
            if (msj.mailPara == destinatario){
                msjPersonal.push(msj)
            }
        })
        recibidos.forEach(msj => {
            if (msj.mailDe == destinatario){
                msjPersonal.push(msj)
            }
        })
        return msjPersonal;

            }catch(e){
                console.log("no encontrado")
                //throw new Error(e)
            }
    }

    async modificarMensaje(mail, msg){
        
        await this.col.updateOne( {mailDe: mail}, {$push: {mensaje: msg}});
        console.log ("modificao")
   
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