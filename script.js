let socket = io();
var sizee = 40;

function setup() {
  frameRate(5)
  createCanvas(900, 900)
  background('#acacac')
}

var side = 900 / sizee;
var grassColor = "green";

function drawGame(matrix) {
  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] == 1) {
        fill(grassColor)
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

/*socket.on("grassCount", (grassCount) => {
  grassStat.innerText = "Grasses spawned: " + grassCount;
})*/

socket.on("season", (season) => {
  if (season == 1) {
    grassColor = "#c9fcc5";
  }
  else {
    grassColor = "green";
  }
})

var liveStatsp = document.getElementById("liveStats");
var statsp = document.getElementById("stats");

socket.on("stats", (stats) => {
  liveStatsp.innerText = "Grasses alive: " + stats.grassCount + "\n" + "GrassEaters alive: " + stats.grassEaterCount + "\n" + "GrassSavers alive: " + stats.grassSaverCount + "\n" + "Predators alive: " + stats.predatorCount + "\n";
  statsp.innerText = "Total grass count: " + stats.allGrassCount + "\n" + "Bombs exploded: " + stats.explodedCount + "\n" + "Cells infected: " + stats.infectedCount + "\n" + "Characters spawned by spawners: " + stats.spawnedCount;
})

document.getElementById("explode").addEventListener("click", function () {
  var xCoordinate = document.getElementById("x-coordinate").value;
  var yCoordinate = document.getElementById("y-coordinate").value;

  console.log("click");

  var data = {
    x: xCoordinate,
    y: yCoordinate
  };
  socket.emit('coordinates', data);
});


/*var explode = document.getElementById("explode");
explode.addEventListener("click",
  function(){
      socket.emit("explode", 1);
  });*/

