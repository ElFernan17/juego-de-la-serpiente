
// 1. Capturamos el canvas y su contexto de dibujo
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");
const tamaño_celda = 25
const serpiente = [
  {x:8,y:9},
  {x:9,y:9},
  {x:10,y:9},
  {x:10,y:10}
]



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

function pintarSerpiente(){
  let objetoTemp
  let color

  for(let i = 0; i < serpiente.length; i++){
    objetoTemp = serpiente[i]

    if(i === serpiente.length - 1){
      color = "#650f51"   // cabeza
    } else {
      color = "#7b00ff"   // cuerpo
    }

    pintarParte(objetoTemp.x , objetoTemp.y, color)
  }
}



