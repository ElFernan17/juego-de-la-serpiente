
// 1. Capturamos el canvas y su contexto de dibujo
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");




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
}

const tamaño_celda = 25

//ctx.strokeStyle coloca un color de línea, similar a fillStyle

//ctx.beginPath() se invoca siempre para iniciar un trazo

//ctx.moveTo(x, y) posición inicial de la figura, colocar cualquier valor

//ctx.lineTo(x, y) dibuja una línea desde la ultima posicion del graficador, en este caso lo que puso en moveTo, hasta la posicion que
//recibe como parámetro, colocar cualquier valor

//ctx.stroke()dibuja la línea


function dibujarTablero() {

  for (i = 0; i < canvas.height; i += 25) {

    ctx.strokeStyle
    ctx.beginPath()
    ctx.moveTo(i, 0)
    ctx.lineTo(i, canvas.height)
    ctx.stroke()

  }

  for (i = 0; i < canvas.width; i += 25) {

    ctx.strokeStyle
    ctx.beginPath()
    ctx.moveTo(0 , i)
    ctx.lineTo(canvas.width , i)
    ctx.stroke()

  }
}



