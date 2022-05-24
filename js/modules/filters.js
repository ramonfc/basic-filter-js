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



export { showFilters, filterBy}