import { showTable, getData, reset } from "./modules/getData.js";
import {showFilters, filterBy} from "./modules/filters.js";


let data = [];
const tableData = document.querySelector("#table-content");

async function main(){
    
    const url = "https://randomuser.me/api/?results=10&seed=abc";
    

    data = await getData(url);
    console.log(data)
    if(data.length > 0){
        reset(tableData);
        showTable(data);
        showFilters();
        filterByAge();
    }   
}


function filterByAge(){
    let age = document.querySelector("#age-filter");
    
    age.addEventListener("input", (event)=> {
        let ageValue = parseInt(event.target.value);
        console.log(ageValue);
        
        if(isNaN(ageValue)){
            reset(tableData);
            showTable(data);
        }
        else{
            let dataFiltered = filterBy(data, "age", ageValue);
        console.log(dataFiltered);
        reset(tableData);
        showTable(dataFiltered);
        }
    });
}


document.querySelector(".btn").addEventListener("click", main);