// تابع فرمت تاریخ
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();
  if (minutes < 10) minutes = `0${minutes}`;
  if (hours < 10) hours = `0${hours}`;
  let days = [
    "Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"
  ];
  return `${days[day]} ${hours}:${minutes}`;
}

// تابع برای نمایش دما، شهر، توضیح هوا، رطوبت، باد و آیکون
function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let cityElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector(".temperature-icon"); // تغییر: span موجود در HTML

  let temperature = Math.round(response.data.temperature.current);
  let city = response.data.city;
  let description = response.data.condition.description;
  let humidity = response.data.temperature.humidity;
  let wind = response.data.wind.speed;
  let iconUrl = response.data.condition.icon;

  // نمایش مقادیر در صفحه
  temperatureElement.innerHTML = temperature;
  cityElement.innerHTML = city;
  descriptionElement.innerHTML = description;
  humidityElement.innerHTML = `${humidity}%`;
  windElement.innerHTML = `${wind} km/h`;

  // نمایش آیکون آب و هوا به صورت ایموجی اگر span موجود است
  if (iconElement) {
    // تبدیل آدرس آیکون به emoji ساده
    if (description.toLowerCase().includes("rain")) {
      iconElement.textContent = "🌧️";
    } else if (description.toLowerCase().includes("cloud")) {
      iconElement.textContent = "⛅";
    } else if (description.toLowerCase().includes("sun") || description.toLowerCase().includes("clear")) {
      iconElement.textContent = "☀️";
    } else if (description.toLowerCase().includes("snow")) {
      iconElement.textContent = "❄️";
    } else {
      iconElement.textContent = "🌤️"; // پیش‌فرض
    }
  }
}

// تابع جستجوی شهر و گرفتن اطلاعات از API با axios
function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl)
    .then(displayTemperature)
    .catch((error) => {
      alert("City not found or API error. Please try again.");
      console.error(error);
    });
}

// اضافه کردن event listener به فرم جستجو
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

// نمایش تاریخ فعلی
let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();
currentDateElement.innerHTML = formatDate(currentDate);

// نمایش وضعیت آب و هوا پیش‌فرض برای Paris هنگام لود صفحه
axios
  .get(`https://api.shecodes.io/weather/v1/current?query=Paris&key=b2a5adcct04b33178913oc335f405433&units=metric`)
  .then(displayTemperature)
  .catch((error) => console.error(error));
