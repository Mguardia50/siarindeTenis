import ContenedorCanchaTenis from "../containers/contenedorFirebase.js"

class daoReservaCanchasTenis extends ContenedorCanchaTenis {

    constructor(){
        super('reservasTenis');
    }

    async agregarReserva(reserva){
        try{
            await this.col.add(reserva)
            console.log("agregada " + JSON.stringify(reserva))
        } catch(e){
            console.log(e)
        }
        
    }
}

const reservaCanchasTenisFB = new daoReservaCanchasTenis();

export default reservaCanchasTenisFB;