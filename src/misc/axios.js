import axios from "axios";

//axios() es el equivalente a GET

const api = axios.create({
    baseURL: "http://localhost:8080/",
    
})
 //GET
 const data = await api.get('/test/tenistas/api')
 console.log(data.data)

 //POST
 const post = await api.post('/test/tenistas/api', {
    nombreTenista: "test", 
    apellidoTenista: "test", 
    dniTenista:999, 
    categoria: "1ra seleccion", 
    posicion: 8,
}); 
console.log(post.data) 


//DELETE
 const dni = 999
 const borrar = await api.delete(`/test/tenistas/api?dniTenista=${dni}`)
console.log(borrar.data)  
 

//PUT
// const dni = 999
 const modificar = await api.put(`/test/tenistas/api?dniTenista=${dni}`,{
    nombreTenista: "testModify", 
    apellidoTenista: "Guardia", 
    categoria: "1ra seleccion", 
    posicion: 7,
}); 
console.log(modificar.data) 






