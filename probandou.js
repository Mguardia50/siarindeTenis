import express  from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as localStrategy } from "passport-local";
import daoUsuarios from "./daos/daosUsuario.js";
import {fileURLToPath} from 'url';
import path from 'path';
import bodyParser from "body-parser"
import sesion from "./src/session.js";
import bcrypt from "bcrypt"
import { fork } from "child_process";
import sysData from "./src/data.js";
import logger from "./src/logger.js";
import { createRequire } from "module";
import daoChatTenis from './daos/daosMensajes.js';

const app = express();

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

//function aplicacion() {


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false})); //esto es lo que me permite acceder a los metodos post
app.use(passport.initialize());
app.use(session(sesion))
app.use(passport.session());



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


const usuariosDao = new daoUsuarios();

/* //DEBUG
//const prueba = {UserMail: "otromas@coso.com", password: 1234}
//const agregarUser= await usuariosDao.agregarUsuario(prueba);
//const usuarios = await usuariosDao.buscarUsuario("coso@esto.com")
//const user3 = await usuariosDao.buscarUser("coso@esteo.com") 
//console.log("usuarios: " + usuarios) 
const hash = bcrypt.hashSync("hols", 10)
const compare = await  bcrypt.compare("hols", hash);
console.log( hash)
console.log(compare) */



const authMW = (req, res, next) => {
    req.isAuthenticated() ? next() : res.sendFile(__dirname + "/public/login.html")

}


const {pathname: root} = new URL (".", import.meta.url)


//register
passport.use('register', new localStrategy({
passReqToCallback: true

}, async (req, UserMail, password, done)=>{
    
    //console.log(UserMail + password)

    const user2 = await usuariosDao.buscarUser(UserMail)  

    if (user2) return done ('usuario ya registrado') 

    const hash = bcrypt.hashSync(password, 10)
    await usuariosDao.agregarUsuario({UserMail: UserMail, password: hash});

    const userObj = {UserMail, password}
    return done(null, userObj)

}))


//login

passport.use('login', new localStrategy({
    passReqToCallback: true
    
    }, async (req, UserMail, password, done)=>{

        //const user = await usuariosDao.buscarUsuario(UserMail, password)
        
        //const user = usuarios.find(user => user.UserMail== UserMail && user.password == password)
        const user2 = await usuariosDao.buscarUser(UserMail)  
        const compare = await  bcrypt.compare(password, user2.password);
        console.log(user2)
        console.log(compare)

        if(user2== "error") return done("Usuario inexistente")
        if (compare == false) return done("password incorrecto")
        
        //if(user == "") return done("Contraseña inválida")
        return done (null, user2)
        
       
    }))
    
passport.serializeUser((user, done)=>{
    done (null, user)
})

passport.deserializeUser((user, done) =>{

    //const user = usuarios.find(user => user.UserMail == UserMail)
    done (null, user)

})



//datos

app.get("/", authMW, (req, res) =>{
    res.sendFile(__dirname + "/public/index.html")
})


//post

app.post("/register", passport.authenticate('register'), (req, res)=>{

    res.redirect("/login")
})

app.post("/login", passport.authenticate('login'), (req, res)=>{

    res.redirect("/")
})


//logout

app.get("/register", (req, res) =>{
    res.sendFile(__dirname + "/public/register.html")
})

app.get("/login", (req, res) =>{

    res.sendFile(__dirname + "/public/login.html")
})

app.get("/logout", (req, res) =>{
req.logOut();
res.send("sesion cerrada")
})

app.get("/info", (req, res) =>{
    
    res.send(sysData)
    })

const child = fork('fork.js')


app.get("/api/random", (req, res) =>{

    const estaQuery = req.query
    child.send(estaQuery.cant || 10000 )
            


            res.send("ver la consola y que coder deje de joder con herramientas QUE NO PROPORCIONA, ademas, esto es inutil")
            }
        
        )
        

/* app.use((req, res, next)=>{

    logger.info(`Request: ${req.method} at ${req.url}`)
    next();
}) */
app.use(express.static(__dirname + "/public"));



app.set('views', './views');
app.set('view engine', 'ejs');



app.get('/tenis/tenistas', (req, res) =>{
    
    res.render('tenistas',{
       
    });
})

app.get('/tenis/canchas', (req, res) =>{

    logger.error('Error, ver consola en ' + req.url)

        res.render('canchas',{
       
        });
 
})

app.get('/tenis/chat', (req, res) =>{

    logger.error('Error, ver consola en ' + req.url)

    res.render('chat',{
       
    });
})

 app.all('*', (req, res)=>{
    logger.warn(`Failed request: ${req.method} at ${req.url}`)
    res.send({error: true}).status(500);
}) 

//no es process.env.port?
const port = process.env.PORT || 8080;
console.log(port)
server.listen(port, ()=>{
    logger.info("iniciando en puerto " + port)
})
