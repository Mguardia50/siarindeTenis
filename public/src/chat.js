//import normalizar from "../../src/normalizador";



        const socket = io.connect( {transports: ['websocket']});
        let i = 0;

        function render(data) {
    
           
            document.getElementById("mensajes").innerHTML += `<p class="autor_msg" style="bolder">${data.autor.nombreTenista} ${data.autor.apellidoTenista}: ${data.mensaje}</p>`;
        }

        function eliminar() {
                document.getElementById("mensajes").innerHTML = ""
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
                timeStamp: Date(),
                mensaje: msj
            });
            return false; //esto seria el prevent default
        }


        function eliminarMensajes(event) {

            
            socket.emit("eliminarTodo");
            return false;
        }

            /* let formChat = document.getElementById("formChatTenis");
            formChat.addEventListener("submit", enviarMensaje(this)); */

            /* let botonEliminar = document.getElementById("btnEliminar");
            botonEliminar.addEventListener("click", eliminarMensajes()); */


        socket.on("listaMensajes", (data) => {

            render(data);
        });

        socket.on("deleteMensajes", () => {

            eliminar();
        });