require('./styles/main.scss')
import H2o from './classes/h2o'
import Circle from './classes/circle'
import Request from './classes/request'

const weatherRequest = 'http://api.wunderground.com/api/f58c05f45013379c/conditions/lang:FR/q/France/Nantes.json'
const weather = {}

Request.getURL(weatherRequest)
  .then(response => {
    let h = response.current_observation.relative_humidity
    weather.wind = response.current_observation.wind_kph
    weather.temperature = response.current_observation.temp_c
    weather.rain = parseFloat(response.current_observation.precip_today_in)
    weather.humidity = parseFloat(h.substring(0, h.length - 1))
  })

console.log(weather)

const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

const W = 1000
const H = 800

canvas.width = W
canvas.height = H

const random = (factor) => {
  return Math.random() * factor
}

// const particles = []
// for (let i = 0; i < 120; i++) {
//   particles.push(new H2o(ctx, H2o.random(W), H2o.random(H), 10, 1.5))
// }

// particles.forEach(e => {
//   e.draw()
// })

const circle = new Circle(ctx)

circle.draw()