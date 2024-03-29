const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
canvas.width = window.innerWidth
canvas.height = window.innerHeight

var frame = 0
function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.beginPath()
    ctx.arc(Math.cos(frame/171)*canvas.width/2 + canvas.width/2, Math.sin(frame/197)*canvas.height/2+canvas.height/2, canvas.height*0.4, 0, 2*Math.PI)
    ctx.closePath()
    ctx.fillStyle = "rgb(50, 50, 50)"
    ctx.fill()

    ctx.beginPath()
    ctx.arc(Math.cos(frame/147 + 2)*canvas.width/2 + canvas.width*0.7, Math.sin(frame/201 + 2)*canvas.height/2+canvas.height*0.3, canvas.height*0.4, 0, 2*Math.PI)
    ctx.closePath()
    ctx.fill()
    frame++
}
animate()