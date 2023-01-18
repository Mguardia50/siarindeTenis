import express  from "express";
import {fileURLToPath} from 'url';
import path from 'path';
import sysData from "../config/data.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const {Router} = express;

const routerMisc = Router()

routerMisc.get("/info", (req, res) =>{
    
    res.send(sysData)
    })

/* app.get("/cualcax", (req, res) =>{
    let grilla = 8
    res.render('grilla',{ grilla

    });
}) */


export default routerMisc;