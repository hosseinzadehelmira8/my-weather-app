// تابع برای نمایش دما و شهر
function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let cityElement = document.querySelector("#current-city");

  // دما و شهر از response API
  let temperature = Math.round(response.data.temperature.current);
  let city = response.data.city;

  // نمایش در صفحه
  temperatureElement.innerHTML = temperature;
  cityElement.innerHTML = city;
}

// تابع برای ارسال درخواست API با axios
function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

// تابع برای فرمت تاریخ
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) minutes = `0${minutes}`;
  if (hours < 10) hours = `0${hours}`;

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

// اضافه کردن event listener به فرم
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

// نمایش تاریخ فعلی
let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();
currentDateElement.innerHTML = formatDate(currentDate);
