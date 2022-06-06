// Module to deal with filters

import {reset} from "./getData.js";

/**
 * Function to make the filters visibles
 */
function showFilters() {
    // get the element that contains the filters
    const filters = document.querySelector(".filters");
    // changing the display of the element
    filters.style.display = "flex";
    // adding a new class
    filters.classList.add("style-filter");
}

/**
 * Select the filter to be used, either by age or by country.
 * @param {Array} list Array that contains the data to be filtered
 * @param {String} selection Specific value to determin which filter to use
 * @param {Any} value Value to find in the filter
 * @returns {Array} Filtered data
 */
function filterBy(list, selection, value) {
    // list to save the filtered values
    let newList = [];
    // verify the selection
    switch (selection) {
        case "age":
            newList = list.filter(item => item.dob.age === value);
            break;
        case "country":
            newList = list.filter(item => item.location.country === value);
            break;
    }
    return newList;
}



function filterBy2(list, country, inputAge){
    let newList = [];
    console.log("inputAge", inputAge)
    console.log("country", country)
    if(inputAge != "" && country != "select"){
        console.log("entro 1")
        console.log("list",list)
        newList = list.filter(item => item.dob.age == inputAge);
        console.log(newList)
        newList = newList.filter(item => item.location.country === country);
    }
    else if(inputAge != ""){
        console.log("entro 2")
        newList = list.filter(item => item.dob.age == inputAge);
    }
    else if(country != "select") {
        console.log("entro 3")
        newList = list.filter(item => item.location.country === country);
    }
    else {
        newList = list;
    }
    console.log("newList", newList)
    return newList;
}


/**
 * Used in the select to find the unique values in the column Country and construct the select option values
 * @param {Array} list Values in the column Country
 * @returns {Array} Values in the colum without repetitions
 */
function findUniqueElements(list) {
    // create a set to avoid repetitions in the list
    const uniqueElements = new Set(list);
    // return the unique elements of the set as an array
    return [...uniqueElements];
}


/**
 * Used in the select to show the options
 * @param {Array} data contains the fetched data from the API (info in the table)
 * @param {Node} countryFilter contains the reference to the selector HTML element
 */
function showSelectOptions(data, countryFilter){
    // getting the countries list from the table
    let countries = data.map(item => item.location.country);
    // extracting a list of unique countries
    let uniqueCountries = findUniqueElements(countries);
    // clearing the current options list in the select element
    reset(countryFilter);
    // creating the "default" option in select
    let option = document.createElement("option");
        option.innerHTML = "Select Country";
        option.setAttribute("value", "select");
        countryFilter.appendChild(option);
    // creating the options by country
    uniqueCountries.map(country => {
        let option = document.createElement("option");  
        option.innerHTML = country;
        option.setAttribute("value", country);

        countryFilter.appendChild(option);
    });
}

export { showFilters, filterBy, findUniqueElements, showSelectOptions, filterBy2 }