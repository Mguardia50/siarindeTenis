const sockete = io.connect();

function msgPersonal(event) {
    let remitente = document.getElementById("mailDe").value;
    let destinatario = document.getElementById("mailPara").value;
    let mensaje = document.getElementById("chat_mensaje_personal").value;

    let mensajeObj = { 
        mailDe: remitente,
        mailPara: destinatario, 
        
        mensaje: [{mensaje: mensaje, timeStamp: Date()}]
    }

        sockete.emit("new_msg_personal",mensajeObj);
       
    
    return false;
}

sockete.on("listaMensajesPersonales", (data) => {

    render(data);
});

function render(data) {
            



    document.getElementById("mensajesP").innerHTML += `<p>${(data.mailDe)}:  ${data.mensaje[0].mensaje}</p>`;
}
