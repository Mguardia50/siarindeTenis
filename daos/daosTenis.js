import ContenedorMongoTenis from "../containers/contenedorMongo.js";

class daoTenistas extends ContenedorMongoTenis {

    constructor(){
        super("usuariosTenis", {
            nombreTenista: String,
            apellidoTenista: String,
            dniTenista: {type: Number, unique: true},
            mailTenista: String,
            telefonoTenista: Number,
            categoria: String,
            posicion: Number   
        })
    }

    async renderTenistas(){
        
    }
    async addCrypto() {
            //por ahora no
    }
}

export default daoTenistas