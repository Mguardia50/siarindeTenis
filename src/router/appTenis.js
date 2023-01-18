import express  from "express";
import daoTenistas from "../services/daos/daosTenis.js";
import canchasTenisFB from "../services/daos/daosCanchaTenis.js";
import cookieParser from "cookie-parser";
import enviarMail from "../utils/mail/nodemailer.js";

const {Router} = express;

const routerTenis = Router();

const daoJugadoresTenis = new daoTenistas();
const tenistas = await daoJugadoresTenis.listarTenistas();
const canchas = await canchasTenisFB.listarCanchaTenis();


routerTenis.get('/tenistas', (req, res) =>{
    
    res.render('tenistas',{tenistas});
})

routerTenis.get('/canchas', (req, res) =>{

  
        res.render('canchas',{canchas});
 
})

routerTenis.post('/canchas', (req,res) =>{
    const mail = (req.cookies.mailUsuario);
    const nombreCancha = req.body.nombreCancha;
    const horasReserva = req.body.horasReserva;
    const text = ("se reservo correctamente " + nombreCancha + " " + horasReserva + "horas")
    enviarMail("Reserva realizada para " + text,text, mail)
    res.send("reservada")
})

routerTenis.get('/chat', (req, res) =>{

    //logger.error('Error, ver consola en ' + req.url)

    res.render('chat',{
       
    });
})

export default routerTenis


