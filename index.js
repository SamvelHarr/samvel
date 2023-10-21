var express = require("express");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static("../samvel"));

app.get("/", function (req, res) {
  res.redirect("index.html");
});

server.listen(3000, function () {
  console.log("App is running on port 3000");
});

const random = require("./random")
const Grass = require("./grass")
const GrassEater = require("./grassEater")
const GrassSaver = require("./grassSaver")
const Predator = require("./predator")
const Snake = require("./snake")
const Spawner = require("./spawner")
const Virus = require("./virus")

sizee = 50
side = 900 / sizee
grassArr = []
grassEaterArr = []
virusArr = []
predatorArr = []
spawnerArr = []
grassSaverArr = []
spawnerCount = 2
snake = null
matrix = []

function matrixGenerator(size, size, countGrass, countGrassEater, countGrassSaver, countPredator, countVirus, countSpawner) {
  console.log(countSpawner);
  for (var i = 0; i < size; i++) {
    matrix.push([])
    for (var j = 0; j < size; j++) {
      matrix[i].push(0)
    }
  }
  for (var k = 0; k < countGrass; k++) {
    var x = Math.floor(random(size))
    var y = Math.floor(random(size))
    matrix[y][x] = 1
  }
  for (var k = 0; k < countGrassEater; k++) {
    var x = Math.floor(random(size))
    var y = Math.floor(random(size))
    matrix[y][x] = 2
  }
  for (var k = 0; k < countGrassSaver; k++) {
    var x = Math.floor(random(size))
    var y = Math.floor(random(size))
    matrix[y][x] = 3
  }
  for (var k = 0; k < countPredator; k++) {
    var x = Math.floor(random(size))
    var y = Math.floor(random(size))
    matrix[y][x] = 4
  }
  for (var k = 0; k < countVirus; k++) {
    var x = Math.floor(random(size))
    var y = Math.floor(random(size))
    matrix[y][x] = 5
  }
  for (var k = 0; k < countSpawner; k++) {
    var x = Math.floor(random(size))
    var y = Math.floor(random(size))
    matrix[y][x] = 7
  }
  console.log(matrix);
}

function createGame() {
  matrixGenerator(sizee, sizee, sizee / 8, sizee / 8, sizee / 8, sizee / 8, sizee / 32, spawnerCount)
  snake = new Snake(Math.floor(sizee / 4), 0)
  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] === 1) {
        var grass = new Grass(x, y)
        grassArr.push(grass)
      } else if (matrix[y][x] === 2) {
        var grassEater = new GrassEater(x, y)
        grassEaterArr.push(grassEater)
      } else if (matrix[y][x] === 3) {
        var grassSaver = new GrassSaver(x, y)
        grassSaverArr.push(grassSaver)
      } else if (matrix[y][x] === 4) {
        var predator = new Predator(x, y)
        predatorArr.push(predator)
      } else if (matrix[y][x] === 5) {
        var virus = new Virus(x, y)
        virusArr.push(virus)
      } else if (matrix[y][x] === 7) {
        var newSpawner = new Spawner(x, y)
        spawnerArr.push(newSpawner)
      }
    }
  }
}
counter = 0
function drawGame() {
  for (var i = 0; i < grassArr.length; i++) {
    grassArr[i].mul()
  }
  for (var i = 0; i < grassEaterArr.length; i++) {
    grassEaterArr[i].eat()
  }
  for (var i = 0; i < grassSaverArr.length; i++) {
    grassSaverArr[i].eat()
  }
  for (var i = 0; i < predatorArr.length; i++) {
    predatorArr[i].eat()
  }
  for (var i = 0; i < virusArr.length; i++) {
    virusArr[i].eat()
  }
  for (var i = 0; i < spawnerArr.length; i++) {
    spawnerArr[i].spawn()
  }
  if(snake!=0){
    snake.generate()
  }
  io.emit("matrix", matrix)
  //counter++
  //console.log(counter);
  
}

createGame()

let intervalID;

function startGame() {
  clearInterval(intervalID)
  createGame()
  intervalID = setInterval(() => {
    drawGame()
  }, 100)
}

io.on("connection", (socket) => {
  socket.emit("matrix", matrix)
  startGame()
})
