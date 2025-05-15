import Konva from 'konva';

let canvas = document.querySelector("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
canvas.style.width = "100%"
canvas.style.height = "100%"

// Startläge puck
let xPos = Math.floor(Math.random() * (0.8 * canvas.width - 200) + 200)
let yPos = Math.floor(Math.random() * (0.8 * canvas.height - 200) + 200)

// Hastighet för puck
let speed = 5
let xSpeed = 0
let ySpeed = 0

// Sidlängd för puck
const size = 50

// Reagerar på tangenttryckningar
document.onkeydown = function (e) {
  console.log(e) //Inparametern e innehåller ett event-objekt med information om eventet.
  const key = e.key
  switch (key) {
    case "w":
      // w-tangent
      console.log("Going up")
      ySpeed = -speed
      break
    case "a":
      // a-tangent
      console.log("Going left")
      xSpeed = -speed
      break
    case "s":
      // s-tangent
      console.log("Going down")
      ySpeed = speed
      break
    case "d":
      // d-tangent
      console.log("Going right")
      xSpeed = speed
      break
    case " ": // Mellanslag
      console.log(`Mellanslag`)
      break
    default: // alla övriga tangenter
      console.log("Tangenten används inte")
  }
}

// När en tangent släpps
document.onkeyup = function (e) {
  const key = e.key
  switch (key) {
    case "w":
      console.log("Stop up")
      ySpeed = 0
      break
    case "a":
      console.log("Stop left")
      xSpeed = 0
      break
    case "s":
      console.log("Stop down")
      ySpeed = 0
      break
    case "d":
      console.log("Stop right")
      xSpeed = 0
      break
  }
}

let ctx = canvas.getContext("2d")

// fallande föremål
fallX = Math.floor(Math.random() * (0.8 * canvas.width - 200) + 200)
fallY = 0
fallYSpeed = 10

// Animeringsloopen
function animate() {
  // Rensar gammalt visuellt innehåll
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Sätt nya läget
  xPos += xSpeed
  yPos += ySpeed

  // Den röda kvadraten ritas
  const stage = new Konva.Stage({
    container: 'container',
    width: window.innerWidth,
    height: window.innerHeight,
  });
  
  const layer = new Konva.Layer();
  stage.add(layer);
  
  const spriteImage = new Image();
  spriteImage.src = 'path/to/sprite.png';

  // uppdatera fallande föremåls position
  fallY += fallYSpeed
  // återställ när fallande föremål nått botten
  if (fallY > canvas.height) {
    fallY = 0
    fallX = Math.floor(Math.random() * (0.8 * canvas.width - 200) + 200)
  }
  // rita fallande föremål
  ctx.fillStyle = "blue"
  ctx.fillRect(fallX, fallY, size, size)  

  window.requestAnimationFrame(animate)
}

window.requestAnimationFrame(animate)