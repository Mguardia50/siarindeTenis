import daoChat from "./src/services/daos/daosMensajes.js"
import chatTenisPersonal from "./src/services/daos/daosMensajesPersonales.js";
import { createRequire } from "module";
import app from "./app.js"

const require = createRequire(import.meta.url);
const fs = require('fs');
const fsPromise = fs.promises;

const http = require ('http');
const server = http.createServer(app);
const io = require("socket.io")(server);

await io.on('connection', async  socket =>{     
    await socket.on('new_msg', (data)=>{
        daoChat.agregarMensaje(data, data.mailDe, data.mailPara)      
        io.sockets.emit('listaMensajes', data)
        
    })

}) 

await io.on('connection', async socket =>{     

    await socket.on('eliminarTodo', ()=>{
        daoChat.eliminarMensajes();    
        io.sockets.emit('deleteMensajes')
               
        })
}) 

await io.on('connection', async sockete =>{     
    await sockete.on('new_msg_personal', (data)=>{
        chatTenisPersonal.agregarMensaje(data)
        io.sockets.emit('listaMensajesPersonales', data)
        
    })

}) 

export default server