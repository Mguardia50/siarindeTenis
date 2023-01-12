// se usa nodemailer(.com), ethereal.email
import { createTransport } from 'nodemailer';

async function enviarMail(subject, text, email){


const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'katheryn.doyle@ethereal.email',
        pass: 'sChU9T6Eu5rUKecpQn'
    }
});

const opts = {
    from: 'katheryn.doyle@ethereal.email',
    to: email,
    subject: subject,
    text: text
}

try{
    let info = await transporter.sendMail(opts)

    console.log(info)
} catch(e){
    console.log(e)
}
}




export default enviarMail;