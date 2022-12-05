import { Strategy as localStrategy } from "passport-local";
import bcrypt from "bcrypt"
import passport from "passport";
import daoUsuarios from "./daos/daosUsuario.js";
import express  from "express";
import bodyParser from "body-parser"
import session from "express-session";
import sesion from "./src/session.js";

const usuariosDao = new daoUsuarios();

const app = express()
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({extended: false})); //esto es lo que me permite acceder a los metodos post
app.use(passport.initialize());

app.use(session(sesion))
app.use(passport.session());
app.use(express.json());

const authMW = (req, res, next) => {
    req.isAuthenticated() ? next() : res.sendFile(__dirname + "/public/login.html")

}

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

