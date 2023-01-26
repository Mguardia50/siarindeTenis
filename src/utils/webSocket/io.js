import { createRequire } from "module";
import daoChat from "../../services/daos/daosMensajes.js";
import express from "express";
import { fileURLToPath } from "url";
import path from "path";

const app = express();

const require = createRequire(import.meta.url);

const http = require ('http');
const { urlencoded } = require("express");
const server = http.createServer(app);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const allData = await daoChat.listarMensajes()
const io = require("socket.io")(server);

let Mensajes= []

io.on('connection',  socket =>{     
    socket.on('new_msg', (data)=>{
    daoChat.agregarMensaje(data)      
            io.sockets.emit('listaMensajes', data, allData)
            //io.sockets.disconnect()         
    })
}) 

export default io