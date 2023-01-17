// se usa nodemailer(.com), ethereal.email
import { createTransport } from 'nodemailer';

async function enviarMail(subject, text, email){


const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'markus94@ethereal.email',
        pass: 'AkNc5XjzWM9JCD9RWw'
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