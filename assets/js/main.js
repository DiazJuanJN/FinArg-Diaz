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

const portales = [
    {nombre: "Uala", tipo: "virtual", logo: "uala-logo.png", cotizacion: "140", imp:"65"},
    {nombre: "Brubank", tipo: "virtual", logo: "brubank-logo.png", cotizacion: "180", imp: "50"},
    {nombre: "Banco Nacion", tipo: "bank", logo: "bna-logo.png", cotizacion: "150", imp: "45"},
    {nombre: "Binance", tipo: "crypto", logo: "binance-logo.png", cotizacion: "265", imp: "0"},
    {nombre: "Lemon Cash", tipo: "crypto", logo: "lemon-logo.png", cotizacion: "284", imp: "0"},
    {nombre: "Invertir Online", tipo: "investment", logo: "invonline-logo.png", cotizacion: "289", imp:"0"}
];

function renderTableRows() {
    let htmlTable = ``;
    let htmlTotal = ``;
    portales.forEach(portal=>{
        htmlTable = `<tr>
        <td>${portal.nombre}</td>
        <td><img class="table-logo" src="assets/img/${portal.logo}"></td>
        <td>$${portal.cotizacion}(+${portal.imp}%)</td>
        </tr>`
        htmlTotal = htmlTotal + htmlTable;
    });
    return htmlTotal;
}

function renderHTMLTable() {
    const html = renderTableRows(portales);
    const tbody = document.querySelector("#portales-table tbody");
    tbody.innerHTML = ``;
    tbody.insertAdjacentHTML("beforeend", html);
}
renderHTMLTable();

//SELECT FILTRO Y ORGANIZAR

const sort = document.querySelector("#sort");
const filter = document.querySelector("#filter");

sort.addEventListener('change', ()=>{
    const option1 = sort.options[sort.selectedIndex].value;
    if (option1 == "alf") {
        portales.sort((a,b) => (a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0));
    }else if (option1 == "lower") {
        portales.sort((a,b) => (a.cotizacion > b.cotizacion) ? 1 : ((b.cotizacion > a.cotizacion) ? -1 : 0));
    }else if (option1 == "higher") {
        portales.sort((a,b) => (a.cotizacion < b.cotizacion) ? 1 : ((b.cotizacion < a.cotizacion) ? -1 : 0));
    } else if (option1 == "lower-imp") {
        portales.sort((a,b) => (a.imp > b.imp) ? 1 : ((b.imp > a.imp) ? -1 : 0));
    }
    renderHTMLTable();
});

filter.addEventListener('change', ()=>{
    let portales2 = [];

    function renderTableRows() {
        let htmlTable = ``;
        let htmlTotal = ``;
        portales2.forEach(portal=>{
            htmlTable = `<tr>
            <td>${portal.nombre}</td>
            <td><img class="table-logo" src="assets/img/${portal.logo}"></td>
            <td>$${portal.cotizacion}(+${portal.imp}%)</td>
            </tr>`
            htmlTotal = htmlTotal + htmlTable;
        });
        return htmlTotal;
    }

    const option2 = filter.options[filter.selectedIndex].value;
    if (option2 == "virtual") {
        portales2 = portales.filter(portal => portal.tipo == "virtual");
    }else if (option2 == "bank") {
        portales2 = portales.filter(portal => portal.tipo == "bank");
    }else if (option2 == "crypto") {
        portales2 = portales.filter(portal => portal.tipo == "crypto");
    }else if (option2 == "investment") {
        portales2 = portales.filter(portal => portal.tipo == "investment");
    }else if (option2 == "showall") {
        portales2 = portales;
    }
    
    const html = renderTableRows(portales2);
    const tbody = document.querySelector("#portales-table tbody");
    tbody.innerHTML = ``;
    tbody.insertAdjacentHTML("beforeend", html);
});