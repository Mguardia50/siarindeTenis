import ContenedorMongoTenis from "../containers/contenedorMongo.js";


class daoTenistas extends ContenedorMongoTenis {

    constructor(){
        super("usuariosTenis", {
            nombreTenista: String,
            apellidoTenista: String,
            sexo: String,
            usuario: {type: String, unique: true},
            mailTenista: String,
            telefonoTenista: Number,
            categoria: String,
            posicion: Number   
        })
    }

    async listarTenistas(dni){
        try{

        let tenistas = await this.col.find({dniTenista: dni})
        let todos = await this.col.find({})
        let todosLosTenistas = []

        if (dni == null){
            todos.forEach(element=>{
                todosLosTenistas.push(element)
                //console.log(element)
            })
            return todosLosTenistas
            
        } else{
                tenistas == "" ? console.log("no existe tenista con ese DNI") : console.log("encontrado")
        }
            /* dni == null ? console.log(todos) : (
            tenistas == "" ? console.log("no existe tenista con ese DNI") : console.log(tenistas) 
            )  */
     
    }catch(e){
        throw new Error(e)
    }

        
    }

    async agregarTenista(tenista){
        try{
            await this.col.create(tenista)
          
        } catch(e){
            throw new Error(e);
        }
        
    }

    async eliminarTenista(user){
        if (user) {
            await this.col.deleteOne({usuario: user})
            console.log("eliminado: " + user)
        } else {
            console.log("dni inválido")
        }
        

    }

    async modificarTenista(user, remplazo){
        await this.col.updateOne({usuario: user}, remplazo);
     
    }

}



export default daoTenistas;

