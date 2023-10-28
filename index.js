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

const explode = require("./event")
//const explodeM = require("./tevent")
const random = require("./random")
const Grass = require("./grass")
const GrassEater = require("./grassEater")
const GrassSaver = require("./grassSaver")
const Predator = require("./predator")
const Snake = require("./snake")
const Spawner = require("./spawner")
const Virus = require("./virus")

sizee = 40;
side = 900 / sizee;
grassArr = [];
grassEaterArr = [];
virusArr = [];
predatorArr = [];
spawnerArr = [];
grassSaverArr = [];
spawnerCount = 2;
snake = null;
matrix = [];
season = 0;
time = 100;

stats = {
  grassCount: 0,
  grassEaterCount: 0,
  grassSaverCount: 0,
  predatorCount: 0,
  infectedCount: 0,
  spawnedCount: 0,
  explodedCount: 0,
  allGrassCount: 0
};

var explodeMatrix = [
  [1, 0, 1, 0],
  [1, 0, 1, 1],
  [0, 1, 0, 1],
  [0, 0, 1, 0]
];

function nextSeason(cur) {
  return Math.abs(cur - 1);
}

function matrixGenerator(size, countGrass, countGrassEater, countGrassSaver, countPredator, countVirus, countSpawner) {
  for (let i = 0; i < size; i++) {
    matrix.push([])
    for (let j = 0; j < size; j++) {
      matrix[i].push(0)
    }
  }
  for (var k = 0; k < countGrass; k++) {
    var x = random(size)
    var y = random(size)
    matrix[y][x] = 1
  }
  for (var k = 0; k < countGrassEater; k++) {
    var x = random(size)
    var y = random(size)
    matrix[y][x] = 2
  }
  for (var k = 0; k < countGrassSaver; k++) {
    var x = random(size)
    var y = random(size)
    matrix[y][x] = 3
  }
  for (var k = 0; k < countPredator; k++) {
    var x = random(size)
    var y = random(size)
    matrix[y][x] = 4
  }
  for (var k = 0; k < countVirus; k++) {
    var x = random(size)
    var y = random(size)
    matrix[y][x] = 5
  }
  for (var k = 0; k < countSpawner; k++) {
    var x = random(size)
    var y = random(size)
    matrix[y][x] = 7
  }
}

function createGame() {
  matrixGenerator(sizee, sizee / 4, sizee / 8, sizee / 8, sizee / 8, sizee / 32, spawnerCount)
  snake = new Snake(Math.floor(sizee / 4), 0)
  for (var y = 0; y < matrix.length; ++y) {
    for (var x = 0; x < matrix[y].length; ++x) {
      if (matrix[y][x] === 1) {
        var grass = new Grass(x, y)
        grassArr.push(grass)
        stats.allGrassCount++
      } else if (matrix[y][x] === 2) {
        var grassEater = new GrassEater(x, y)
        grassEaterArr.push(grassEater)
        //stats.grassEaterCount++
      } else if (matrix[y][x] === 3) {
        var grassSaver = new GrassSaver(x, y)
        grassSaverArr.push(grassSaver)
        //stats.grassSaverCount++
      } else if (matrix[y][x] === 4) {
        var predator = new Predator(x, y)
        predatorArr.push(predator)
        //stats.predatorCount++
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

var t = 0
//counter = 0
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
  if (snake) {
    snake.generate()
  }
  io.emit("matrix", matrix);
  stats.grassCount = grassArr.length;
  stats.grassEaterCount = grassEaterArr.length;
  stats.grassSaverCount = grassSaverArr.length;
  stats.predatorCount = predatorArr.length;
  io.emit("stats", stats);
  io.emit("season", season)
  var l = 1;
  /*if (l!=0) {
    setTimeout(()=> {
    explodeM(10, 10, explodeMatrix);
    l = 0;
    },5000);
  }*/
  //counter++
  //console.log(counter);
  //explode(-1, -1);
  //console.log(stats.grassCount + " " + stats.grassEaterCount + " " + stats.grassSaverCount + " " + stats.predatorCount + " " + stats.infectedCount + " " + stats.spawnedCount);
}

createGame()

let intervalID;

function startGame() {
  clearInterval(intervalID)
  intervalID = setInterval(() => {
    drawGame()
  }, 100)
}


setInterval(() => {
  season = nextSeason(season);
  if (season == 1) {
    time = 500;
  }
  else {
    time = 100;
  }
  //console.log(season, time);
}, 20000)

io.on("connection", (socket) => {
  socket.emit("matrix", matrix)
  startGame()

  socket.on('coordinates', (data) => {
    explode(parseInt(data.x), parseInt(data.y));
    //console.log('Received coordinates: X:', data.x, ' Y:', data.y, data);
  });
})


