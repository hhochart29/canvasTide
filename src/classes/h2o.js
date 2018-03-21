export default class H2o {

  /**
   *
   * @param ctx
   * @param {Number} x - position en x de la particule principale
   * @param {Number} y - position en y de la particule principale
   * @param {Number} r - rayon de la particule principale
   * @param {Number} space - espace entre les atomes
   */
  constructor (ctx, x, y, r, space) {
    this.ctx = ctx
    this.x = x
    this.y = y
    this.r = r
    this.space = space
  }

  /**
   * Draw an H2O molecule
   *
   */
  draw () {

    // H atom
    this.drawH(this.x, this.y, this.r)

    // O atom
    let decider = Math.floor(Math.random() * 2) === 0 ? -1 : 1
    let decider2 = Math.floor(Math.random() * 2) === 0 ? -1 : 1

    let X1 = this.x + this.r * decider + this.r * H2o.random(this.space) * decider
    let X2 = this.x - this.r * decider2 - this.r * H2o.random(this.space) * decider2

    let Y1 = this.y + this.r * -decider2 + this.r * H2o.random(this.space) * -decider2
    let Y2 = this.y - this.r * decider - this.r * H2o.random(this.space) * decider

    this.drawO(X1, Y1, this.r / 2, decider, decider2)
    this.drawO(X2, Y2, this.r / 2, -decider2, decider)
  }

  /**
   *
   * @param xH
   * @param yH
   * @param rH
   */
  drawH (xH, yH, rH) {
    this.ctx.beginPath()
    this.ctx.arc(xH, yH, rH, 0, 2 * Math.PI, false)
    this.ctx.fillStyle = '#ff0000'
    this.ctx.fill()
    this.ctx.closePath()
  }

  /**
   *
   * @param xO
   * @param yO
   * @param rO
   * @param decider
   * @param decider2
   */
  drawO (xO, yO, rO, decider, decider2) {
    this.ctx.beginPath()
    this.ctx.arc(xO, yO, rO, 0, 2 * Math.PI, false)
    this.ctx.fillStyle = '#fff'
    this.ctx.fill()
    this.ctx.closePath()

    // drawing line from O to H particle
    this.ctx.beginPath()
    this.ctx.moveTo(this.x + (rO * decider), this.y + (rO * -decider2))
    this.ctx.lineTo(xO, yO)
    this.ctx.lineWidth = 3
    this.ctx.strokeStyle = '#fff'
    this.ctx.stroke()
  }

  static random (factor) {
    return Math.random() * factor
  }

}