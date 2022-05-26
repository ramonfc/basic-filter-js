import { showTable, getData, reset } from "./modules/getData.js";
import { showFilters, filterBy, showSelectOptions } from "./modules/filters.js";

//  Global variables:
let data = [];
const tableData = document.querySelector("#table-content");
const showUsersBtn = document.querySelector(".btn");
let age = document.querySelector("#age-filter");
let countryFilter = document.querySelector("#country-filter");

// Functions:

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
  
    showSelectOptions(data, countryFilter);

    countryFilter.addEventListener("change", (event) => {
        reset(tableData);
        const selectedElement = event.target.value;

        if (selectedElement === "select") {
            showTable(data);
        }
        else {
            let dataFiltered = filterBy(data, "country", selectedElement);
            console.log(dataFiltered);
            showTable(dataFiltered);
        }
    });
}

showUsersBtn.addEventListener("click", main);