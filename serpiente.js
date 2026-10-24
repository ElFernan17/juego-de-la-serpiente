const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");
const tamaño_celda = 25
const serpiente = [

  { x: 10, y: 10 },
  { x: 10, y: 9 },
  { x: 9, y: 9 },
  { x: 8, y: 9 }

]

let intervaloSerpiente
let direccionActual
let puntaje = 0

let comida = {
  x: 0,
  y: 0
}

dibujarTodo();

function limpiarCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarTodo() {
  limpiarCanvas();
  dibujarTablero();

  pintarParte(comida.x, comida.y, "#ff8ff6");
  pintarSerpiente();
}

function dibujarTablero() {

  for (let i = 0; i < canvas.height; i += tamaño_celda) {

    ctx.strokeStyle = "#1b0323"
    ctx.beginPath()
    ctx.moveTo(i, 0)
    ctx.lineTo(i, canvas.height)
    ctx.stroke()

  }

  for (let i = 0; i < canvas.width; i += tamaño_celda) {

    ctx.strokeStyle = "#1b0323"
    ctx.beginPath()
    ctx.moveTo(0, i)
    ctx.lineTo(canvas.width, i)
    ctx.stroke()

  }
}

function pintarParte(lineaX, lineaY, color) {
  let posicionX = lineaX * tamaño_celda
  let posicionY = lineaY * tamaño_celda

  ctx.fillStyle = color
  ctx.fillRect(posicionX, posicionY, tamaño_celda, tamaño_celda);

  ctx.strokeStyle = "#ec5dff"
  ctx.strokeRect(posicionX, posicionY, tamaño_celda, tamaño_celda)

}

function pintarSerpiente() {
  let objetoTemp
  let color

  for (let i = 0; i < serpiente.length; i++) {
    objetoTemp = serpiente[i]

    if (i === 0) {
      color = "#650f51"
    } else {
      color = "#7b00ff"
    }

    pintarParte(objetoTemp.x, objetoTemp.y, color)
  }
}

function moverDerecha() {
  let cabezaActual = serpiente[0]

  let nuevaCabeza = {
    x: cabezaActual.x + 1,
    y: cabezaActual.y
  }
  serpiente.unshift(nuevaCabeza)

  dibujarTodo();
}

function moverIzquierda() {
  let cabezaActual = serpiente[0]

  let nuevaCabeza = {
    x: cabezaActual.x - 1,
    y: cabezaActual.y
  }
  serpiente.unshift(nuevaCabeza)

  dibujarTodo();
}

function moverArriba() {
  let cabezaActual = serpiente[0]

  let nuevaCabeza = {
    x: cabezaActual.x,
    y: cabezaActual.y - 1
  }
  serpiente.unshift(nuevaCabeza)

  dibujarTodo();
}

function moverAbajo() {
  let cabezaActual = serpiente[0]

  let nuevaCabeza = {
    x: cabezaActual.x,
    y: cabezaActual.y + 1
  }
  serpiente.unshift(nuevaCabeza)

  dibujarTodo();
}

function cambiarDireccion(direccion) {
  if (juegoTerminado || esRetroceso(direccion)) return
  if (direccion == "derecha") {
    direccionActual = "derecha"
  } else if (direccion == "izquierda") {
    direccionActual = "izquierda"
  } else if (direccion == "arriba") {
    direccionActual = "arriba"
  } else if (direccion == "abajo") {
    direccionActual = "abajo"
  }
}

function iniciarJuego() {

  clearInterval(intervaloSerpiente)

  pintarComida();

  intervaloSerpiente = setInterval(moverSerpiente, velocidad)

}

