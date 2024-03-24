import '../scss/style.scss';


crearTablero();


function crearTablero() {
    const fil = 80;
    const col = 80;
    const tamaño = 10;

    let html = `<table cellpadding="0" cellspacing="0" id="table">`;
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
        td.style.border = "1px solid ";
    });

    let pintado = false;
    const colorPaleta = document.getElementById("paleta-color");

    td.forEach(td => {
        td.addEventListener('mousedown', function() {
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

function pintarCelda(celda, colorSeleccionado) {
    // Cambia el color de la celda
    if (celda.style.backgroundColor !== colorSeleccionado) {
        celda.style.backgroundColor = colorSeleccionado;
    } else {
        celda.style.backgroundColor = "";
    }
}

