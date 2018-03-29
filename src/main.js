require('./styles/main.scss')
import H2o from './classes/h2o'
import Circle from './classes/circle'
import { getURL, random } from './classes/utils'
import dat from 'dat.gui'
import C2S from 'canvas2svg'

const weatherRequest = 'https://api.wunderground.com/api/f58c05f45013379c/conditions/lang:FR/q/France/Nantes.json'
const tideURL = 'http://localhost:3000/'
const weather = {}
let circle

// fetching both data (weather & tide)
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

const a = getWeather()
a.then(response => {
  // filling the object with the data fetched
  weather.tide = response[0].result
  let h = response[1].current_observation.relative_humidity
  weather.wind = response[1].current_observation.wind_kph
  weather.temperature = response[1].current_observation.temp_c
  weather.rain = parseFloat(response[1].current_observation.precip_today_in)
  weather.humidity = parseFloat(h.substring(0, h.length - 1))
  console.log(weather)

  const params = {
    inc: weather.temperature + 10, // the number of line depends of the temperature. more line means cold weather
    angle: weather.humidity * 10, // The space in the middle of the drawing relies on humidty. wet or dry means empty middle. average means filled middle
    rayon: weather.tide * 100 // The tide defines the curve of the angles. curvy angles means high water level.
  }

  circle = new Circle(ctx, W, H, params.inc, params.angle, params.rayon)
  circle.draw()

  const gui = new dat.GUI()
  gui.add(params, 'inc', 1, 80).onChange(newValue => {
    params.inc = newValue
    circle = null
    circle = new Circle(ctx, W, H, params.inc, params.angle, params.rayon)
    circle.draw()
  })
  gui.add(params, 'angle', 0, 1000).onChange(newValue => {
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

  const ctxsvg = new C2S(500,500);

  //draw your canvas like you would normally
  ctxsvg.fillStyle="red";
  ctxsvg.fillRect(100,100,100,100);
  //etc...

  //serialize your SVG
  const mySerializedSVG = ctxsvg.getSerializedSvg(); //true here, if you need to convert named to numbered entities.

  //If you really need to you can access the shadow inline SVG created by calling:
  const svg = ctxsvg.getSvg();
  console.log(svg)
})

