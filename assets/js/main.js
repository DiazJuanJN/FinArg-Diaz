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

/*const data = [
    ["Uala", "assets/img/uala-logo.png", "$200 (+65%)"],
    ["Brubank", "assets/img/brubank-logo.png", "$180 (+50%)"], 
    ["Banco Nacion", "assets/img/bna-logo.png", "$250 (+45%)"]
];*/

const portales = [
    {nombre: "Uala", logo: "uala-logo.png", cotizacion: "$140 (+65%)"},
    {nombre: "Brubank", logo: "brubank-logo.png", cotizacion: "$180 (+50%)"},
    {nombre: "Banco Nacion", logo: "bna-logo.png", cotizacion: "$150 (+45%)"},
    {nombre: "Binance", logo: "binance-logo.png", cotizacion: "$265 (0%)*"},
    {nombre: "Lemon Cash", logo: "lemon-logo.png", cotizacion: "$284 (0%)*"},
    {nombre: "Invertir Online", logo: "invonline-logo.png", cotizacion: "$289 (0%)**"}
]

function renderTableRows() {
    let htmlTable = `<tr>
    <td>label here</td>
    <td>img here</td>
    <td>value here</td>
    </tr>`;
    let htmlTotal = ``;
    portales.forEach(portal=>{
        htmlTable = `<tr>
        <td>${portal.nombre}</td>
        <td><img class="table-logo" src="assets/img/${portal.logo}"></td>
        <td>${portal.cotizacion}</td>
        </tr>`
        htmlTotal = htmlTotal + htmlTable;
    });
    return htmlTotal;
}

const html = renderTableRows(portales);

const tbody = document.querySelector("#portales-table tbody");
tbody.insertAdjacentHTML("beforeend", html);