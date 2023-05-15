
const api = {
  endpoint:  "https://api.openweathermap.org/data/2.5/",
  key: "5aba262d0a344571d86332b66e88ec9f"
}

const keyGeo = '7ae6d72ee0af40f284ebb9ea1b5f1bdd';
async function getIP(){
    const res = await fetch(`https://ipgeolocation.abstractapi.com/v1/?api_key=${keyGeo}`);
    const result = await res.json();
    getInfo(result.city);
}

getIP();


const input = document.querySelector("#input"); // доступ к полю ввода
input.addEventListener("keypress", enter); // подслушка и запуск функции

function enter(e) {
  if (e.key === "Enter") { // если событие нажатие enter (13 это код клавиши)
    getInfo(input.value); //вызываем функцию поиск когда есть доступ к тому, что пишет пользователь
  }
}

async function getInfo (data) { // параметр data нужен для сохранения и переноса информации
const res = await fetch(`${api.endpoint}weather?q=${data}&lang=ru&units=metric&appID=${api.key}`); // результат это запрос на сторонний сервер и данным который ввел пользователь система , мы выбираем метрическую и ключ. все это копируется заучивать не надо
const result = await res.json();
displayResult(result); // функция показать результат в нашем приложении
input.value = ""; // очищает поле ввода после получения данных о погоде
}



function displayResult(result) { // описание ф-ции
    let city = document.querySelector("#city"); // переменная сити с доступом в графу в html
    city.textContent = `${result.name}`; // отобразить город ( если нужно и страну, то через запятую: ${result.sys.country} )
    city.style = "display:block";
    
    getOurDate(); // вызов функции получить Дату

    let temperature = document.querySelector("#temperature"); // доступ к температуре
    temperature.innerHTML = `${Math.round(result.main.temp)}<span>°</span>`; // отобразить температуру (смотрим в console.log в общем результате как эти поля называются в этом приложении по тому же принципу что и изображение и советы)

    let feelsLike = document.querySelector("#feelsLike"); // доступ к температу по ощущениям
    feelsLike.innerHTML = "ощущается как: " + `${Math.round(result.main.feels_like)}<span>°</span>`; // отобразить тем-ру по ощущениям

    let conditions = document.querySelector("#conditions"); // доступ к графе состояние
    conditions.textContent = `${result.weather[0].description}`; // отобразить , это например, ясно, облачно и тд
/* иконки сайта openweathermap
    let icon = document.querySelector('#icon'); // доступ к изображению
    icon.src = "https://openweathermap.org/img/w/" + `${result.weather[0].icon}`+ ".png"; // ссылка на доступ к иконкам сайта openweather и подставление в свой проект
*/

    let humidity = document.querySelector('#humidity'); //доступ к графе влажность
    humidity.innerHTML = "Влажность: " + `${result.main.humidity}<span> %</span>`;

    let wind = document.querySelector('#wind'); //доступ к графе ветер
    wind.innerHTML = "Ветер: " + `${Math.round(result.wind.speed)}<span> м/с</span>`;


    let pressure = document.querySelector('#pressure'); // доступ к графе давление
    pressure.innerHTML = "Давление: " +`${Math.round((result.main.pressure)*0.750064)}<span> мм. рт. ст. </span>`; // получение данных о давлении, перевод из гектопаскалей в мм рт ст и вывод результата пользователю
    

// обычная иконка
    let myIcon = document.querySelector('.weather-icon'); // доступ к иконке
    myIcon.innerHTML = `<img src="icons_weather/${result.weather[0].icon}.png"/>`; // отображение своей иконки

/*
// анимированная иконка
    let myIcon = document.querySelector('.weather-icon'); // доступ к иконке
    myIcon.innerHTML = `<img src="icons_animated/${result.weather[0].icon}.svg"/>`; // отображение своей иконки
*/
    let variation = document.querySelector("#variation"); // доступ к минимальной и максимальной температуре
    variation.innerHTML = `${Math.round(result.main.temp_max)}<span>°</span>` + " " + "/" + " " + `${Math.round(result.main.temp_min)}<span>°</span>`; // отображение, значок градуса(это тег, поэтому innerHTML) добавляем сами и округление

}


function getOurDate() { // описание функции получить Дату
    const myDate = new Date(); // в константе указываем сегодняшнюю дату
    const days = ["Вс.", "Пн.", "Вт.", "Ср.", "Чт.", "Пт.", "Сб."]; // константа массив с днями, пример взяли готовой конструкции JS с сайта https://www.w3schools.com/
    const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]; // константа массив с месяцами
  
    let day = days[myDate.getDay()]; // получаем текущий день недели из массива

    let todayDate = myDate.getDate(); // получаем текущее число

    let month = months[myDate.getMonth()]; // получаем текущий месяц из массива

    let year = myDate.getFullYear(); // готовый метод взяли с сайта https://www.w3schools.com/

    let showDate = document.querySelector("#date"); // показать дату доступ к дате в html
    showDate.textContent = `${day}` + "," + " " + `${todayDate}` + " " + `${month}` + " " + `${year}` //показываем дату пользователю

    
}



