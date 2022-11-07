//CONVERSOR DE DIVISA

let valor = prompt("Ingrese el monto sobre el que desea operar:");
let operacion = prompt("Ingrese la operacion que desea realizar:\n1. Convertir a Dolar Oficial\n2. Convertir a Dolar Tarjeta\n3. Convertir a Dolar Tarjeta (si tuviste gastos de >300U$D)\n4. Convertir a Dolar Oficial con valor del 01/01/2022\n5. Convertir a Dolar Blue.")

function dolarOficial() {
    return parseFloat(valor) / 153.83;
}

function dolarTarjeta() {
    return parseFloat(valor) / (153.83 * 1.30 * 1.45);
}

function dolarTarjetaPlus300() {
    return parseFloat(valor) / (153.83 * 1.35 * 1.45 * 1.25);
}

function dolarAhorro() {
    return parseFloat(valor) / (153.83 * 1.30 * 1.35);
}

function dolarBlue() {
    return parseFloat(valor) / 291;
}

if (operacion == 1) {
    alert(dolarOficial(valor).toFixed(2));
} else if (operacion == 2) {
    alert(dolarTarjeta(valor).toFixed(2));
} else if (operacion == 3) {
    alert (dolarTarjetaPlus300(valor).toFixed(2));
} else if (operacion == 4) {
    alert (dolarAhorro(valor).toFixed(2));
} else if (operacion == 5) {
    alert (dolarBlue(valor).toFixed(2));
}

const answer1 = document.querySelector("#answer1");
answer1.textContent = dolarOficial(valor).toFixed(2);
const answer2 = document.querySelector("#answer2");
answer2.textContent = dolarTarjeta(valor).toFixed(2);
const answer3 = document.querySelector("#answer3");
answer3.textContent = dolarTarjetaPlus300(valor).toFixed(2);
const answer4 = document.querySelector("#answer4");
answer4.textContent = dolarAhorro(valor).toFixed(2);
const answer5 = document.querySelector("#answer5");
answer5.textContent = dolarBlue(valor).toFixed(2);

//PORTALES DE COMPRA

function renderTableRows(rows) {
    let htmlTable = `<tr>
    <td>label here</td>
    <td>img here</td>
    <td>value here</td>
    </tr>`;
    let htmlTotal = ``;
    rows.forEach(function(row) {
        htmlTable = `<tr>
        <td>${row[0]}</td>
        <td><img class="table-logo" src=${row[1]}></td>
        <td>${row[2]}</td>
        </tr>`
        htmlTotal = htmlTotal + htmlTable;
    })
    console.log(rows);
    return htmlTotal;
}

const data = [
    ["Uala", "assets/img/uala-logo.png", "$200(+65%)"],
    ["Brubank", "assets/img/brubank-logo.png", "$180(+50%)"], 
    ["Banco Nacion", "assets/img/bna-logo.png", "$250(+45%)"]
];

const html = renderTableRows(data);

const tbody = document.querySelector("#nutrition-table tbody");
tbody.insertAdjacentHTML("beforeend", html);