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

/* const daoTenix = new daoTenistas();
const tenista = await daoTenix.listarTenistas();

 tenista.forEach((element) => {
    console.log(element)
}) */

const daoJugadoresTenis = new daoTenistas();


export default daoJugadoresTenis