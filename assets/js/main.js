//CONVERSOR DE DIVISA

function dolarOficial(valorARS) {
    return parseFloat(valorARS) / 153.83;
}
function dolarTarjeta(valorARS) {
    return parseFloat(valorARS) / (153.83 * 1.30 * 1.45);
}
function dolarTarjetaPlus300(valorARS) {
    return parseFloat(valorARS) / (153.83 * 1.35 * 1.45 * 1.25);
}
function dolarAhorro(valorARS) {
    return parseFloat(valorARS) / (153.83 * 1.30 * 1.35);
}
function dolarBlue(valorARS) {
    return parseFloat(valorARS) / 291;
}

const answer1 = document.querySelector("#answer1");
const answer2 = document.querySelector("#answer2");
const answer3 = document.querySelector("#answer3");
const answer4 = document.querySelector("#answer4");
const answer5 = document.querySelector("#answer5");

const valorARS = document.querySelector("#valorARS");

valorARS.addEventListener("keyup", () => {
    const valor = valorARS.value;

    if (valor) {
        answer1.textContent = dolarOficial(valor).toFixed(2);
        answer2.textContent = dolarTarjeta(valor).toFixed(2);
        answer3.textContent = dolarTarjetaPlus300(valor).toFixed(2);
        answer4.textContent = dolarAhorro(valor).toFixed(2);
        answer5.textContent = dolarBlue(valor).toFixed(2);
    } else {
        answer1.textContent = "";
        answer2.textContent = "";
        answer3.textContent = "";
        answer4.textContent = "";
        answer5.textContent = "";
    }
    
})

//PORTALES DE COMPRA

const data = [
    ["Uala", "assets/img/uala-logo.png", "$200 (+65%)"],
    ["Brubank", "assets/img/brubank-logo.png", "$180 (+50%)"], 
    ["Banco Nacion", "assets/img/bna-logo.png", "$250 (+45%)"]
];

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
    return htmlTotal;
}

const html = renderTableRows(data);

const tbody = document.querySelector("#nutrition-table tbody");
tbody.insertAdjacentHTML("beforeend", html);