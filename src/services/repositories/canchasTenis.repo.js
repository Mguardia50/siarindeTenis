import { canchasTenisDao } from "../factory/DAOFactoryLu.js";
import canchasDTO from "../DTO/canchas.dto.js";

export default class CanchastenisRepository {
    constructor(){

    }

    async listarCanchaTenis(){
        const canchas = await canchasTenisDao.listarCanchaTenis();
        const canchaDto = canchas.map( cancha => {
            return new canchasDTO(cancha);
        })
    
        return canchaDto;
    }

}