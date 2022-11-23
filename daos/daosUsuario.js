import mongoose from "mongoose";
import ContenedorMongoTenis from "../containers/contenedorMongo.js";

class daoUsuarios extends ContenedorMongoTenis {

    constructor(){
        super("usuarios", {
            
            UserMail: {type: String, unique: true},
            password: String,
            
            
        })
    }

    async agregarUsuario(usuario){
        try{
            await this.col.create(usuario)
            console.log("cargao")
      
        } catch(e){
            throw new Error(e);
        }
        
    }

    async buscarUsuario(mail, password){
        try{

            
        let username = await this.col.find({UserMail: mail, password: password})
        
            //console.log(username) 
        
        return username
     
        }catch(e){
            throw new Error("Error de autentificación")
        }    
    }

    async buscarUser(mail){
        try{

            let user = await this.col.findOne({UserMail: mail})
            
            const user2 = user.UserMail 
            console.log(user2)
        /* if (user == null){
            return user = "error"
        } */
            return user
     
        }catch(e){
          
            console.log("Usuario Registrado")

        }    
    }


}

export default daoUsuarios