function moverSerpiente() {
  console.log("moviendo")

  if (juegoTerminado || !direccionActual) return
  if (revisarChoque()) return

  if (direccionActual == "derecha") {
    moverDerecha();
  } else if (direccionActual == "izquierda") {
    moverIzquierda();
  } else if (direccionActual == "arriba") {
    moverArriba();
  } else if (direccionActual == "abajo") {
    moverAbajo();
  }

  if (atraparComida()) {
    puntaje += 1
    document.getElementById("puntaje").textContent = puntaje
    pintarComida()        
  } else {
    serpiente.pop()       
  }

  dibujarTodo();

  pintarSerpiente();
}

function pausarJuego() {
  clearInterval(intervaloSerpiente)
}

function pintarComida() {

  let aleatorioComidaX = Math.floor(Math.random() * 24);
  let aleatorioComidaY = Math.floor(Math.random() * 24);

  comida.x = aleatorioComidaX
  comida.y = aleatorioComidaY

  pintarParte(comida.x, comida.y, "#ff8ff6");
}

function atraparComida() {
  if (serpiente[0].x == comida.x & serpiente[0].y == comida.y) {
    return true
  } else {
    return false
  }
}

const serpienteInicial = serpiente.map(p => ({ x: p.x, y: p.y }))
const columnas = canvas.width / tamaño_celda
const filas = canvas.height / tamaño_celda

const velocidadInicial = 300
let velocidad = velocidadInicial

let juegoTerminado = false

function revisarChoque() {
  let cabeza = serpiente[0]
  let nx = cabeza.x
  let ny = cabeza.y

  if (direccionActual == "derecha") nx++
  else if (direccionActual == "izquierda") nx--
  else if (direccionActual == "arriba") ny--
  else if (direccionActual == "abajo") ny++

  let choqueBorde = nx < 0 || nx >= columnas || ny < 0 || ny >= filas
  let choqueCuerpo = serpiente.some(p => p.x === nx && p.y === ny)

  if (choqueBorde || choqueCuerpo) {
    terminarJuego()
    return true
  }
  return false
}

function terminarJuego() {
  juegoTerminado = true
  clearInterval(intervaloSerpiente)

  dibujarTodo()
  dibujarGameOver()

  document.getElementById("estado").textContent = "Game Over"
  document.getElementById("mensaje").textContent =
    "GAME OVER - Puntaje final: " + puntaje + ". Presiona Reiniciar."
}

function dibujarGameOver() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = "#ff51f3"
  ctx.font = "bold 60px Arial"
  ctx.textAlign = "center"
  ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2)

  ctx.fillStyle = "white"
  ctx.font = "24px Arial"
  ctx.fillText("Puntaje: " + puntaje, canvas.width / 2, canvas.height / 2 + 45)
}

function reiniciarJuego() {
  clearInterval(intervaloSerpiente)

  serpiente.length = 0
  serpienteInicial.forEach(p => serpiente.push({ x: p.x, y: p.y }))

  direccionActual = undefined
  juegoTerminado = false
  puntaje = 0
  velocidad = velocidadInicial

  comida.x = 0
  comida.y = 0

  document.getElementById("puntaje").textContent = puntaje
  document.getElementById("estado").textContent = "Listo"
  document.getElementById("mensaje").textContent = "Presiona iniciar para comenzar."

  dibujarTodo()
}

function esRetroceso(direccion) {
  let cabeza = serpiente[0]
  let cuello = serpiente[1]

  let dx = 0
  let dy = 0
  if (direccion == "derecha") dx = 1
  if (direccion == "izquierda") dx = -1
  if (direccion == "arriba") dy = -1
  if (direccion == "abajo") dy = 1

  return cabeza.x + dx === cuello.x && cabeza.y + dy === cuello.y
}

document.addEventListener("keydown", function (e) {
  if (e.key == "ArrowUp") cambiarDireccion("arriba")
  else if (e.key == "ArrowDown") cambiarDireccion("abajo")
  else if (e.key == "ArrowLeft") cambiarDireccion("izquierda")
  else if (e.key == "ArrowRight") cambiarDireccion("derecha")
  else if (e.key == " ") pausarJuego()
  else return

  e.preventDefault()
})