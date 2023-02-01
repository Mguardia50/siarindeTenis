import express  from "express";
import daoJugadoresTenis from "../services/daos/daosTenis.js";
/* import canchasTenisFB from "../services/daos/daosCanchaTenis.js"; */
import cookieParser from "cookie-parser";
import enviarMail from "../utils/mail/nodemailer.js";
import canchasDTO from "../services/DTO/canchas.dto.js";
import reservaCanchasTenisFB from "../services/daos/doasReservas.js";
/* import daoFactory from "../services/factory/DAOFactoryLu.js"; */
import CanchastenisRepository from "../services/repositories/canchasTenis.repo.js";

const {Router} = express;

const routerTenis = Router();

const tenistas = await daoJugadoresTenis.listarTenistas();
/* const canchas = await canchasTenisFB.listarCanchaTenis(); */
/* const canchas = await daoFactory.getCanchasTenisDao(); */
const repoCanchas = new CanchastenisRepository();
const canchas = await repoCanchas.listarCanchaTenis()

routerTenis.get('/tenistas', (req, res) =>{

     res.render('tenistas',{tenistas}); 

})

routerTenis.get('/tenistas/api', (req, res) =>{
    
    res.send(tenistas)
})

routerTenis.get('/canchas', (req, res) =>{
   
    //res.send(JSON.stringify(canchas)) 
    res.render('canchas',{canchas});
 
})

routerTenis.post('/canchas', (req,res) =>{
    
    const mail = (req.cookies.mailUsuario);
    let fecha = new Date()
    const nombreCancha = req.body.nombreCancha;
    const horasReserva = req.body.horasReserva;
    const reservaDeCanchas = new canchasDTO ({nombreCancha, horasReserva, fecha})
    console.log(reservaDeCanchas)
    reservaCanchasTenisFB.agregarReserva({reserva: reservaDeCanchas});
    const text = ("se reservo correctamente " + nombreCancha + " " + horasReserva + "horas")
    //enviarMail("Reserva realizada para " + text,text, mail)
    res.send("reservada")
})

routerTenis.get('/chat', (req, res) =>{

    //logger.error('Error, ver consola en ' + req.url)

    res.render('chat',{
       
    });
})

export default routerTenis


