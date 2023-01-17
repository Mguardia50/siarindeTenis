//npm i twilio
import twilio from "twilio";
import * as dotenv from "dotenv"
dotenv.config();

//esto se saca de twilio.com 2615530696
const accountSID = '';
const authToken= '';

const client = twilio(accountSID, authToken);

function enviarWhatsapp(numero){


try {
    client.messages.create({

        body: "Esto es un SMS",
        from: 'whatsapp:+541231231', //sin whatsapp envia msj de texto
        to: 'whatsapp:' + numero,
        mediaUrl: ['https://aquilaurl']
    
    })
} catch(e){
    console.log(e)
}


}

//export default enviarWhatsapp;
