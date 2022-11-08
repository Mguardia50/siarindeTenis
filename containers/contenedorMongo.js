import mongoose from "mongoose";
import Config from "../config.js";


await mongoose.connect(Config.mongoDB.dbPath);

export default class ContenedorMongoTenis {

    constructor(coleccion, esquema){
        this.col = mongoose.model(coleccion, esquema)
    }

    async listarTenistas(dni){
        try{

        let tenistas = await this.col.find({dniTenista: dni})
        let todos = await this.col.find({})

            dni == null ? console.log(todos) : (
            tenistas == "" ? console.log("no existe tenista con ese DNI") : console.log(tenistas) 
            ) 
            
    }catch(e){
        throw new Error(e)
    }

        
    }

    async agregarTenista(tenista){
        try{
            await this.col.create(tenista)
        } catch(e){
            throw new Error(e);
        }
        
    }

    async eliminarTenista(dni){
        await this.col.deleteOne({dniTenista: dni})
        console.log("eliminado: " + dni)
    }

    async modificarTenista(dni, remplazo){
        await this.col.updateOne({dniTenista: dni}, remplazo);
    }
}

