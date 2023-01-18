//import normalizar from "../../src/normalizador";



        const socket = io.connect();
        let i = 0;

        function render(data, allData) {
            
            //document.getElementById("mensajes").innerHTML = "";
            /* const html = data
                    .map(
                        (msg) => `
                    <div class="contenedor_msg">
                    
                    <p class="autor_msg">${msg.autor}</p>
                    <p>${msg.msj}</p>
                    </div>
                `
                    )
            .join(" ");  */
            if (i==0){
                allData.forEach(element => {
                //document.getElementById("mensajes").innerHTML += allData.autor;
                document.getElementById("mensajes").innerHTML += `<p class="autor_msg" style="bolder">${(element.autor.nombreTenista)} ${element.autor.apellidoTenista}: ${element.mensaje}</p>`;
            });
            i=1 //SI ACTUALIZAMOS LA PAG NO FUNCIONA BIEN, TENDRIA QUE CARGAR TODO DE NUEVO CON UN MIDLEWORK
        }
            
            //document.getElementById("mensajes").innerHTML += (allData);
            
            document.getElementById("mensajes").innerHTML += `<p class="autor_msg" style="bolder">${data.autor.nombreTenista} ${data.autor.apellidoTenista}: ${data.mensaje}</p>`;
        }
        
        
        function enviarMensaje(event) {
            
            const nombre = document.getElementById("nombre").value;
            const apellido = document.getElementById("apellido").value;
            const categoria = document.getElementById("categoria").value;
            const msj = document.getElementById("chat_mensaje").value;
            const mail = document.getElementById("mail").value;
            

            let verificador1 = mail.includes("@");
            let verificador2 = mail.includes(".");
            let verificador = verificador1 && verificador2;
            document.getElementById("chat_mensaje").value = "";
            //verificador==(false) ? alert("ingrese un mail valido....Y DECÍ QUE NO TE HAGO REGISTRARTE con todo el coso de usar el mail, 2factores y la uña del papa") : socket.emit("new_msg", { autor: nombre, msj: msj });
            
            
            
            socket.emit("new_msg", { 
                
                mailTenista: mail,
                autor: { 
                    nombreTenista: nombre,
                    apellidoTenista: apellido,
                    categoriaTenis: categoria }, 
                mensaje: msj
            });
            return false; 
        }

        function eliminarMensajes(event) {

            
            /* socket.emit("eliminarTodo");
            return false; */
        }

            /* let formChat = document.getElementById("formChatTenis");
            formChat.addEventListener("submit", enviarMensaje(this)); */

            let botonEliminar = document.getElementById("btnEliminar");
            botonEliminar.addEventListener("click", eliminarMensajes());


        socket.on("listaMensajes", (data, allData) => {

            render(data, allData);
        });