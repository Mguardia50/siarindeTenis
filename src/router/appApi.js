import express  from "express";
import tenistasRepository from "../services/repositories/tenistas.repo.js";
import CanchastenisRepository from "../services/repositories/canchasTenis.repo.js";
import daoCanchasTenis from "../services/daos/daosCanchaTenis.js";
import {fileURLToPath} from 'url';
import path from 'path';

const {Router} = express;

const routerApi = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const {pathname: root} = new URL (".", import.meta.url)




routerApi.get("/", (req, res) => {
    res.sendFile('admin.html',{'root': __dirname + "../../../public/"})
})


//GET
routerApi.get('/tenistas/api', async (req, res) =>{
    const daoJugadoresTenis = new tenistasRepository();
    const listarTenistas = await daoJugadoresTenis.listarTenistas();
    res.send(listarTenistas)
})

routerApi.get('/canchas/api', async (req, res) =>{
    const repoCanchas = new CanchastenisRepository();
    const canchas = await repoCanchas.listarCanchaTenis()
    res.send(canchas)
})

//POST
routerApi.post('/tenistas/api', async (req, res) =>{
    const daoJugadoresTenis = new tenistasRepository();
    
    try{
        const tenista = req.body
        await daoJugadoresTenis.agregarTenista(tenista)
        res.send(req.body)
    }catch{
        console.log("error")
    } 
})

routerApi.post('/canchas/api', async (req, res) =>{
    const repoCanchas = new daoCanchasTenis();
    try{
        const cancha = req.body
        await repoCanchas.agregarCanchaTenis(cancha)
        res.send(req.body)
    }catch{
        console.log("error")
    } 
})


//DELETE
routerApi.delete('/tenistas/api', async (req, res) =>{
    const daoJugadoresTenis = new tenistasRepository();

   try{
    const borrartenista = req.query
    console.log(borrartenista)
    await daoJugadoresTenis.eliminarTenista(borrartenista.usuario)
    res.send("eliminado")
}catch{
    console.log("error")
}
})

//En realidad no se puede hacer metodo delete en HTML, hay que remplazar por get o post
//el método delete y put son de HTTP 
routerApi.post('/canchas/api/delete', async (req, res) =>{
    const repoCanchas = new daoCanchasTenis();

   try{
    const borrarCancha = req.body
    console.log(borrarCancha.nombre)
    await repoCanchas.eliminarCanchaTenis(borrarCancha.nombre)
    res.send("eliminado " + borrarCancha)
   }catch{
    console.log("error")
   }
})

//PUT
routerApi.put('/tenistas/api', async (req, res) =>{
    const daoJugadoresTenis = new tenistasRepository();
    
    try{
     const modificartenista = req.query
     const modificacion = req.body
     console.log(modificartenista)
     console.log(modificacion)
     await daoJugadoresTenis.modificarTenista(modificartenista.usario, modificacion)
     res.send("modificao")
 }catch{
     console.log("error")
 }
 })


 //nuevamente: el método put y delete no son compatibles con html sino con https
 routerApi.get('/canchas/api/modify', async (req, res) =>{

    try{
    const repoCanchas = new daoCanchasTenis();
     const modificarCancha = req.query
     let objetoFinal = {}
     let objeto = {}
        for (const propiedad in modificarCancha){
                if (modificarCancha[propiedad] !== ""){
                    objeto = { [propiedad]: modificarCancha[propiedad]}
                    objetoFinal = Object.assign(objetoFinal, objeto)
                }
            }
        repoCanchas.modificarCancha(modificarCancha.nombre, objetoFinal)
     
     res.send("modificado " + JSON.stringify(modificarCancha))
 }catch{
     console.log("error")
 }
 })
 


export default routerApi