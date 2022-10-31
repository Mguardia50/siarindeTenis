import daoTenistas from "./daos/daosTenis.js";
import daoCanchasTenis from "./daos/daosCanchaTenis.js";
import aplicacion from "./app.js"

//aplicacion();



(async()=>{

    
    

    const tenistaMongo = new daoTenistas();
    const canchaFirebase = new daoCanchasTenis();

    //await tenistaMongo.agregarTenista(tenista);
    //let tenistas = await tenistaMongo.listarTenistas(); //FUNCIONA
    
    //await tenisMongo.listarTenistas(3474851); //FUNCIONA
    //let canchas = await canchaFirebase.listarCanchaTenis(); //FUNCIONA
    
    /* let remplazo = {posicion: 5};
    await tenistaMongo.modificarTenista(34748519, remplazo)*/ //FUNCIONA
    
    /* const tenista = {nombreTenista: "Mariano", apellidoTenista: "Guardia", dniTenista:34748519, categoria: "1ra seleccion", posicion: 8};
    await tenisMongo.agregarTenista(tenista); */ //FUNCIONA

    //await tenistaMongo.eliminarTenista(34748519) //FUNCIONA
})();