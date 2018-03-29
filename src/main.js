require('./styles/main.scss')
import Circle from './classes/circle'
import { getURL, random } from './classes/utils'
import dat from 'dat.gui'
import C2S from 'canvas2svg'

const weatherRequest = 'https://api.wunderground.com/api/f58c05f45013379c/conditions/lang:FR/q/France/Nantes.json'
const tideURL = 'https://weatherplotter.herokuapp.com/'
const weather = {}
let circle

// fetching both data (weather & tide)
const getWeather = async () => {
  return [await getURL(tideURL), await getURL(weatherRequest)]
}

const W = 1000
const H = 1000

const ctx = new C2S(W, H)

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
    inc: weather.temperature < 0 ? Math.abs(weather.temperature) : weather.temperature / Math.PI, // the number of line depends of the temperature. more line means cold weather
    angle: weather.humidity * 2, // The space in the middle of the drawing relies on humidty. wet or dry means empty middle. average means filled middle
    rayon: weather.tide * 100, // The tide defines the curve of the angles. curvy angles means high water level.
    rain: weather.rain < 0.5 ? 100 : 200
  }

  circle = new Circle(ctx, W, H, params.inc, params.angle, params.rayon, params.rain)
  circle.draw()

  const gui = new dat.GUI()
  gui.add(params, 'inc', 1, 80).onChange(newValue => {
    params.inc = newValue
    circle = null
    circle = new Circle(ctx, W, H, params.inc, params.angle, params.rayon, params.rain)
    circle.draw()
  })
  gui.add(params, 'angle', 0, 1000).onChange(newValue => {
    params.angle = newValue
    circle = null
    circle = new Circle(ctx, W, H, params.inc, params.angle, params.rayon, params.rain)
    circle.draw()
  })
  gui.add(params, 'rayon', 0, 720).onChange(newValue => {
    params.rayon = newValue
    circle = null
    circle = new Circle(ctx, W, H, params.inc, params.angle, params.rayon, params.rain)
    circle.draw()
  })
  gui.add(params, 'rain', 0, 720).onChange(newValue => {
    params.rain = newValue
    circle = null
    circle = new Circle(ctx, W, H, params.inc, params.angle, params.rayon, params.rain)
    circle.draw()
  })

  //If you really need to you can access the shadow inline SVG created by calling:
  const svg = ctx.getSvg()
  console.log(svg)
  document.querySelector('body').appendChild(svg)
})

document.querySelector('#export').addEventListener('click', () => {
  let svgExport = ctx.getSerializedSvg()
  let filename = 'canvas.svg'

  let pseudolink = document.createElement('a')
  pseudolink.setAttribute('href', 'data:image/svg+xml;charset=utf-8, ' + encodeURIComponent(svgExport))
  pseudolink.setAttribute('download', filename)
  pseudolink.style.display = 'none'
  document.body.appendChild(pseudolink)
  pseudolink.click()
  document.body.removeChild(pseudolink)
})

