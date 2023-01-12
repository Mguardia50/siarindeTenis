import express  from "express";
import daoTenistas from "./daos/daosTenis.js";

const {Router} = express;

const router = Router();

const daoJugadoresTenis = new daoTenistas();
const tenistas = await daoJugadoresTenis.listarTenistas();


router.get('/tenistas', (req, res) =>{
    
    res.render('tenistas',{tenistas});
})

router.get('/canchas', (req, res) =>{

    //logger.error('Error, ver consola en ' + req.url)

        res.render('canchas',{
       
        });
 
})

router.get('/chat', (req, res) =>{

    //logger.error('Error, ver consola en ' + req.url)

    res.render('chat',{
       
    });
})

export default router