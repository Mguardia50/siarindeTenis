import express  from "express";
import {fileURLToPath} from 'url';
import path from 'path';
import usuariosDao from "../services/daos/daosUsuario.js";
import passport from "passport"; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const {Router} = express;

const routerRegister = Router()

routerRegister.get("/", (req, res) =>{
    res.sendFile('register.html',{'root': __dirname + "../../../public/"})
})

routerRegister.get("/clave", async (req, res) =>{

    const {clave} = req.query 
    const {emailConfirm} = req.query 
   
    const user = await usuariosDao.buscarUser(emailConfirm) || {usuario: null, clave: "undefined"};
    console.log(user.clave)
    if (clave == user.clave){
        usuariosDao.modificarUsuario(user.usuario, {verificado: true})
        console.log("verificado con exito")
        res.redirect("/login")
    }else{
        if (user.clave=="undefined"){
            res.sendFile('clave.html',{'root': __dirname + "../../../public/"})
        }else{
            res.sendFile('claveMal.html',{'root': __dirname + "../../../public/"})
        }
       
        
    }
}) 

routerRegister.post("/", passport.authenticate('register'), (req, res)=>{

    res.redirect("/register/clave")
})

routerRegister.post("/clave", (req, res)=>{

    res.redirect("/")
})

export default routerRegister;