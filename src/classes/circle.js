export default class Circle {

  /**
   * @param ctx - Context of canvas
   * @param {Number} W - Width of canvas
   * @param {Number} H - Height of canvas
   * @param {Number} inc - longeur d'une ligne
   * @param {Number} angle - amplitude de l'angle
   * @param {Number} rayon - rayon de l'angle
   */
  constructor (ctx, W, H, inc, angle, rayon) {
    this.ctx = ctx
    this.W = W
    this.H = H
    this.x = this.W / 2
    this.y = this.H / 2
    this.inc = inc //insere un facteur
    this.angle = angle // insere un facteur ici
    this.r = rayon  // insere un facteurs
  }

  draw () {
    this.ctx.clearRect(0, 0, this.W, this.H);
    this.ctx.fillRect(0,0,this.W,this.H)
    this.ctx.fillStyle = '#000'

    this.ctx.beginPath()
    this.ctx.strokeWidth = 1
    this.ctx.strokeStyle = '#fff'

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

  /**
   *
   * @param {Number} x
   * @param {Number} y
   * @param {Number} inc
   * @param {Number} horizontal
   * @param {Number} angle
   */
  drawLine (x, y, inc, horizontal, angle) {
    if (horizontal === true) {
      this.ctx.moveTo(x + angle, y)
      // this.ctx.lineTo(x + inc - angle * 2, y)

      this.ctx.arcTo(x + inc, y, x + inc, y + inc, this.r)
    } else {
      this.ctx.moveTo(x, y + angle)
      // this.ctx.lineTo(x, y + inc - angle * 2)

      this.ctx.arcTo(x, y + inc, x - inc, y + inc, this.r)

    }
  }


}