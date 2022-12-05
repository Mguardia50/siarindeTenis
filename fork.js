import express  from "express";
import bodyParser from "body-parser"

const app = express()
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({extended: false}));

let numeros = [];
let final = [];


function verRandoms (laQuery){


for (let i = 0; i < laQuery; i++){
    let random = Math.floor(Math.random() * 1000)
    numeros.push(random);
}

let contador = 1;
function comparar(a,b) {return (a - b)}
const arreglado = numeros.sort(comparar)

for ( let x = 0; x < arreglado.length; x++){

    
    if (arreglado[x] == arreglado [x + 1]){
        contador = contador + 1;
    } else {
        if (contador  ==1 ) {
            final.push(arreglado[x] + " aparece " + contador + " vez")
        }
        else{ 
           final.push(arreglado[x] + " aparece " + contador + " veces")
        }
        contador = 1;
    }
    
}

}

process.on("message", msg => {
    
    console.log('MSJ Padre ', msg)

    const cantidad = parseInt(msg.cant)
    console.log( cantidad)

   
    verRandoms(cantidad)
    
    console.log(final)
    
    process.send(final)    

   
    numeros = []
    final = []

    //process.exit()
})


