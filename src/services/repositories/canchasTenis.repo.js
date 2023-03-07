import { canchasTenisDao } from "../factory/DAOFactory.js";
import canchasDTO from "../DTO/canchas.dto.js";


/* Esto no tiene sentido práctico....puedo usar todo desde el mismo archivo daosCanchaTenis
No me resulta útil tantos códigos de más cuando puedo solo invocar al daooscanchatenis
Seria basicamente copiar y pegar los métodos.... */
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