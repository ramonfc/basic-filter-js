// Module to get the data from API 

/**
 * Shows the information fetched from API in a HTML table
 * @param {Array} data Data fetched from API
 */
function showTable(data){
  // number of line in table
    let i = 1;
    // creating the content of the table
    data.forEach(element => {
        let row = document.createElement("tr");

        let tdNumber = document.createElement("td");
        tdNumber.innerHTML = `${i}`;

        let tdName = document.createElement("td");
        tdName.innerHTML = `${element.name.first} ${element.name.last}`;

        let tdAge = document.createElement("td");
        tdAge.innerHTML = `${element.dob.age}`;

        let tdCountry = document.createElement("td");
        tdCountry.innerHTML = `${element.location.country}`;

        let tdImage = document.createElement("td");
        let image = document.createElement("img");
        image.setAttribute("src", element.picture.thumbnail);
        image.setAttribute("alt", `photo of ${element.name.first} ${element.name.last}`);
        tdImage.appendChild(image);

        row.append(tdNumber, tdName, tdAge, tdCountry, tdImage);

        document.querySelector("#table-content").appendChild(row);

        i++;
    });
}


/**
 * Fetch the data from the API
 * @returns {Array} Array of objects for a successfull request or an empty array otherwise
 */
async function getData(){
  // url endpoint to get the users. The attribute results contains the list of objects
  const url = "https://randomuser.me/api/?results=10&seed=abc"; 
    let response = await fetch(url);
    if(response.ok){
        let data = await response.json();
        let dataList = data.results;
        return dataList;
    }
    else return [];
}

/**
 * Clears the appended elements of the HTML node
 * @param {Node} element HTML element to clear
 */
function reset(element){
    element.innerHTML = "";
}


export {showTable, getData, reset}