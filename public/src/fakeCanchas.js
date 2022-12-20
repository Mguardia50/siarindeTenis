import {faker} from "https://cdn.skypack.dev/@faker-js/faker";


faker.locale = "es"

    for (let i=0; i<5; i++){
    
    let avatar =  faker.image.avatar(); //ya se...es un avatar, demoraba mucho en cargar lo otro
    let ciudad = faker.address.city(); //Asi es, la cancha va a tener nombre de alguna ciudad
    let direccion = faker.address.streetAddress();
    let contacto = faker.internet.email();
    let telefono = faker.phone.number('+54 11-####-###');
    

    document.getElementById("canchasFake").innerHTML += `
    <h1 style="bolder">CANCHA: ${ciudad}</h1>
    <img src=${avatar}>
    <p>Direccion: ${direccion}</p>
    <p>Mail: ${contacto} Tel:${telefono} </p>
    `;

    }
