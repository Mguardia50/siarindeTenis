
import mongoose from "mongoose";
import ContenedorMongoTenis from "../containers/contenedorMongo.js";

class daoChatTenis extends ContenedorMongoTenis {

    constructor(){
        super("chatTenis", {
            
            mailTenista: String,
            autor: {   
                nombreTenista: String,
                apellidoTenista: String,
                categoria: String,
            },
            mensaje: [String],  
            
        })
    }

    async agregarMensaje(mensaje){
        try{
            await this.col.create(mensaje)
            console.log("cargao")
      
        } catch(e){
            throw new Error(e);
        }
        
    }

    async listarMensajes(){
        try{

        let todos = await this.col.find({})
  
        return todos

            }catch(e){
                throw new Error(e)
            }
    }

    async modificarMensaje(mail, msg){
        
        await this.col.updateOne( {mailTenista: mail}, {$push: {mensaje: [msg]}});
        let todos = await this.col.find({mailTenista: mail})
        console.log (todos + "modificao")
   
    }

}

/* const mensajex = {autor: {mailTenista: "coso@nose.com", avatar: "queseyo", nombreTenista: "gustavo", apellidoTenista: "Kuerten"}, mensaje: "hola mundo"}

const daoChat = new daoChatTenis()
await daoChat.agregarMensaje(mensajex) */

/* const daoChat = new daoChatTenis()
await daoChat.modificarMensaje("cataplasma@coso.com", "modificando esto") */

export default daoChatTenis