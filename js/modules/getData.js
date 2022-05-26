
function showTable(data){
    let i = 1;
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

async function getData(url){
    // url -- https://randomuser.me/api/?results=10&seeds=foobar
    let response = await fetch(url);
    if(response.ok){
        let data = await response.json();
        let dataList = data.results;
        return dataList;
    }
    else return [];
}


function reset(element){
    element.innerHTML = "";
}


export {showTable, getData, reset}