import { showTable, getData, reset } from "./modules/getData.js";
import { showFilters, filterBy, showSelectOptions } from "./modules/filters.js";

//  Global variables:
let data = [];
const tableData = document.querySelector("#table-content");
const showUsersBtn = document.querySelector(".btn");
let age = document.querySelector("#age-filter");
let countryFilter = document.querySelector("#country-filter");

// Functions:


 /**
  * Main function to  invoke other functions. If there are data from the API request, invoke the functions.

  */
async function main() {       
    // getting data
    data = await getData();    
    console.log(data);

    // if there are data, call the other functions
    if (data.length > 0) {
        // prevents that multiple calls through clicking button, creates more equal data many times
        reset(tableData);

        showTable(data);
        showFilters();
        filterByAge();      
        filterByCountry();
    }
}

/**
 * Handling the input for age 
 */
function filterByAge() {   
    // changes in the input
    age.addEventListener("input", (event) => {
        // reset the table elements
        reset(tableData);
        // get the input value in int
        let ageValue = parseInt(event.target.value);

        // if there is a blank number in input show the fetched data
        if (isNaN(ageValue)) {
            showTable(data);
        }
        // if user input some value show the matched ages
        else {
            let dataFiltered = filterBy(data, "age", ageValue);
            showTable(dataFiltered);
        }
    });
}

/**
 * Handling select for country
 */
function filterByCountry() {    
    // creating the option values in the select
    showSelectOptions(data, countryFilter);
    // changes in the select
    countryFilter.addEventListener("change", (event) => {
        // reset the table elements
        reset(tableData);
        // getting the selected option value
        const selectedElement = event.target.value;
        // if the option is the default show the entire table
        if (selectedElement === "select") {
            showTable(data);
        }
        // if user selected some country show all matches for that country
        else {
            let dataFiltered = filterBy(data, "country", selectedElement);
            showTable(dataFiltered);
        }
    });
}

// run the program by clicking the button
showUsersBtn.addEventListener("click", main);