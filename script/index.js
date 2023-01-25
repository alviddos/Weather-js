const API = 'https://api.openweathermap.org/data/2.5/weather?q='
const apiKey = '&appid=6690f52bf0107a9b01e305d18236ad67'
const form = document.querySelector('form')
const output = document.querySelector('.output')

const input = document.querySelector('#inp')
const dropCity = document.querySelector('#dropCity')
const dropClouds = document.querySelector('#dropClouds')
const dropTemp = document.querySelector('#dropTemp')



const getWeather = async () => {
    const url = API + input.value + apiKey
    const req = await fetch(url)
    const res = await req.json()
    renderWeather(res);
    getMap(res.coord)
    input.value = ''
}

const renderWeather = (data) => {
    console.log(data);

    dropCity.innerHTML = ''
    dropClouds.innerHTML = ''
    dropTemp.innerHTML = ''
    const cityName = document.createElement('h1')
    cityName.textContent = data.name
    const wind = document.createElement('h2')
    wind.textContent = `Speed: ${data.wind.speed}  Deg:${data.wind.deg}  Gust:${data.wind.gust}`
    const clouds = document.createElement('h2')
    clouds.textContent = `Clouds: ${data.clouds.all}`
    const main = document.createElement('h2')
    main.textContent = `Temp: ${Math.round(data.main.temp - 273.15)} F°`
    const Weather = document.createElement('h2')
    Weather.classList.add('weather1')
    Weather.textContent = `Weather: ${data.weather[0].main}`

    dropCity.append(cityName)
    dropClouds.append(clouds, Weather)
    dropTemp.append(main, wind)
    // info.append(cityName, main, wind, clouds, Weather)

}

const getMap = ({ lat, lon }) => {
    let map = document.createElement('div')
    map.id = 'map'

    DG.then(function () {
        map = DG.map('map', {
            center: [lat, lon],
            zoom: 13
        });
        DG.marker([lat, lon]).addTo(map).bindPopup('Вы кликнули по мне!');
    });
    output.append(map)
}



form.addEventListener('submit', (e) => {
    e.preventDefault()
    getWeather()
})
