import  express  from 'express';
//import urlencoded from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import { createRequire } from "module";
import daoChatTenis from './daos/daosMensajes.js';


//import normalizar from './src/normalizador.js';

//import http from "http"
//import { Server } from 'socket.io';
const require = createRequire(import.meta.url);

const fs = require('fs');


    const fsPromise = fs.promises;



const app = express();
const http = require ('http');
const { urlencoded } = require("express");

const server = http.createServer(app);
const io = require("socket.io")(server);



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let Mensajes= []

    const daoChat = new daoChatTenis()

//function aplicacion() {


app.use(express.urlencoded({extended: true}));
app.use(express.json());


//app.use(express.static(__dirname + "/public"));



app.set('views', './views');
app.set('view engine', 'ejs');



app.get('/tenis/tenistas', (req, res) =>{
    
    res.render('tenistas',{
       
    });
})

app.get('/tenis/canchas', (req, res) =>{
    
    res.render('canchas',{
       
    });
})

app.get('/tenis/chat', (req, res) =>{
    
    res.render('chat',{
       
    });
})


    const allData = await daoChat.listarMensajes()
    
    /* allData.forEach(element => {
        console.log(element.autor)
    }); */
    //console.log(allData)


    io.on('connection',  socket =>{
        //console.log("este es el idsoquete: " + socket.id);
    
    

        socket.on('new_msg', (data)=>{

            //console.log("esto es data " + JSON.stringify(data));
  
            //aca es porque se va a agregar el msj a un array dentro de la DB cuando el mail existe
           /* daoChat.modificarMensaje(data.mail, data.mensaje) ||*/  daoChat.agregarMensaje(data)

           
           
                io.sockets.emit('listaMensajes', data, allData)
                //io.sockets.disconnect() 

            
        })

    }) 



    server.listen(8080, ()=>{
        console.log("iniciando...")
    })
//}

//export default aplicacion;
