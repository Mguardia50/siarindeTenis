import express  from "express";
import daoJugadoresTenis from "../services/daos/daosTenis.js";

const {Router} = express;

const routerApi = Router();


const listarTenistas = await daoJugadoresTenis.listarTenistas();


routerApi.get('/tenistas/api', (req, res) =>{
    
    res.send(listarTenistas)
})

routerApi.post('/tenistas/api', async (req, res) =>{

    try{
        const tenista = req.body
        await daoJugadoresTenis.agregarTenista(tenista)
        res.send(req.body)
    }catch{
        console.log("error")
    }
    
})

routerApi.delete('/tenistas/api', async (req, res) =>{
   try{
    const borrartenista = req.query
    console.log(borrartenista)
    await daoJugadoresTenis.eliminarTenista(borrartenista.dniTenista)
    res.send("eliminado")
}catch{
    console.log("error")
}
})

routerApi.put('/tenistas/api', async (req, res) =>{
    try{
     const modificartenista = req.query
     const modificacion = req.body
     console.log(modificartenista)
     console.log(modificacion)
     await daoJugadoresTenis.modificarTenista(modificartenista.dniTenista, modificacion)
     res.send("modificao")
 }catch{
     console.log("error")
 }
 })
 

export default routerApi