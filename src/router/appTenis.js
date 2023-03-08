import express  from "express";
//import daoJugadoresTenis from "../services/daos/daosTenis.js";
/* import canchasTenisFB from "../services/daos/daosCanchaTenis.js"; */
import cookieParser from "cookie-parser";
import enviarMail from "../utils/mail/nodemailer.js";
import reservaCanchasTenisFB from "../services/daos/doasReservas.js";
/* import daoFactory from "../services/factory/DAOFactoryLu.js"; */
import CanchastenisRepository from "../services/repositories/canchasTenis.repo.js";
import tenistasRepository from "../services/repositories/tenistas.repo.js";
import ChatTenisPersonal from "../services/daos/daosMensajesPersonales.js";
import sesion from "../config/session.js";
import daoChat from "../services/daos/daosMensajes.js";

const {Router} = express;

const routerTenis = Router();

//const tenistas = await daoJugadoresTenis.listarTenistas();
/* const canchas = await canchasTenisFB.listarCanchaTenis(); */
/* const canchas = await daoFactory.getCanchasTenisDao(); */



routerTenis.get('/single', async (req, res) =>{
    
    const repoTenistas = new tenistasRepository();
    const tenistas = await repoTenistas.listarTenistas();
     res.render('tenistas',{tenistas}); 

})

routerTenis.get('/tenistas/api', async (req, res) =>{
    const repoTenistas = new tenistasRepository();
    const tenistas = await repoTenistas.listarTenistas();
    res.send(tenistas)
})

routerTenis.get('/canchas', async (req, res) =>{
    const isAdmin = (req.user.isAdmin)
    const repoCanchas = new CanchastenisRepository();
    const canchas = await repoCanchas.listarCanchaTenis()
    //res.send(JSON.stringify(canchas)) 
    res.render('canchas',{canchas, isAdmin});
 
})

routerTenis.post('/canchas', async (req,res) =>{

    const repoCanchas = new CanchastenisRepository();
    const canchas = await repoCanchas.listarCanchaTenis()
    const mail = (req.cookies.mailUsuario);
    let fecha = new Date()
    const nombreCancha = req.body.nombreCancha;
    const horasReserva = req.body.horasReserva;
    
    reservaCanchasTenisFB.agregarReserva({nombre: nombreCancha, duracion: horasReserva, fecha: Date()});

    const text = ("se reservo correctamente " + nombreCancha + " " + horasReserva + "horas")
    //enviarMail("Reserva realizada para " + text,text, mail)
    res.send("reservada " + text)
})

routerTenis.get('/chat', async (req, res) =>{
    const listarMsg = await daoChat.listarMensajes()
    //logger.error('Error, ver consola en ' + req.url)
    const usuario = req.user.UserMail
   
    res.render('chat',{ usuario, listarMsg
       
    });
})

routerTenis.get('/chatPersonal', async (req, res) =>{
    try {
        const remitente = req.user.UserMail;
        const destinatario = req.query.destinatario;
        const listaMensajesPersonales = await ChatTenisPersonal.listarMensajes(remitente, destinatario)
        res.render('chat_personal',{ remitente, destinatario, listaMensajesPersonales
           
        });
    } catch (e) {
        console.log(e)
    }
   
})

export default routerTenis


