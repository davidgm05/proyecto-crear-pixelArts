import '../scss/style.css';
import jsPDF from 'jspdf';
import { createCanvas } from 'canvas';

crearTablero();

let estadoAnterior = [];

function crearTablero() {
    const fil = 80;
    const col = 80;
    const tamaño = 4;

    let html = `<table cellpadding="0" cellspacing="0" id="table" class="tabla">`;
    for (let y = 0; y < fil; y++) {
        html += `<tr id="tr">`;
        for (let x = 0; x < col; x++) {
            html += `<td id="celula-${y}-${x}"></td>`;
        }
        html += `</tr>`;
    }
    html += `</table>`;

    const contenedorTablero = document.getElementById("contenedor-tablero");
    contenedorTablero.innerHTML = html;

    const table = document.getElementById("table");
    table.style.width = tamaño * fil + `px`;
    table.style.height = tamaño * col + `px`;
    table.style.borderCollapse = "collapse";
    

    const td = document.querySelectorAll("#table td");
    td.forEach(td => {
        td.style.border = "1px";
    });

    let pintado = false;
    const colorPaleta = document.getElementById("paleta-color");

    td.forEach(td => {
        td.addEventListener('mousedown', function() {
            guardarEstadoTablero();
            pintado = true;
            pintarCelda(this, colorPaleta.value);
        });

        td.addEventListener('mouseover', function() {
            if (pintado === true) {
                pintarCelda(this, colorPaleta.value);
            }
        });

        td.addEventListener('mouseup', function() {
            pintado = false;
        });
    });
}

// Función para guardar el estado actual del tablero
function guardarEstadoTablero() {
    // Obtiene todas las celdas del tablero
    const celdas = document.querySelectorAll("#table td");

    // Crea un array vacío para almacenar el estado anterior del tablero
    estadoAnterior = [];

    // Itera sobre cada celda del tablero
    celdas.forEach(celda => {
        // Guarda el ID y el color de fondo actual de cada celda en el array de estado anterior
        estadoAnterior.push({
            id: celda.id,
            color: celda.style.backgroundColor
        });
    });
}

function pintarCelda(celda, colorSeleccionado) {
    // Cambia el color de la celda
    if (celda.style.backgroundColor !== colorSeleccionado) {
        celda.style.backgroundColor = colorSeleccionado;
    } else {
        celda.style.backgroundColor = "";
    }
}

// Selecciona el botón de deshacer
const botonDeshacer = document.querySelector("#boton-deshacer");

// Agrega un event listener para el evento "click"
botonDeshacer.addEventListener("click", deshacerAccion);


// Función para deshacer la última acción realizada en el tablero
function deshacerAccion() {
    // Selecciona todas las celdas del tablero
    const celdas = document.querySelectorAll("#table td");

    // Itera sobre el array de estado anterior
    estadoAnterior.forEach(estado => {
        // Obtiene la celda correspondiente en el tablero utilizando su ID
        const celda = document.getElementById(estado.id);
        
        // Restaura el color de fondo de la celda al color guardado en el estado anterior
        celda.style.backgroundColor = estado.color;
    });
}

const botonBorrador = document.getElementById("boton-borrador");

botonBorrador.addEventListener('click', borrarLienzo);

function borrarLienzo(){
    let celdas = document.querySelectorAll("#table td");


    celdas.forEach(celdas => {
        celdas.style.backgroundColor = "";
    })
}

// Seleccionar el botón "Guardar" por su ID
const botonGuardar = document.getElementById("guardar-dibujo-PDF");

// Agregar un event listener para el evento "click"
botonGuardar.addEventListener("click", guardarDibujoPDF);

// Función para guardar el tablero como PDF
function guardarDibujoPDF() {
    // Usando jsPDF para generar y guardar como PDF
    const doc = new jsPDF();

    const contenedorTablero = document.getElementById("contenedor-tablero");

    // Generar PDF a partir del contenido HTML del contenedor-tablero
    doc.html(contenedorTablero, {
        callback: function (pdf) {
            // Guardar el PDF
            pdf.save("mi_dibujo.pdf");
        }
    });
}
