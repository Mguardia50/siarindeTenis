import daoCanchasTenis from "../daos/daosCanchaTenis.js";
/* import daoChatTenis from "../daos/daosMensajes.js";
import daoTenistas from "../daos/daosTenis.js";
import daoUsuarios from "../daos/daosUsuario.js";
import daoReservaCanchasTenis from "../daos/doasReservas.js"; */

let canchasTenisDao;
let chatTenisDao;
let tenistasDao;
let usuariosDao;
let reservaCanchasTenisDao;

const option = process.argv[2] || 'DB'
switch(option){
    case "Mongo":
        chatTenisDao = new daoChatTenis();
        tenistasDao = new daoTenistas();
        usuariosDao = new daoUsuarios();
    break;
    case "Firebase":
        canchasTenisDao = new daoCanchasTenis();
        reservaCanchasTenisDao = new daoReservaCanchasTenis();
    break;
    default:
        /* chatTenisDao = new daoChatTenis();
        tenistasDao = new daoTenistas();
        usuariosDao = new daoUsuarios(); */
        canchasTenisDao = new daoCanchasTenis();
        /* reservaCanchasTenisDao = new daoReservaCanchasTenis(); */
    break;
}

class daoFactory {
    /* static getChatTenisDao(){
        return chatTenisDao;
    } 
    static getTenistasDao(){
        return tenistasDao;
    } 
    static getUsuariosDao(){
        return usuariosDao;
    } 
    static getReservasCanchasTenisDao(){
        return reservaCanchasTenisDao;
    }  */
    static getCanchasTenisDao(){
        return canchasTenisDao;
    } 

} 

export {canchasTenisDao}