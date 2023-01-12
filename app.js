import express  from "express";
import session from "express-session";
import passport from "passport"; 
import {fileURLToPath} from 'url';
import path from 'path';
import bodyParser from "body-parser"
import sesion from "./src/session.js";
import sysData from "./src/data.js";
import logger from "./src/logger.js";
import { createRequire } from "module";
import daoChatTenis from './daos/daosMensajes.js';
import router from "./appTenis.js"
import authMW from "./passport.js";
import usuariosDao from "./daos/daosUsuario.js";
import cluster from "cluster"
import {cpus} from "os"



const app = express();

//Para poder usar require
const require = createRequire(import.meta.url);
const fs = require('fs');
const fsPromise = fs.promises;

const http = require ('http');
const { urlencoded } = require("express");
const server = http.createServer(app);
const io = require("socket.io")(server);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


let Mensajes= []

    
    const daoChat = new daoChatTenis()
   

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false})); //esto es lo que me permite acceder a los metodos post
app.use(passport.initialize());
app.use(session(sesion))
app.use(passport.session());



    const allData = await daoChat.listarMensajes()
    io.on('connection',  socket =>{     
        socket.on('new_msg', (data)=>{
            //aca es porque se va a agregar el msj a un array dentro de la DB cuando el mail existe
           /* daoChat.modificarMensaje(data.mail, data.mensaje) ||*/  daoChat.agregarMensaje(data)      
                io.sockets.emit('listaMensajes', data, allData)
                //io.sockets.disconnect()         
        })
    }) 


app.set('views', './views');
app.set('view engine', 'ejs');
app.use('/tenis', authMW, router);


const {pathname: root} = new URL (".", import.meta.url)

//datos

app.get("/", authMW, (req, res) =>{
    res.sendFile(__dirname + "/public/index.html")
})


//post

app.post("/register", passport.authenticate('register'), (req, res)=>{

    res.redirect("/register/clave")
})

app.post("/register/clave", (req, res)=>{

    
    
    res.redirect("/")
})

app.post("/login", passport.authenticate('login'), (req, res)=>{

    res.redirect("/")
})


//logout

app.get("/register", (req, res) =>{
    res.sendFile(__dirname + "/public/register.html")
})

 app.get("/register/clave", async (req, res) =>{

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
            res.sendFile(__dirname + "/public/clave.html")
        }else{
            res.sendFile(__dirname + "/public/claveMal.html")
        }
       
        
    }
}) 

app.get("/login", (req, res) =>{
    res.sendFile(__dirname + "/public/login.html")
})

app.get("/logout", function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });

app.get("/info", (req, res) =>{
    
    res.send(sysData)
    })

 

app.use(express.static(__dirname + "/public"));




 app.all('*', (req, res)=>{
    logger.warn(`Failed request: ${req.method} at ${req.url}`)
    res.send({error: true}).status(500);
}) 

const cpu = cpus();
const port = process.env.PORT || 8080;
if (cluster.isPrimary){
    console.log("primario: " + process.pid)

    for (let i = 0; i<cpu.length; i++){
        cluster.fork()
    }

    

    cluster.on("exit", (worker, code, signil) =>{
        console.log("saliendo de " + worker.process.pid)
    })
} else{

    console.log(port)
    server.listen(port, ()=>{
        logger.info("iniciando en puerto " + port)
    })

    console.log(process.pid + "ah empezao")
    }

//no es process.env.port?

