# SIARINDE
### SOBRE NOSOTROS
SIARINDE surgio como una idea en 2017 de unificar al deporte, de forma tal de facilitar la realización de los mismos a través de una APP. Está siendo desarrolla actualmente con la idea de sumar criptomonedas bajo un concepto de "PoM" (Proof of movement) o prueba de movimiento; mediante un minado que compensa el movimiento y, el hacer deporte junto a competencias y obtener cryptos las cuales podrán ser cambiadas por items en la tienda (actualmente figura como $ pero es el valor en crypto ganadas a futuro)

### PROYECTO SIARINDE
Por el momento no se encuentra desarrollada la página web, se está realizando un plan por etapas según un MVP (minimum valuable proyect) el cual se desarrollara de la siguiente manera:

1. Diseño de la página web 
2. Diseño de la app
3. Diseño de la cryptomoneda SIARINDE Coin
4. Diseño de los contratos inteligentes
5. Desarrollo en el sector tenis 
6. Desarrollo de SIARINDE Coin
7. Prueba beta de SIARINDE TENIS
8. Lanzamiento segmentado
9. Implementación de publicidades, competencias y eventos
10. Desarrollo de nuevos sectores deportivos

### FUNCIONAMIENTO ACTUAL
En este momento se esta desarrollando el backend de la parte de tenis; la tienda será desarrollada junto con la parte crypto


### CHANGELOG

Siarinde Tenis V0.04
-Se agrego verificar mediante mail usuario y admin
-Se listan las canchas y se puede agregar o modificar si sos admin
-Se listan los jugadores de tenis, se puede chatear personalmente con cada uno
    -Se debe arreglar el sort por fecha y hacer pruebas mayores para que otros usuarios no filtren la conversacion
-Hay un chat general
-Se vinculo con react
-Se mejoró la arquitectura del código
-Se agregaron algunos repo y factories


Siarinde Tenis V0.03
-Se limpio el código: passport paso a un archivo JS y appTenis a otro
-Se arreglo el logout



Siarinde Tenis V0.02
-Ahora se registra usuario y password
-Login mediante MongoDB
-ERRROR: bad request en caso de un login nulo en vez de lo que tiene que retornar


Siarinde Tenis V0.01

-Se puede cargar y traer jugadores desde MongoDB
-Se puede cargar y traer Canchas desde Firebase
-Se agrego inicio de sesion persistente en MongoDB: login (por ahora sin registro)
-Se hizo un chat el cual envia a MongoDB
    -el chat cuenta con un error; si se refresca la pagina no aparecen los nuevos chat
    -Se hizo una normalización donde la fecha guardará todos los chats de esa fecha; no se usará de esta manera

-Se debe unir session.js con app.js, se verá más adelante de usar un webpack y unir a la pagina de siarinde de react
-El archivo .env no funciona bien cuando cambia de carpeta
