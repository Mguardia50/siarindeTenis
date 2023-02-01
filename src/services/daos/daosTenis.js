import ContenedorMongoTenis from "../containers/contenedorMongo.js";
import TenistasDTO from "../DTO/tenistas.dto.js";

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

    /* async listarTenistas(){
        const data = await super.listarTenistas();
        //console.log(data)
        
        return new TenistasDTO(data)
    } */
}

/* const daoTenix = new daoTenistas();
const tenista = await daoTenix.listarTenistas();

 tenista.forEach((element) => {
    console.log(element)
}) */

let daoJugadoresTenis = new daoTenistas();


export default daoJugadoresTenis

/* export default daoTenistas; */