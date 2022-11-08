const socket = io.connect();


function render(data) {
  alert("probando")
    const html = data
      .map(
        (msg) => `
    <div class="contenedor_msg">
    
    <p class="autor_msg">PRUEBA</p>
    <p></p>
    </div>
  `
      )
      .join(" "); 
  
    document.getElementById("mensajes").innerHTML = html;
  }
  
  
  function enviarMensaje(event) {
    
    const nombre = document.getElementById("nombre").value;
    const msj = document.getElementById("chat_mensaje").value;
    const mail = document.getElementById("mail").value;
    let verificador1 = mail.includes("@");
    let verificador2 = mail.includes(".");
    let verificador = verificador1 && verificador2;
    document.getElementById("chat_mensaje").value = "";
    //verificador==(false) ? alert("ingrese un mail valido....Y DECÍ QUE NO TE HAGO REGISTRARTE con todo el coso de usar el mail, 2factores y la uña del papa") : socket.emit("new_msg", { autor: nombre, msj: msj });
    socket.emit("new_msg", { autor: nombre, msj: msj });
    return false;
  }

  function eliminarMensajes(event) {

    socket.emit("eliminarTodo");
    return false;
  }

    let botonEliminar = document.getElementById("btnEliminar");
    botonEliminar.addEventListener("click", eliminarMensajes);


  socket.on("listaMensajes", (data) => {

    render(data);
  });

  

 