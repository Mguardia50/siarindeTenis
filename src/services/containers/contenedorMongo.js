import mongoose from "mongoose";
import Config from "../../config/config.js";



await mongoose.connect(Config.mongoDB.dbPath);

export default class ContenedorMongoTenis {

    constructor(coleccion, esquema){
        this.col = mongoose.model(coleccion, esquema)
    }

    
}

