import { Strategy as localStrategy } from "passport-local";
import bcrypt from "bcrypt"
import passport from "passport";
import express  from "express";
import bodyParser from "body-parser"
import session from "express-session";
import sesion from "../session.js";
import {fileURLToPath} from 'url';
import path from 'path';
import enviarMail from "../utils/mail/nodemailer.js"
import usuariosDao from "../daos/daosUsuario.js";


const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false})); //esto es lo que me permite acceder a los metodos post
app.use(passport.initialize());
app.use(session(sesion))
app.use(passport.session());


/*  const authMW = (req, res, next) => {
    req.isAuthenticated() ? next() : res.sendFile('login.html',{'root': __dirname + "../../../public/"})

}  */

const authMW = async (req, res, next) => {
    
    if (req.isAuthenticated()){
        const isVerified = req.user.verificado

        if ((isVerified == false)){
            res.sendFile('verificar.html',{'root': __dirname + "../../../public/"})
        } else{
            next();
        }
    } else {
        res.sendFile('login.html',{'root': __dirname + "../../../public/"})
    } 

} 
let b = 2


//register
passport.use('register', new localStrategy({
    passReqToCallback: true
    
    }, async (req, UserMail, password, done)=>{
        
    
        const user2 = await usuariosDao.buscarUser(UserMail)  
    
        if (user2) return done ('usuario ya registrado') 
    
        const hash = bcrypt.hashSync(password, 10)
        
        const random = Math.floor(Math.random() * (600000-1) + 1)
        const texto = "su codigo de verificacion es " + random;
        enviarMail("Codigo de verificacion Siarinde", texto, UserMail)
        /* ACA PODRIA ENVIAR UN WHATSAPP DE LO QUE SE ME CANTE; NO LO HICE, NO ME GUSTA POR SEGURIDAD, tendria que hacer lo siguiente:
        arriba: import enviarWhatsapp from "./src/whatsapp.js"
        luego aqui: enviarWhatsapp(telefono)
        No lo quiero hacer por cuestiones de seguridad
        */
        await usuariosDao.agregarUsuario({UserMail: UserMail, password: hash, clave: random, verificado: false});
       
        const userObj = {UserMail, password}
        return done(null, userObj) 
        
        
    }))

       
    //login
    
    passport.use('login', new localStrategy({
        passReqToCallback: true
        
        }, async (req, UserMail, password, done)=>{
            
            const user2 = await usuariosDao.buscarPass(UserMail)  

            if ( user2){

            const compare = await  bcrypt.compare(password, user2.password);
                        
            if(user2== "error") return done("Usuario inexistente")
            if (compare == false) return done("password incorrecto")
            //if ((user2.verificado == false)) return done("Usuario no verificado")
           
            return done (null, user2)
            } else {
                return done ("no existe tal usuario")
            }
               
        }))
    


    passport.serializeUser((user, done)=>{
        done (null, user)
    })
    
    passport.deserializeUser((user, done) =>{
    
        done (null, user)
    
    })


export default authMW;

