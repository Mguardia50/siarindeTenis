class mensajesDTO {
    constructor({nombre, apellido, categoria}){
        this.nombreTenista = nombre;
        this.apellidoTenista = apellido;
        this.categoriaTenis= categoria;
    }
}


export default mensajesDTO;

//NOTA: este no me sirve, porque donde debería ser utilizado con recursos que obtengo del DOM y no mediante
//una llamada al servidor, esto no se puede aplicar correctamente