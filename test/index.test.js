import { expect } from "chai"
import request from "supertest"
import app from "../app.js"

describe("test siarindeTenis", () =>{
    
    it("should list all tennis players", ()=> {
        request(app)
        .get("/admin/tenistas/api")
        .expect(200)
        .end((err, res)=>{
            if (err) throw err
        })

    })
    
    it("should post tenis player", ()=> {
        request(app)
        .post("/admin/tenistas/api")
        .expect(200)
        .end((err, res)=>{
            if (err) throw err
        })

    }) 

    it("should delete tenis player", ()=> {
        request(app)
        .delete("/admin/tenistas/api")
        .expect(200)
        .end((err, res)=>{
            if (err) throw err
        })

    }) 
    it("should modify tenis player", ()=> {
        request(app)
        .put("/admin/tenistas/api")
        .expect(200)
        .end((err, res)=>{
            if (err) throw err
        })

    }) 


})