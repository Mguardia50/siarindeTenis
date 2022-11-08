import daoTenistas from "./daos/daosTenis.js";
import daoCanchasTenis from "./daos/daosCanchaTenis.js";
import aplicacion from "./app.js"

aplicacion();



(async()=>{

    
    

    const tenistaMongo = new daoTenistas();
    const canchaFirebase = new daoCanchasTenis();

    //LISTAR---------------------------------
    //await tenistaMongo.listarTenistas(); //FUNCIONA
    //await tenistaMongo.listarTenistas(34748519); //FUNCIONA

    //await canchaFirebase.listarCanchaTenis(); //FUNCIONA
    //await canchaFirebase.buscarCancha("ZsgBasMODAyaL2FBamc6"); //FUNCIONA
    
    //ADD------------------------------------
    /* const tenista = {nombreTenista: "Mariano", apellidoTenista: "Guardia", dniTenista:34748519, categoria: "1ra seleccion", posicion: 8};
    await tenisMongo.agregarTenista(tenista); */ //FUNCIONA

    /* const chacan = {cancha: "la de pepe", condicion: "regular", superficie: "carpeta", ubicacion: "ni idea"}
    await canchaFirebase.agregarCanchaTenis(chacan) */ //FUNCIONA

    //UPDATE-------------------------------------
    /* let remplazo = {posicion: 5};
    await tenistaMongo.modificarTenista(34748519, remplazo)*/ //FUNCIONA
    
    /* let remplazoCancha = {condicion: "mala"}
    await canchaFirebase.modificarCancha("ZsgBasMODAyaL2FBamc6", remplazoCancha) */ //FUNCIONA


    //DELETE--------------------------------------
    //await tenistaMongo.eliminarTenista(34748519) //FUNCIONA
    //await canchaFirebase.eliminarCanchaTenis("prueba1"); //FUNCIONA
})();