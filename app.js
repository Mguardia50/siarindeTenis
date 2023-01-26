import express  from "express";
import {fileURLToPath} from 'url';
import path from 'path';
import { createRequire } from "module";
import routerAll from "./src/router/routerAll.js";
const app = express();

//Para poder usar require
const require = createRequire(import.meta.url);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.use("/", routerAll);


    


export default app