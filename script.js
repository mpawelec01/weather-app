const input = document.querySelector("input");
const button = document.querySelector("button");
const cityName = document.querySelector(".city-name");
const warning = document.querySelector(".warning");
const photo = document.querySelector(".photo");
const weather = document.querySelector(".weather");
const temperature = document.querySelector(".temperature");
const windSpeed = document.querySelector(".wind-speed");

const API_LINK = "https://api.openweathermap.org/data/2.5/weather?q=";
const API_KEY = "&appid=50ab73ec03cf3006cd67031558793cce";
const API_UNITS = "&units=metric";

const dateTag = document.querySelector(".date-block");

const date = new Date();
const dayValue = date.getDate();
const array = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const monthValue = array[date.getMonth()];
const yearValue = date.getFullYear();

dateTag.textContent = dayValue + " " + monthValue + ", " + yearValue;

const getWeather = () => {
  const city = input.value;
  const URL = API_LINK + city + API_KEY + API_UNITS;

  axios
    .get(URL)
    .then((res) => {
      console.log(res.data);
      const temp = res.data.main.temp;
      const wind = res.data.wind.speed;
      const status = Object.assign({}, ...res.data.weather);

      cityName.textContent = res.data.name;
      temperature.textContent = Math.floor(temp) + "℃";
      windSpeed.textContent = wind + "m/s";
      weather.textContent = status.main;

      warning.textContent = "";
      input.value = "";

      if (status.id >= 200 && status.id < 300) {
        photo.setAttribute(
          "src",
          "https://openweathermap.org/img/wn/11d@2x.png"
        );
      } else if (status.id >= 300 && status.id < 400) {
        photo.setAttribute(
          "src",
          "https://openweathermap.org/img/wn/09d@2x.png"
        );
      } else if (status.id >= 500 && status.id < 600) {
        photo.setAttribute(
          "src",
          "https://openweathermap.org/img/wn/10d@2x.png"
        );
      } else if (status.id >= 600 && status.id < 700) {
        photo.setAttribute(
          "src",
          "https://openweathermap.org/img/wn/13d@2x.png"
        );
      } else if (status.id >= 700 && status.id < 800) {
        photo.setAttribute(
          "src",
          "https://openweathermap.org/img/wn/50d@2x.png"
        );
      } else if (status.id == 800) {
        photo.setAttribute(
          "src",
          "https://openweathermap.org/img/wn/01d@2x.png"
        );
      } else if (status.id >= 800 && status.id < 900) {
        photo.setAttribute(
          "src",
          "https://openweathermap.org/img/wn/02d@2x.png"
        );
      }
    })
    .catch(() => (warning.textContent = "Enter the correct city name!"));
};

const enterCheck = (e) => {
  if (e.key === "Enter") {
    getWeather();
  }
};

input.addEventListener("keyup", enterCheck);
button.addEventListener("click", getWeather);
