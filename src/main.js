require('./styles/main.scss')
import H2o from './classes/h2o'
import Circle from './classes/circle'
import { getURL, random } from './classes/utils'
import dat from 'dat.gui'

const weatherRequest = 'https://api.wunderground.com/api/f58c05f45013379c/conditions/lang:FR/q/France/Nantes.json'
const tideURL = 'http://localhost:3000/'
const weather = {}
let circle

const getWeather = async () => {
  return [await getURL(tideURL), await getURL(weatherRequest)]
}

const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

const W = 900
const H = 900

canvas.width = W
canvas.height = H

// const particles = []
// for (let i = 0; i < 120; i++) {
//   particles.push(new H2o(ctx, random(W), random(H), 10, 1.5))
// }
//
// particles.forEach(e => {
//   e.draw()
// })

// inc entre 20 et 50
// angle entre -800 et 800
// rayon entre 720 et 0

const params = {
  inc: 20,
  angle: 20,
  rayon: 20
}

const a = getWeather()
a.then(response => {
  weather.tide = response[0].result
  let h = response[1].current_observation.relative_humidity
  weather.wind = response[1].current_observation.wind_kph
  weather.temperature = response[1].current_observation.temp_c
  weather.rain = parseFloat(response[1].current_observation.precip_today_in)
  weather.humidity = parseFloat(h.substring(0, h.length - 1))
  console.log(weather)

  circle = new Circle(ctx, W, H, params.inc, params.angle, params.rayon)
  circle.draw()
})

const gui = new dat.GUI()
gui.add(params, 'inc', 1, 80).onChange(newValue => {
  params.inc = newValue
  circle = null
  circle = new Circle(ctx, W, H, params.inc, params.angle, params.rayon)
  circle.draw()
})
gui.add(params, 'angle', -1000, 1000).onChange(newValue => {
  params.angle = newValue
  circle = null
  circle = new Circle(ctx, W, H, params.inc, params.angle, params.rayon)
  circle.draw()
})
gui.add(params, 'rayon', 0, 720).onChange(newValue => {
  params.rayon = newValue
  circle = null
  circle = new Circle(ctx, W, H, params.inc, params.angle, params.rayon)
  circle.draw()
})
