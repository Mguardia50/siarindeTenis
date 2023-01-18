import express  from "express";
import session from "express-session";
import passport from "passport"; 
import {fileURLToPath} from 'url';
import path from 'path';
import bodyParser from "body-parser"
import sesion from "./src/config/session.js";
import logger from "./src/utils/logger/logger.js";
import { createRequire } from "module";
import daoChat from "./src/services/daos/daosMensajes.js"
import authMW from "./src/middleware/passport.js";
import cluster from "cluster"
import {cpus} from "os"
import cookieParser from "cookie-parser";
import routerTenis from "./src/router/appTenis.js";
import routerLogin from "./src/router/appLogin.js";
import routerRegister from "./src/router/appRegister.js";
import routerMisc from "./src/router/appMisc.js";

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
const {pathname: root} = new URL (".", import.meta.url)

let Mensajes= []
   

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false})); //esto es lo que me permite acceder a los metodos post
app.use(passport.initialize());
app.use(session(sesion))
app.use(passport.session());

app.use(cookieParser("mecomielbudinyculpealperro")) //segun la documentacion habia que poner un secreto 


    const allData = await daoChat.listarMensajes()
    io.on('connection',  socket =>{     
        socket.on('new_msg', (data)=>{
        daoChat.agregarMensaje(data)      
                io.sockets.emit('listaMensajes', data, allData)
                //io.sockets.disconnect()         
        })
    }) 


app.set('views', './views');
app.set('view engine', 'ejs');
app.use('/tenis', authMW, routerTenis);
app.use("/register", routerRegister)
app.use("/", routerLogin)
app.use("/", routerMisc)


app.get("/", authMW, (req, res) =>{
    res.sendFile(__dirname + "/public/index.html")
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

