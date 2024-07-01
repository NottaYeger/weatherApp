const apiKey = '70f8f34a169ee4151ce0da687735d2f3';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const searchBox = document.getElementById('user-input')
const searchBtn = document.querySelector('button')
const weatherIcon = document.querySelector('.weather-icon');

/* const press = document.querySelector('button').addEventListener('click', ()=>{
  const cityName = document.getElementById('user-input').value;
  checkWeather(cityName);
}); */

searchBtn.addEventListener('click', ()=>{
  checkWeather(searchBox.value);
  document.querySelector('.card').style.animation = "unroll 0.5s ease-in-out";
});

searchBox.addEventListener('keypress',(e)=>{
  if(e.key === 'Enter'){
    checkWeather(searchBox.value);
    document.querySelector('.card').style.animation = "unroll 0.5s ease-in-out";
  }
});


async function checkWeather(city){
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404){
    document.querySelector('.error').style.display = 'block';
    document.querySelector('.weather').style.display = 'none';    
    document.querySelector('.card').style.animation = "roll 0.5s ease-in-out";
  } else {
    const data = await response.json();

    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + " km/h";
  
    switch(data.weather[0].main){
      case 'Clear': weatherIcon.src='images/clear.png';
      break;
      case 'Clouds': weatherIcon.src='images/clouds.png';
      break;
      case 'Drizzle': weatherIcon.src='images/drizzle.png';
      break;
      case 'Mist': weatherIcon.src='images/mist.png';
      break;
      case 'Rain': weatherIcon.src='images/rain.png';
      break;
      case 'Snow': weatherIcon.src='images/snow.png';
      break;
    }
  
    document.querySelector('.weather').style.display = 'block';
    document.querySelector('.error').style.display = 'none';
  }
};