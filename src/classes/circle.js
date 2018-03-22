export default class Circle {

  /**
   *
   * @param ctx - Context of canvas
   * @param {Number} W - Width of canvas
   * @param {Number} H - Height of canvas
   * @param {Number} inc - longeur d'une ligne
   * @param {Number} angle - rayon de l'angle
   */
  constructor (ctx, W, H, inc, angle, rayon) {
    this.ctx = ctx
    this.W = W
    this.H = H
    this.x = this.W / 2
    this.y = this.H / 2
    this.inc = inc //insere un facteur
    this.angle = angle // insere un facteur ici
    this.r = rayon  // insere un facteur
  }

  draw () {
    this.ctx.clearRect(0, 0, this.W, this.H);
    this.ctx.beginPath()
    this.ctx.strokeStyle = '#fff'
    this.ctx.strokeWidth = 2

    let startX = this.x
    let startY = this.y
    let direction

    for (let i = 1; i < 105; i++) {
      if (i % 2 === 0) {
        direction = 1
        this.angle = Math.abs(this.angle)
      } else {
        direction = -1
        this.angle = -this.angle
      }

      let inc = this.inc * i

      this.drawLine(startX, startY, inc * direction, true, this.angle)
      startX = startX + inc * direction
      this.drawLine(startX, startY, inc * direction, false, this.angle)
      startY = startY + inc * direction
    }

    this.ctx.stroke()
    this.ctx.closePath()
  }

  drawLine (x, y, inc, horizontal, angle) {
    if (horizontal === true) {
      this.ctx.moveTo(x + angle, y)
      this.ctx.lineTo(x + inc - angle * 2, y)

      this.ctx.arcTo(x + inc, y, x + inc, y + inc, this.r)
    } else {
      this.ctx.moveTo(x, y + angle)
      this.ctx.lineTo(x, y + inc - angle * 2)

      this.ctx.arcTo(x, y + inc, x - inc, y + inc, this.r)

    }
  }

}