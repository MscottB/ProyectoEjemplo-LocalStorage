//variables

const formulario = document.querySelector('#formulario');
const listaMensajes = document.querySelector('#lista-tweets');

let mensajes = [];

//eventlisteners
eventListeners();
function eventListeners() {
    // cuando el usuario agrega un nuevo mensaje
    formulario.addEventListener('submit', agregarMensaje);

    //cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', ()=>{
        mensajes = JSON.parse(localStorage.getItem('mensajes')) || [];
        console.log(mensajes);
        crearHTML();
    });

}



//funciones

function agregarMensaje(e) {
    e.preventDefault();

    //textarea donde se escribe el mensaje
    const mensaje = document.querySelector('#tweet').value;

    //validacion
    if (mensaje === '') {
        mostrarError('un mensaje no puede ir vacio');
        return; //evita que se ejecute mas lineas
    }

    const mensajeObj = {
        id: Date.now(),
        // mensaje: mensaje
        mensaje
    }

    //agregar al arreglo de mensajes
    mensajes = [...mensajes, mensajeObj];
    // una vez agregado se crea la seccion HTML
    crearHTML();
    //reiniciar formulario
    formulario.reset();
}

//mostrar mensaje error
function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //insertar en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //elimina la alerta despues de 3 seg
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

//muestra una lista de los mensajes
function crearHTML() {
    limpiarHTML();
    if (mensajes.length > 0) {
        mensajes.forEach((mensaje)=>{

            //agregar boton para eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            //agregar funcion eliminar DOM
            btnEliminar.onclick = ()=>{
                borrarMensaje(mensaje.id);
            };

            //crear HTML
            const li = document.createElement('li');
            // agregar texto
            li.innerText = mensaje.mensaje;
            //asignar boton
            li.appendChild(btnEliminar);
            //insertar en html
            listaMensajes.appendChild(li);
        });
    }

    //guarda los datos en localStorage
    sincronizarStorage();
}

//guarda los datos en localostorage
function sincronizarStorage() {
    localStorage.setItem('mensajes', JSON.stringify(mensajes));
}

function borrarMensaje(id) {
    mensajes = mensajes.filter(mensaje => mensaje.id !== id);
    console.log(mensajes);
    crearHTML();
}

//Eliminar lista anterior
function limpiarHTML() {
    while (listaMensajes.firstChild) {
        listaMensajes.removeChild(listaMensajes.firstChild);
    }
}