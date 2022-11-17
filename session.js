import MongoStore from "connect-mongo";
import session from "express-session";
import express  from "express";
import Config from "./config.js";
import {fileURLToPath} from 'url';
import path from 'path';
import bodyParser from "body-parser"



const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const {pathname: root} = new URL (".", import.meta.url)


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({extended: false})); //esto es lo que me permite acceder a los metodos post

app.use(session({
   
        secret: "A1s2D3f4qWeRtY",

        cookie: {maxAge: 1000 * 60},
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: Config.mongoDB.dbPath,
        })
}))

    const auth = (req, res, next) =>{
        req.session.idAdmin == true ? next() : res.status(401).send("error de autentificacion")
    }

    //INICIO
    app.get("/", (req, res) =>{

        if (req.session.usuario) {
            res.sendFile(__dirname + "/public/index.html")
        } else {
            res.sendFile(__dirname + "/public/login.html")

        }
    })

    //REGISTRO
    app.post("/", (req, res)=>{
        const {username} = req.body;
        req.session.usuario = username;
        res.redirect("/")
    })

    //LOGOUT

    app.get("/logout", (req, res) =>{

        req.session.destroy(err =>{
            res.redirect("/")
        })
    })
    


    app.listen(8080, ()=>{
        console.log("iniciando...")
    })


