require('./styles/main.scss')
import H2o from './classes/h2o'
import Circle from './classes/circle'
import { getURL, random } from './classes/utils'
import dat from 'dat.gui'


const weatherRequest = 'http://api.wunderground.com/api/f58c05f45013379c/conditions/lang:FR/q/France/Nantes.json'
const weather = {}
let circle

getURL(weatherRequest)
  .then(response => {
    console.log(response)
    let h = response.current_observation.relative_humidity
    weather.wind = response.current_observation.wind_kph
    weather.temperature = response.current_observation.temp_c
    weather.rain = parseFloat(response.current_observation.precip_today_in)
    weather.humidity = parseFloat(h.substring(0, h.length - 1))
  })

const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

const W = 1000
const H = 1000

canvas.width = W
canvas.height = H

// const particles = []
// for (let i = 0; i < 120; i++) {
//   particles.push(new H2o(ctx, random(W), random(H), 10, 1.5))
// }

// particles.forEach(e => {
//   e.draw()
// })
this.inc = 20 //insere un facteur
this.angle = 20 // insere un facteur ici
this.r = this.angle  // insere un facteur
const params = {
  step: 20,
  angle: 20,
  rayon: 20
}

const gui = new dat.GUI()
gui.add(params, 'step', 1, 80).onChange(newValue => {
  params.step = newValue
  circle = null
  circle = new Circle(ctx, W, H, params.step, params.angle, params.rayon)
  circle.draw()
})
gui.add(params, 'angle', 0, 200).onChange(newValue => {
  params.angle = newValue
  circle = null
  circle = new Circle(ctx, W, H, params.step, params.angle, params.rayon)
  circle.draw()
})
gui.add(params, 'rayon', 0, 720).onChange(newValue => {
  params.rayon = newValue
  circle = null
  circle = new Circle(ctx, W, H, params.step, params.angle, params.rayon)
  circle.draw()
})


circle = new Circle(ctx, W, H, params.step, params.angle, params.rayon)
circle.draw()