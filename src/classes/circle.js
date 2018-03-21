export default class Circle {

  constructor (ctx) {
    this.ctx = ctx
  }

  draw () {
    this.ctx.beginPath()
    for(let i = 0; i < 15; i++) {
      this.ctx.moveTo()
      this.ctx.strokeStyle = '#fff'
      this.ctx.strokeWidth = 10
      this.ctx.lineTo(150 + i * 2, 150);
    }
    this.ctx.closePath()
    this.ctx.stroke()
  }

}