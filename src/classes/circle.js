export default class Circle {

  constructor (ctx, W, H) {
    this.ctx = ctx
    this.W = W
    this.H = H
    this.x = this.W / 2
    this.y = this.H / 2
    this.inc = 10
  }

  draw () {
    this.ctx.beginPath()
    this.ctx.strokeStyle = '#fff'
    this.ctx.strokeWidth = 2

    let startX = this.x
    let startY = this.y
    let direction

    for (let i = 0; i < 105; i++) {
      if (i % 2 === 0) {
        direction = 1
      } else {
        direction = -1
      }

      let inc = this.inc * i

      console.log(i, direction)
      this.drawLine(startX, startY, inc * direction, true)
      startX = startX + inc * direction
      this.drawLine(startX, startY, inc * direction, false)
      startY = startY + inc * direction

    }

    this.ctx.stroke()
    this.ctx.closePath()
  }

  drawLine (x, y, inc, horizontal) {
    this.ctx.moveTo(x, y)
    horizontal === true ? this.ctx.lineTo(x + inc, y) : this.ctx.lineTo(x, y + inc)
  }

}