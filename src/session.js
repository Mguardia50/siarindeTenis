import MongoStore from "connect-mongo";
import Config from "./config/config.js";

const sesion = {
    secret: "A1s2D3f4qWeRtY",

    cookie: {maxAge: 10000 * 60},
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: Config.mongoDB.dbPath,
    })
}

export default sesion