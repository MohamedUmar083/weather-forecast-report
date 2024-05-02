/* Getting Elements by its id  */

let check = document.getElementById("check");
let div = document.getElementById("show");

/* Adding Event Listener for button check */

check.addEventListener("click", () => {
  div.innerHTML = ""; // Clearing the Previous data inside the div

  let cityName = document.getElementById("name").value; // Getting value from the input bar

  /* If the value from input bar is emptr it trigger a alert */
  if (cityName == "") {
    alert("Enter City Name");
  }

  /* Fetching weather api for current weather information */
  const weatherapi = fetch(
    `https://api.weatherapi.com/v1/current.json?key=6f8a57348e2946448cd73235242904&q=${cityName}&aqi=no`
  );

  weatherapi
    .then((rdata) => rdata.json())
    .then((data) => {
      /* Assigning weather's values to a variable */
      let name = data.location.name;
      let region = data.location.region;
      let country = data.location.country;
      let update = data.current.last_updated;
      let condition = data.current.condition.text;
      let temp_c = data.current.temp_c;
      let temp_f = data.current.temp_f;
      let humidity = data.current.humidity;
      let icon = data.current.condition.icon;
      //console.log(data);

      /* Fetching restcountries api to get some data's to match the value from weather api */
      const restCountryApi = fetch("https://restcountries.com/v3.1/all");

      restCountryApi
        .then((rcdata) => rcdata.json())
        .then((rcdata) => {
          for (let i = 0; i < rcdata.length; i++) {
            if (
              country == rcdata[i].name.common ||
              country == rcdata[i].name.official
            ) {
              div.innerHTML = `
              
              <div class="container body">
              <h2 class="text-center">${name}'s Weather Status</h2>
              <div class="row g-3 justify-content-center">
              
              

              <div class="col">
              <div class="card text-center h-100 ">
              <div class="card-header">
              <h5 class="card-title text-center">${name}</h5>
              </div>  
              <div class="img-box">
              <img src="${rcdata[i].flags.png}" class="card-img-top" alt="${rcdata[i].name.common}" />
              </div>
              <div class ="card-body">
              
              <div class="card-text text-center">Region : ${region}</div>
              <div class="card-text text-center">Capital : ${rcdata[i].capital} </div>
              <div class="card-text text-center">Location : ${rcdata[i].name.common}, ${rcdata[i].cca2} </div>

              </div>
              <div class="card-footer">
              <small class="text-body-primary">Last updated : ${update}</small>
              </div>

              </div>
              </div>
              





              <div class="col">
              <div class="card text-center h-100">
              <div class="card-header">
              <h5 class="card-title text-center">Weather : ${condition} </h5>
              </div>  
              
              <div class ="card-body">
              
              <div class="table-responsive"> 
              <img src="${icon}">
              <table class="table custom-table" >
              <thead>
              <tr>
              <th>Title</th>
              <th>Status</th>
              </tr>

              </thead>
              <tbody> 
              <tr>
              <td>Condition</td>
              <td>${condition}</td> 
              </tr>

              <tr>
              <td>Temperature</td>
              <td>${temp_c}°C/${temp_f}°F</td>
              </tr>

              <tr>
              <td>Humity</td>
              <td>${humidity}%</td>
              </tr>
              </tbody>
              </table>
              
              </div>

              </div>
              <div class="card-footer">
              <small class="text-body-primary">Last updated : ${update}</small>
              </div>

              </div>
              </div>



              </div>
              </div>
              
                 `;
            }
          }
        })
        .catch((error2) => console.log(error2));
    })
    .catch((error) =>
      alert(`${cityName} is not found, Check the input format`, error)
    );

  document.getElementById("form").reset();
});
