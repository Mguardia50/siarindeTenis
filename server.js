import { createRequire } from "module";
import {cpus} from "os"
import cluster from "cluster"
import server from "./io.js";

/* const require = createRequire(import.meta.url);
const fs = require('fs');
const fsPromise = fs.promises;

const http = require ('http');
const server = http.createServer(app);
const io = require("socket.io")(server); */




    
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
        // logger.info("iniciando en puerto " + port)
    })

    console.log(process.pid + "ah empezao")
    } 