const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();

async function getRandomUser() {
    const response = await fetch("https://www.randomuser.me/api");
    const data = await response.json();
    const randomUser = data.results[0];
    const newUser = {
        name: `${randomUser.name.first} ${randomUser.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    };
    addData(newUser);
}

function addData(dataObj) {
    data.push(dataObj);
    updateDOM();
}

function updateDOM(userData = data) {
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
    userData.forEach(item => {
        const element = document.createElement("div");
        element.classList.add("person");
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
    });

}

function formatMoney(number) {
    return '$' + (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

function doubleMoney() {
    data = data.map(user => {
        return {
            ...user,
            money: user.money * 2
        }
    });
    updateDOM();
}

function showOnlyMillionaires() {
    data = data.filter(user => {
        return user.money > 1000000;
    })
    updateDOM();
}

function sortByRichest() {
    data = data.sort((a, b) => {
        return b.money - a.money
    });
    updateDOM();
}

function calculateWealth() {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0);
    const wealthElement = document.createElement("div");
    wealthElement.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthElement);
}

addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
showMillionairesBtn.addEventListener("click", showOnlyMillionaires);
sortBtn.addEventListener("click", sortByRichest);
calculateWealthBtn.addEventListener("click", calculateWealth);