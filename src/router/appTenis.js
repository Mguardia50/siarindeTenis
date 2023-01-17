import express  from "express";
import daoTenistas from "../daos/daosTenis.js";
import canchasTenisFB from "../daos/daosCanchaTenis.js";
import cookieParser from "cookie-parser";
import enviarMail from "../utils/mail/nodemailer.js";

const {Router} = express;

const router = Router();

const daoJugadoresTenis = new daoTenistas();
const tenistas = await daoJugadoresTenis.listarTenistas();
const canchas = await canchasTenisFB.listarCanchaTenis();


router.get('/tenistas', (req, res) =>{
    
    res.render('tenistas',{tenistas});
})

router.get('/canchas', (req, res) =>{

  
        res.render('canchas',{canchas});
 
})

router.post('/canchas', (req,res) =>{
    const mail = (req.cookies.mailUsuario);
    const nombreCancha = req.body.nombreCancha;
    const horasReserva = req.body.horasReserva;
    const text = ("se reservo correctamente " + nombreCancha + " " + horasReserva + "horas")
    enviarMail("Reserva realizada para " + text,text, mail)
    res.send("reservada")
})

router.get('/chat', (req, res) =>{

    //logger.error('Error, ver consola en ' + req.url)

    res.render('chat',{
       
    });
})

export default router