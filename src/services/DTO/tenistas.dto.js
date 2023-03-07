class TenistasDTO {
    constructor({nombreTenista, apellidoTenista, sexo, usuario, mailTenista, telefonoTenista,categoria,posicion}){
        this.nombreTenista = nombreTenista;
        this.apellidoTenista = apellidoTenista;
        this.sexo = sexo;
        this.usuario = usuario;
        this.mailTenista = mailTenista;
        this.telefonoTenista = telefonoTenista;
        this.categoria = categoria;
        this.posicion = posicion;
    }
}


export default TenistasDTO;