import { tenistasDao } from "../factory/DAOFactory.js";
import TenistasDTO from "../DTO/tenistas.dto.js";

export default class tenistasRepository {
    constructor(){

    }

    async listarTenistas(){
        const tenistas = await tenistasDao.listarTenistas();
        const tenistasDto = tenistas.map( tenista => {
            return new TenistasDTO(tenista);
        })
    
        return tenistasDto;
    }

}