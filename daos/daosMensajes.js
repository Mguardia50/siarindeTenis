import ContenedorMongoTenis from "../containers/contenedorMongo.js";

class daoChatTenis extends ContenedorMongoTenis {

    constructor(){
        super("chatTenis", {
            nombreTenista: String,
            apellidoTenista: String,
            mensaje: String,  
        })
    }

    async agregarMensaje(mensaje){
        try{
            await this.col.create(mensaje)
        } catch(e){
            throw new Error(e);
        }
        
    }

}

const mensajex = {nombreTenista: "gustavo", apellidoTenista: "Kuerten", mensaje: "hola mundo"}

const daoChat = new daoChatTenis()
await daoChat.agregarMensaje(mensajex)

export default daoChatTenis