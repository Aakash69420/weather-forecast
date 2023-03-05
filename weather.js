const api = {
  key: "4d570ebc6b10980b1cabb265d70ee4d1",
  base: "https://api.openweathermap.org/data/2.5/"
 }

 const searchBox = document.querySelector('.search-box');
 const searchBtn = document.querySelector('.search-btn');
 searchBtn.addEventListener('click', () => {
   const query = searchBox.value;
   if (query) {
     getResults(query);
   }
 });

 searchBox.addEventListener('keydown', (e) => {
if (e.keyCode === 13) {
 e.preventDefault();
 const query = searchBox.value;
 if (query) {
   getResults(query);
 }
}
});


 function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
 }

 function displayResults(weather) {
  let city = document.querySelector('.city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector('.weather');
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerHTML = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;

  // Animation and Styling
  const appWrap = document.querySelector('.app-wrap');
  appWrap.classList.add('fade-in');

  const current = document.querySelector('.current');
  current.classList.add('fade-in');

  const location = document.querySelector('.location');
  location.classList.add('fade-in');
 }

 function dateBuilder(d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
 }