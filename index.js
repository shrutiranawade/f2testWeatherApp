let currentCards =[];

let searchButton = document.querySelector(".searchbar_add_city_btn");

searchButton.addEventListener("click",()=> {
    const apiKey = "84b5a63c48f0d04e37cc06de732d0032";
    const inputCity  =  document.querySelector(".searchbar_input input")

  getWeatherDetails(apiKey,inputCity.value.trim());
 inputCity.value ="";
})

let error = document.querySelector(".error-message");
 async function getWeatherDetails(apiKey,cityname){
    try{
        
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiKey}&units=metric`;
        let response = await fetch(url);

        let data = await response.json();
        console.log(data);
  createCard(data);
  error.style.display = "none";
    }
    catch(data){
        error.style.display = "block";
    }

}
let cardContainer = document.querySelector(".container__weather-cards");
let weatherImage = document.querySelector(".weather-img");

function createCard(cityDetails){
    let maxTemp = cityDetails.main.temp_max;
    let mintemp = cityDetails.main.temp_min;
    let cityName = cityDetails.name;
    let temperature = Math.round(cityDetails.main.temp);
    let weatherType = cityDetails.weather[0].main;

    let weatherImageString;

    if(cityDetails.weather[0].main =="clouds"){
        weatherImageString = "./images/clouds.png";
    }
    if(cityDetails.weather[0].main == "Clear") 
    {
        weatherImageString = "./images/clouds.png";
    } 
    if(cityDetails.weather[0].main == "Haze") 
    {
        weatherImageString = "./images/wind.png";
    } 
    if(cityDetails.weather[0].main == "Rain") 
    {
        weatherImageString = "./images/rain.png";
    } 
    if(cityDetails.weather[0].main == "Drizzle") 
    {
        weatherImageString = "./images/drizzle.png";
    } 
    if (cityDetails.weather[0].main == "Mist") 
    {
        weatherImageString = "./images/mist.png";
    }

    let cardDiv = document.createElement("div");
    cardDiv.classList.add("single_cards");
    cardDiv.classList.add("animate__animated", "animate__fadeIn");

    let cardHtml = `
    <div class="single-card-top">
                        <div class="temp">${temperature}°</div>
                        <div class="weather-img">
                        <img src="${weatherImageString}" alt="cloudy" />
                        </div>
                    </div>
    <div class="single-card-bottom">
    <div class="card-bottom-left">
      <div class="atmospheric-pressure">
        <div class="atm-pre-high">H:${maxTemp}</div>
        <div class="atm-pre-low">L:${mintemp}</div>
      </div>
      <div class="city-name">${cityName}</div>
    </div>
    <div class="card-bottom-right">${weatherType}</div>
  </div>`

  cardDiv.innerHTML = cardHtml;

  currentCards.push({temperature,cardDiv});
  appendUI(currentCards);
}

function appendUI(currentCards){
    cardContainer.innerHTML="";
    currentCards.sort((a,b) => a.temperature - b.temperature);

    createCard.forEach((card) => {
        cardContainer.appendChild(card.cardDiv);
    });
}