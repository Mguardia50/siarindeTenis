//npm i axios
import https from "https";

//***************GET */


const config = {
    hostname: 'dummyjson.com', //la url
    port: 443,
    path: '/products/1', //la ruta
    method: "GET"
}


const req = https.request(config, (res)=>{

    res.on('data', data =>{
        console.log(data)
    } )
    res.on('error', err => console.log(err))
    req.on("error", err => console.log(err))
    req.end()
}) //aca son las llamadas


//**********************POST */

const configPOST = {
    hostname: 'dummyjson.com', //la url
    port: 443,
    path: '/products/1', //la ruta
    method: "POST",
    headers:{
        'Content-Type': 'application/json'
    }
}
const data = {nombre: "tuvieja", esta: "en tanga"}

const post = https.request(configPOST, (res) =>{
    res.on('data', data =>{
        console.log(data)
    } )
    res.on('error', err => console.log(err))
})

post.write(JSON.stringify(data))
post.end()