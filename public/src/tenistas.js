import daoTenistas from "../../daos/daosTenis";

const daoTenix = new daoTenistas();
const tenista = await daoTenix.listarTenistas();

 tenista.forEach((element) => {
    console.log(element)
})