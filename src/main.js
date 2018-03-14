require('./styles/main.scss')
import H2o from './classes/h2o'

const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

const W = 1000
const H = 800

canvas.width = W
canvas.height = H

const random = (factor) => {
  return Math.random() * factor
}

let particle = new H2o(ctx, W / 2, H / 2, 50, 50)
particle.draw()