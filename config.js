import * as dotenv from "dotenv"
dotenv.config()


const Config = {
    firebase: {
        "type": process.env.TIPO,
        "project_id": process.env.IDPROYECTO,
        "private_key_id": process.env.PRIVATEKEYID,
        "private_key": process.env.PRIVATEKEY,
        "client_email": process.env.CLIENTMAIL,
        "client_id": process.env.CLIENTID,
        "auth_uri": process.env.AUTH,
        "token_uri": process.env.TOKEN,
        "auth_provider_x509_cert_url": process.env.PROVIDER,
        "client_x509_cert_url": process.env.CLIENT
      },

    mongoDB: {
        "dbPath": process.env.MONGODBPATH
    }

}

//console.log(Config.mongoDB.dbPath)
//tSqDueI505FEVgtm
export default Config;