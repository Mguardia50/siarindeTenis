import ContenedorCanchaTenis from "../containers/contenedorFirebase.js"

class daoCanchasTenis extends ContenedorCanchaTenis {

    constructor(){
        super('canchasTenis');
    }

    async buscarCancha(idCancha){
        const listar = await this.col.doc(idCancha).get()
        listar == "" ? console.log("cancha no encontrada") : console.log(JSON.stringify(listar.data()))
    }
}

/*  let canchasTenisFB = new daoCanchasTenis();

export default canchasTenisFB; */

export default daoCanchasTenis;