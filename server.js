import express  from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as localStrategy } from "passport-local";
import daoUsuarios from "./daos/daosUsuario.js";
import {fileURLToPath} from 'url';
import path from 'path';
import bodyParser from "body-parser"
import MongoStore from "connect-mongo";
import Config from "./config.js";
import bcrypt from "bcrypt"



const app = express()
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({extended: false})); //esto es lo que me permite acceder a los metodos post
app.use(passport.initialize());


app.use(session({
   
    secret: "A1s2D3f4qWeRtY",

    cookie: {maxAge: 1000 * 60},
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: Config.mongoDB.dbPath,
    })
}))


app.use(passport.session());
app.use(express.json());



const usuariosDao = new daoUsuarios();

//DEBUG
//const prueba = {UserMail: "otromas@coso.com", password: 1234}
//const agregarUser= await usuariosDao.agregarUsuario(prueba);
//const usuarios = await usuariosDao.buscarUsuario("coso@esto.com")
//const user3 = await usuariosDao.buscarUser("coso@esteo.com") 
//console.log("usuarios: " + usuarios) 

/* const hash = bcrypt.hashSync("hols", 10)
const compare = await  bcrypt.compare("hols", hash);
console.log( hash)
console.log(compare) */

const authMW = (req, res, next) => {
    req.isAuthenticated() ? next() : res.sendFile(__dirname + "/public/login.html")

}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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


app.listen(8080, ()=>{
    console.log("iniciando")
})
