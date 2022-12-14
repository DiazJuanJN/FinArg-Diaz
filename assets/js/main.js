//ENTER WEBSITE

const enterWebBtn = document.querySelector("#enter-ws-btn")
const enterWebSect = document.querySelector("#enter-web-sect")

enterWebBtn.addEventListener('click', () => {
    enterWebSect.classList.replace('enter-website', 'remove-sect');
    localStorage.setItem('startedDemo', true);
})

if (JSON.parse(localStorage.getItem('startedDemo')) === true) {
    enterWebSect.classList.replace('enter-website', 'remove-sect');
}
//FOREX CONVERSOR

function dolarOficial(valorARS) {
    return parseFloat(valorARS) / 174.82;
}
function dolarTarjeta(valorARS) {
    return parseFloat(valorARS) / (174.82 * 1.30 * 1.45);
}
function dolarTarjetaPlus300(valorARS) {
    return parseFloat(valorARS) / (174.82 * 1.35 * 1.45 * 1.25);
}
function dolarAhorro(valorARS) {
    return parseFloat(valorARS) / (174.82 * 1.30 * 1.35);
}
function dolarBlue(valorARS) {
    return parseFloat(valorARS) / 313;
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

//FOREX PORTALS

const portales = [
    {nombre: "Uala", tipo: "virtual", logo: "uala-logo.png", cotizacion: "140", imp:"65"},
    {nombre: "Brubank", tipo: "virtual", logo: "brubank-logo.png", cotizacion: "180", imp: "50"},
    {nombre: "Banco Nacion", tipo: "bank", logo: "bna-logo.png", cotizacion: "150", imp: "45"},
    {nombre: "Banco Patagonia", tipo: "bank", logo: "patagonia-logo.png", cotizacion: "175", imp: "45"},
    {nombre: "Binance", tipo: "crypto", logo: "binance-logo.png", cotizacion: "265", imp: "0"},
    {nombre: "Lemon Cash", tipo: "crypto", logo: "lemon-logo.png", cotizacion: "284", imp: "0"},
    {nombre: "Invertir Online", tipo: "investment", logo: "invonline-logo.png", cotizacion: "289", imp:"0"},
    {nombre: "EToro", tipo: "investment", logo: "etoro-logo.png", cotizacion: "305", imp:"0"}
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

//SELECT FILTER AND SORT

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

//ADD INVESTMENT

const invAmount = document.querySelector("#inv-amount");
const invCoin = document.querySelector("#inv-coin");
const coinCost = document.querySelector("#coin-cost");
const invImp = document.querySelector("#inv-imp");

const portfolio = document.querySelector("#portfolio");
const invested = document.querySelector("#invested");
const arsWorth = document.querySelector("#ars-worth");
const profit = document.querySelector("#profit");

const addInv = document.querySelector("#add-inv");

const invRegister = document.querySelector("#inv-register");

const invRecords = [];

addInv.addEventListener('click', ()=> {
    const DateTime = luxon.DateTime;
    let now = DateTime.now().setLocale('es');

    let investedAmount = invAmount.value;
    let totalBuyPrice = coinCost.value * (1 + invImp.value / 100);
    console.log(totalBuyPrice);
    function convertInvestment() {
        return investedAmount / totalBuyPrice;
    }

    portfolio.textContent = "USD " + convertInvestment(investedAmount).toFixed(2);
    invested.textContent = "$" + investedAmount;

    fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales')
    .then(response => response.json())
    .then(data => {
        let APIdolar = data[1].casa.venta;
        let realWorth = convertInvestment(investedAmount) * parseFloat(APIdolar);
        arsWorth.textContent = "$" + realWorth.toFixed(2);

        let earnings = (realWorth - investedAmount) * 100 / investedAmount;
        profit.textContent = "%" + earnings.toFixed(2);
    });

    //PUSH INTO STORAGE NEW INVESTMENT

    const invRecord = {
        date: now.toLocaleString(),
        time: now.toLocaleString(DateTime.TIME_SIMPLE),
        ARSinv: investedAmount,
        USDcap: convertInvestment(investedAmount).toFixed(2),
        buyPrice: totalBuyPrice,
    }

    invRecords.push(invRecord);
    let invData = JSON.stringify(invRecords);
    localStorage.setItem('inv', invData);
    console.log(invRecords);

    //INVESTMENT RECORD

    const recoveredInv = JSON.parse(localStorage.getItem('inv'));

    function renderTableRows2() {
        let htmlTable = ``;
        let htmlTotal = ``;
        recoveredInv.forEach(investment=>{
            htmlTable = `<tr>
            <td>${investment.date}</td>
            <td>${investment.time}</td>
            <td>$${investment.ARSinv}</td>
            <td>$${investment.USDcap}</td>
            <td>$${investment.buyPrice}</td>
            </tr>`
            htmlTotal = htmlTotal + htmlTable;
        });
        return htmlTotal;
    }

    const html2 = renderTableRows2(recoveredInv);
    const tbody2 = document.querySelector("#inv-register tbody");
    tbody2.innerHTML = ``;
    tbody2.insertAdjacentHTML("beforeend", html2);

    //TOTAL EXPOSITION

    const totalCap = document.querySelector("#total-cap");
    const totalWorth = document.querySelector("#total-worth");
    const totalProfit = document.querySelector("#total-profit");

    if (recoveredInv) {
        let capFactor = 0;
        let capSummatory = 0;
        recoveredInv.forEach(cap =>{
            capFactor = parseFloat(cap.USDcap);
            capSummatory = capSummatory + capFactor;
        })
        let invFactor = 0;
        let invSummatory = 0;
        recoveredInv.forEach(inv =>{
            invFactor = parseFloat(inv.ARSinv);
            invSummatory = invSummatory + invFactor;
        })
        totalCap.textContent = "$" + capSummatory;
        fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales')
        .then(response => response.json())
        .then(data => {
        let APIdolar = data[1].casa.venta;
        let APIworth = capSummatory * parseFloat(APIdolar);
        totalWorth.textContent = "$" + APIworth.toFixed(2);

        let totalEarnings = (APIworth - invSummatory) * 100 / invSummatory;
        totalProfit.textContent = "%" + totalEarnings.toFixed(2);
    });
    }
});

//JUST OPERATE WITH USD

const usdMsg = document.querySelector("#usd-msg")

invCoin.addEventListener('change', () => {
    const coinValue = invCoin.options[invCoin.selectedIndex].value;
    if (coinValue == "eur"||"brl") {
        usdMsg.classList.replace('remove-sect', 'usd-msg');
        invCoin.classList.replace('coin-select', 'coin-select-error');
    } 
    if (coinValue == "usd") {
        usdMsg.classList.replace('usd-msg', 'remove-sect');
        invCoin.classList.replace('coin-select-error', 'coin-select');
    }
})

//INVESTMENT RECORD (OUTSIDE EVENT)

const recoveredInv = JSON.parse(localStorage.getItem('inv'));
if (recoveredInv) {
    recoveredInv.forEach(record => {
        invRecords.push(record);
    })
};

function renderTableRows2() {
    let htmlTable = ``;
    let htmlTotal = ``;
    recoveredInv.forEach(investment=>{
        htmlTable = `<tr>
        <td>${investment.date}</td>
        <td>${investment.time}</td>
        <td>$${investment.ARSinv}</td>
        <td>$${investment.USDcap}</td>
        <td>$${investment.buyPrice}</td>
        </tr>`
        htmlTotal = htmlTotal + htmlTable;
    });
    return htmlTotal;
}

    const html2 = renderTableRows2(recoveredInv);
    const tbody2 = document.querySelector("#inv-register tbody");
    if (recoveredInv) {
        tbody2.innerHTML = ``;
    }
    tbody2.insertAdjacentHTML("beforeend", html2);

    //TOTAL EXPOSITION (OUTSIDE EVENT)

    const totalCap = document.querySelector("#total-cap");
    const totalWorth = document.querySelector("#total-worth");
    const totalProfit = document.querySelector("#total-profit");

    if (recoveredInv) {
        let capFactor = 0;
        let capSummatory = 0;
        recoveredInv.forEach(cap =>{
            capFactor = parseFloat(cap.USDcap);
            capSummatory = capSummatory + capFactor;
        })
        let invFactor = 0;
        let invSummatory = 0;
        recoveredInv.forEach(inv =>{
            invFactor = parseFloat(inv.ARSinv);
            invSummatory = invSummatory + invFactor;
        })
        totalCap.textContent = "$" + capSummatory;
        fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales')
        .then(response => response.json())
        .then(data => {
        let APIdolar = data[1].casa.venta;
        let APIworth = capSummatory * parseFloat(APIdolar);
        totalWorth.textContent = "$" + APIworth.toFixed(2);

        let totalEarnings = (APIworth - invSummatory) * 100 / invSummatory;
        totalProfit.textContent = "%" + totalEarnings.toFixed(2);
    });
    }