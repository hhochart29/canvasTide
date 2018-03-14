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

  draw () {

    // Particule principale
    this.drawH(this.x, this.y, this.r)

    // Particule Secondaire
    let limitX = this.x + this.r + (this.r * H2o.random(1.2))
    let limitY = this.y + this.r + (this.r * H2o.random(1.2))
    this.drawO(limitX, limitY, this.r / 2)

  }

  drawH (xH, yH, rH) {
    this.ctx.beginPath()
    this.ctx.arc(xH, yH, rH, 0, 2 * Math.PI, false)
    this.ctx.fillStyle = '#ff0000'
    this.ctx.fill()
    this.ctx.closePath()
  }

  drawO (xO, yO, rO) {
    this.ctx.beginPath()
    this.ctx.arc(xO, yO, rO, 0, 2 * Math.PI, false)
    this.ctx.fillStyle = '#fff'
    this.ctx.fill()
    this.ctx.closePath()
  }

  static random (factor) {
    return Math.random() * factor
  }

}