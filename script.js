let socket = io();
var sizee=50;

function setup() {
  frameRate(5)
  createCanvas(900, 900)
  background('#acacac')
}

var side=900/sizee;

function drawGame(matrix) {
  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] == 1) {
        fill("green")
        rect(x * side, y * side, side, side)
      } 
      else if (matrix[y][x] == 0) {
        fill("#acacac")
        rect(x * side, y * side, side, side)
      } 
      else if (matrix[y][x] == 2) {
        fill("red")
        rect(x * side, y * side, side, side)
      } 
      else if (matrix[y][x] == 3) {
        fill("cyan")
        rect(x * side, y * side, side, side)
      } 
      else if (matrix[y][x] == 4) {
        fill("yellow")
        rect(x * side, y * side, side, side)
      } 
      else if (matrix[y][x] == 5) {
        fill("#4f0341")
        rect(x * side, y * side, side, side)
      } 
      else if (matrix[y][x] == 6) {
        fill("#a68b4c")
        rect(x * side, y * side, side, side)
      } 
      else if (matrix[y][x] == 7) {
        fill("black")
        rect(x * side, y * side, side, side)
      } 
      else if (matrix[y][x] == 8) {
        fill("coral")
        rect(x * side, y * side, side, side)
      }
      else if (matrix[y][x] == 9) {
        fill("gray")
        rect(x * side, y * side, side, side)
      }
    }
  }
}

socket.on("matrix", drawGame)