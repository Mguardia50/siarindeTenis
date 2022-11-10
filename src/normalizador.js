import {normalize, denormalize, schema} from "normalizr";
import util from "util"
import daoChatTenis from "../daos/daosMensajes.js";


const print = (obj) => console.log(util.inspect(obj, false, 10, true));

const daoChatMensajes = new daoChatTenis();
const chatTenis= await daoChatMensajes.listarMensajes();

const fecha = new Date()
const fechaDia = (`${fecha.getDate()}/${fecha.getMonth() +1}/${fecha.getFullYear()}`)

const chatDia = {
    id: fechaDia, 
    chat: [chatTenis]}

const tenistaSchema = new schema.Entity("tenista");
const mensajeSchema = new schema.Entity("mensaje");
const fechaSchema = new schema.Entity("fecha");

const mensajeria = new schema.Entity("mensajeria", {
    mailTenista: tenistaSchema,
    tenista: tenistaSchema,
    mensaje: [mensajeSchema]
})


const normalizar = normalize(chatDia, mensajeria)
//const denormalizar = denormalize(normalizar, mensayeria, normalizar.entities)

//console.log(chatDia)
print(normalizar)
console.log (normalizar)

export default normalizar