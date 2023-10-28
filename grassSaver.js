const LivingCreature = require("./livingCreature");
const random = require("./random");

module.exports = class GrassSaver extends LivingCreature {
  constructor(x, y) {
    super(x, y);
    this.energy = Math.floor(sizee / 2.5);
    this.directions = [];
    this.breedable=random(5);
  }

  getNewCoordinates() {
    this.directions = [
      [this.x - 1, this.y - 1],
      [this.x, this.y - 1],
      [this.x + 1, this.y - 1],
      [this.x - 1, this.y],
      [this.x + 1, this.y],
      [this.x - 1, this.y + 1],
      [this.x, this.y + 1],
      [this.x + 1, this.y + 1]
    ]
  }
  move() {
    if (this.energy > 0) {
      this.getNewCoordinates()

      var emptyCells = this.chooseCell(0)
      var oneEmptyCell = random(emptyCells)
      if (oneEmptyCell) {
        matrix[this.y][this.x] = 0
        var neighX = oneEmptyCell[0]
        var neighY = oneEmptyCell[1]
        matrix[neighY][neighX] = 3
        this.y = neighY
        this.x = neighX
        this.energy--
      }
    }
    else {
      this.die()
    }
  }

  mul() {
    if (this.breedable) {
      if (this.energy >= 40) {
        var newCell = random(this.chooseCell(0))
        if (newCell) {
          var newGrassSaver = new GrassSaver(newCell[0], newCell[1])
          grassSaverArr.push(newGrassSaver)
          matrix[newCell[1]][newCell[0]] = 3
          //stats.grassSaverCount++
        }
      }
    }
  }

  die() {
    for (var i in grassSaverArr) {
      if (this.x == grassSaverArr[i].x && this.y == grassSaverArr[i].y) {
        grassSaverArr.splice(i, 1)
        matrix[this.y][this.x] = 0
        //stats.grassSaverCount--
        break
      }
    }
  }

  eat() {
    this.getNewCoordinates()
    var cells = this.chooseCell(2)
    var oneCell = random(cells)
    if (oneCell) {
      this.energy += 3
      var oneCellX = oneCell[0]
      var oneCellY = oneCell[1]
      matrix[oneCellY][oneCellX] = 3
      matrix[this.y][this.x] = 0
      this.y = oneCellY
      this.x = oneCellX
      for (var i in grassEaterArr) {
        if (oneCellX == grassEaterArr[i].x && oneCellY == grassEaterArr[i].y) {
          grassEaterArr.splice(i, 1)
          //stats.grassEaterCount--
          break
        }
      }
    }
    else {
      this.move()
    }
    if (this.energy >= 40) {
      this.mul()
    }
  }
}
