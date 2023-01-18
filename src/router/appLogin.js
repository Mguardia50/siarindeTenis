import express  from "express";
import {fileURLToPath} from 'url';
import path from 'path';
import passport from "passport"; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const {Router} = express;

const routerLogin = Router()

routerLogin.get("/login", (req, res) =>{
    res.sendFile('login.html',{'root': __dirname + "../../../public/"})
})

routerLogin.get("/logout", function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });

  routerLogin.post("/login", passport.authenticate('login'), (req, res)=>{
    res.cookie("mailUsuario", req.body.username)
    res.redirect("/")
})

export default routerLogin;