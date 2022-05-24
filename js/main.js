import { showTable, getData, reset } from "./modules/getData.js";
import { showFilters, filterBy, findUniqueElements } from "./modules/filters.js";


let data = [];
const tableData = document.querySelector("#table-content");

async function main() {

    const url = "https://randomuser.me/api/?results=10&seed=abc";


    data = await getData(url);
    console.log(data)
    if (data.length > 0) {
        reset(tableData); // prevents that multiple calls through clicking button, creates more equal data many times
        showTable(data);
        showFilters();
        filterByAge();
        filterByCountry();
    }
}


function filterByAge() {
    let age = document.querySelector("#age-filter");

    age.addEventListener("input", (event) => {
        reset(tableData);
        let ageValue = parseInt(event.target.value);
        console.log(ageValue);

        if (isNaN(ageValue)) {
            reset(tableData);
            showTable(data);
        }
        else {
            let dataFiltered = filterBy(data, "age", ageValue);
            console.log(dataFiltered);
            reset(tableData);
            showTable(dataFiltered);
        }
    });
}


function filterByCountry() {
    let countryFilter = document.querySelector("#country-filter");

    let countries = data.map(item => item.location.country);
    let uniqueCountries = findUniqueElements(countries);

    uniqueCountries.map(country => {
        let option = document.createElement("option");
        option.innerHTML = country;
        option.setAttribute("value", country);

        countryFilter.appendChild(option);
    });

    countryFilter.addEventListener("change", (event) => {
        reset(tableData);
        const selectElement = event.target.value;

        if (selectElement === "select") {
            reset(tableData);
            showTable(data);
        }
        else {
            let dataFiltered = filterBy(data, "country", selectElement);
            console.log(dataFiltered);
            reset(tableData);
            showTable(dataFiltered);
        }
    });
}

document.querySelector(".btn").addEventListener("click", main);