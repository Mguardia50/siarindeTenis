import mongoose from "mongoose";
import ContenedorMongoTenis from "../containers/contenedorMongo.js";

class daoUsuarios extends ContenedorMongoTenis {

    constructor(){
        super("usuarios", {
            
            UserMail: {type: String, unique: true},
            password: String,
            telefono: Number,
            clave: Number,
            verificado: Boolean
            
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
            
            const user2 = {usuario: user.UserMail, clave: user.clave}
            console.log(user2)
        /* if (user == null){
            return user = "error"
        } */
            return user2
     
        }catch(e){
          
            console.log("Usuario Registrado")

        }    
    }

    async buscarPass(mail){
        try{

            let user = await this.col.findOne({UserMail: mail})
            
           
            return user
     
        }catch(e){
          
            console.log("Usuario Registrado")

        }    
    }

    async modificarUsuario(usuario, remplazo){
        try{
            await this.col.updateOne({UserMail: usuario}, remplazo);
      
        } catch(e){
            throw new Error(e);
        }
        
    }


}

let usuariosDao = new daoUsuarios()

export default usuariosDao;

/* export default daoUsuarios; */