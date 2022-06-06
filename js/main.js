import { showTable, getData, reset } from "./modules/getData.js";
import { showFilters, filterBy, showSelectOptions, filterBy2 } from "./modules/filters.js";

//  Global variables:
let data = [];
let dataFiltered = [] /*Added this as a global variable */
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
        // filterByAgeCountry();
    }
}



/**
 * Handling the input for age 
 */
function filterByAge() {   
    // changes in the input
    
    age.addEventListener("input", (event) => {
        console.log("pais antes de evento", countryFilter.options[countryFilter.selectedIndex].value)
        let pais = countryFilter.options[countryFilter.selectedIndex].value;
        // reset the table elements
        reset(tableData);
        // get the input value in int
        let ageValue = event.target.value;
        console.log("Age value in main - filterByAge", ageValue);
        console.log("Age value in main - filterByAge type", typeof(ageValue));
       
            /*
             * I have added the dataFiltered as a global variable
             * I then use it as a tempt location for the filtered data
             */
            if (dataFiltered.length > 0) {
                // dataFiltered = filterBy(dataFiltered, "age", ageValue);
                dataFiltered = filterBy2(data, pais, ageValue);
                showTable(dataFiltered);    
            } else {
                // dataFiltered = filterBy(data, "age", ageValue);
                dataFiltered = filterBy2(data, pais, ageValue);
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
        console.log("edad antes de evento", age.value);
        let edad = age.value;
        // reset the table elements
        reset(tableData);
        // getting the selected option value
        const selectedElement = event.target.value;        
            /*
             * I have added the dataFiltered as a global variable
             * I then use it as a tempt location for the filtered data
             */
            if(dataFiltered.length > 0) {
                // dataFiltered = filterBy(dataFiltered, "country", selectedElement);
                dataFiltered = filterBy2(data, selectedElement, edad);
            showTable(dataFiltered);    
            } else {
                // dataFiltered = filterBy(data, "country", selectedElement);
                dataFiltered = filterBy2(data, selectedElement, edad);
                showTable(dataFiltered);
            }
    });
}

// run the program by clicking the button
showUsersBtn.addEventListener("click", main);