
// 1. Capturamos el canvas y su contexto de dibujo
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



// Primera pintura del juego al cargar la página
dibujarTodo();

// =========================
// FUNCIONES DE DIBUJO
// =========================

function limpiarCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarTodo() {
  limpiarCanvas();
  dibujarTablero();

  pintarParte(comida.x, comida.y, "#ff8ff6");
  pintarSerpiente();
}

//ctx.strokeStyle coloca un color de línea, similar a fillStyle

//ctx.beginPath() se invoca siempre para iniciar un trazo

//ctx.moveTo(x, y) posición inicial de la figura, colocar cualquier valor

//ctx.lineTo(x, y) dibuja una línea desde la ultima posicion del graficador, en este caso lo que puso en moveTo, hasta la posicion que
//recibe como parámetro, colocar cualquier valor

//ctx.stroke()dibuja la línea


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
      color = "#650f51"   // cabeza
    } else {
      color = "#7b00ff"   // cuerpo
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

  pintarComida();

  intervaloSerpiente = setInterval(moverSerpiente, 1000)

}

function moverSerpiente() {
  console.log("moviendo")

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
