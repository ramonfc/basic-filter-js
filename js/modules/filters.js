// Module to deal with filters

import {reset} from "./getData.js";


function showFilters() {
    const filters = document.querySelector(".filters");
    filters.style.display = "flex";
    filters.classList.add("style-filter");
}

function filterBy(list, selection, value) {

    let newList = [];
    switch (selection) {
        case "age":
            newList = list.filter(item => item.dob.age === value);
            // console.log(newList);
            break;
        case "country":
            newList = list.filter(item => item.location.country === value);
            console.log(newList);
            break;
    }

    return newList;
}


function findUniqueElements(list) {
    const uniqueElements = new Set(list);

    return [...uniqueElements];
}



function showSelectOptions(data, countryFilter){
    let countries = data.map(item => item.location.country);
    let uniqueCountries = findUniqueElements(countries);
    reset(countryFilter);
    let option = document.createElement("option");
        option.innerHTML = "Select Country";
        option.setAttribute("value", "select");
        countryFilter.appendChild(option);
    uniqueCountries.map(country => {
        let option = document.createElement("option");  

        option.innerHTML = country;
        option.setAttribute("value", country);

        countryFilter.appendChild(option);
    });
}

export { showFilters, filterBy, findUniqueElements, showSelectOptions }