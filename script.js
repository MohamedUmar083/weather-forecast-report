/* Getting Elements by its id  */

let check = document.getElementById("check");
let div = document.getElementById("show");

/* Adding Event Listener for button check */

check.addEventListener("click", () => {
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
      let temp = data.current.temp_c;
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
              <h2 class="text-center">${name}'s Weather Status</h2>
              <div class="container body">
              <div class="row">
              <div class="col-md-6 offset-md-3">
              <div class="card h-100">
              <div class="card-header">
              <h5 class="card-title text-center">${name} </h5>
              </div>  
              <div class="img-box">
              <img src="${rcdata[i].flags.png}" class="card-img-top" alt="${rcdata[i].name.common}" />
              </div>
              <div class ="card-body">
              
              <div class="card-text text-center">Condition : ${condition}</div>
              <div class="card-text text-center">Temperature : ${temp}°c </div>
              <div class="card-text text-center">Humidity : ${humidity}% </div>


              



              <div class="table-responsive"> 
              <table class="table custom-table" >
              <thead>
              <tr>
              <th>Region</th> 
              <th>Capital</th>
              <th>Location</th>

              </thead>
              <tbody> 
              <tr>
              <td>${region}</td>
              <td>${rcdata[i].capital}</td>
              <td>${rcdata[i].name.common}, ${rcdata[i].cca2}</td>
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
    .catch((error) => console.log(error));

  document.getElementById("form").reset();
});

/* other design for table content */

/* 

  <div class="table-responsive"> 
  <table class="table custom-table" >
  <thead>
  <tr>
  <th>Condition</th> 
  <th>Temperature</th>
  <th>Humidity</th>

  </thead>
  <tbody> 
  <tr>
  <td>${condition}</td>
  <td>${temp}°c </td>
  <td>${humidity}%</td>
  </tr>
  </tbody>
  </table></div> 
*/
