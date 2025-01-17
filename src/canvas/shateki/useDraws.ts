import Drawer from './drawer'

export default (d: Drawer) => {
  const drawBackground = () => {
  }

  const drawBases = () => {
    d.ctx.fillStyle = '#8b0000'
    d.fillRect({ x: 50, y: 150 }, 1100, 30)
    d.fillRect({ x: 50, y: 350 }, 1100, 30)
  }

  return {
    drawBackground,
    drawBases
  }
}
