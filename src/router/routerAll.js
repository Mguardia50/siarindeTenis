import express  from "express";
import session from "express-session";
import passport from "passport"; 
import {fileURLToPath} from 'url';
import path from 'path';
import bodyParser from "body-parser"
import sesion from "../config/session.js";
import logger from "../config/logger.js";
import {authMW, authAdmin} from "../middleware/passport.js";

import cookieParser from "cookie-parser";
import routerTenis from "./appTenis.js";
import routerLogin from "./appLogin.js";
import routerRegister from "./appRegister.js";
import routerMisc from "./appMisc.js";
import routerApi from "./appApi.js";

const {Router} = express;
const routerAll = Router()


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const {pathname: root} = new URL (".", import.meta.url)


routerAll.use(express.urlencoded({extended: true}));
routerAll.use(express.json());
routerAll.use(bodyParser.urlencoded({extended: false})); //esto es lo que me permite acceder a los metodos post
routerAll.use(passport.initialize());
routerAll.use(session(sesion))
routerAll.use(passport.session());


routerAll.use(cookieParser("mecomielbudinyculpealperro")) //segun la documentacion habia que poner un secreto 

routerAll.use("/admin", authAdmin, routerApi)
routerAll.use('/deporte/tenis', authMW, routerTenis);
routerAll.use("/register", routerRegister)
routerAll.use("/", routerLogin)
routerAll.use("/", routerMisc)


routerAll.get("/", authMW, (req, res) =>{
    
    res.sendFile('index.html',{'root': __dirname + "../../../public/"})
})


routerAll.all('*', (req, res)=>{
    
    logger.warn(`Failed request: ${req.method} at ${req.url}`)
    res.send({error: true}).status(500);
}) 


export default routerAll