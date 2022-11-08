import  express  from 'express';
//import urlencoded from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import { createRequire } from "module";
//import http from "http"
//import { Server } from 'socket.io';
const require = createRequire(import.meta.url);

const app = express();
const http = require ('http');
const { urlencoded } = require("express");

const server = http.createServer(app);
const io = require("socket.io")(server);



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let Mensajes= []
//function aplicacion() {


//const server = http.createServer(app);
//const io = new Server(server);

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

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



/*     io.on('connection', socket =>{
        //console.log("este es el idsoquete: " + socket.id);
    
    

        socket.on('new_msg', (data)=>{
            console.log("esto es data " + JSON.stringify(data));
  
                
                console.log(data)
                Mensaje.push({socketid: socket.id, mensaje: data})
                //io.sockets.emit('listaMensaje', data)
                io.sockets.emit('listaMensajes', Mensajes);
                io.sockets.disconnect() 

            
        })

    }) */



    server.listen(8080, ()=>{
        console.log("iniciando...")
    })
//}

//export default aplicacion;
