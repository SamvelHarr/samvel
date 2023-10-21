const LivingCreature = require("./livingCreature")
const random = require("./random")

module.exports = class GrassEater extends LivingCreature {
    constructor(x, y) {
        super(x, y)
        this.energy = Math.floor(sizee/2.5)
        this.directions = []
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
                matrix[neighY][neighX] = 2
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
        if (this.energy >= 35) {
            var newCell = random(this.chooseCell(0))
            if (newCell) {
                var newGrassEater = new GrassEater(newCell[0], newCell[1])
                grassEaterArr.push(newGrassEater)
                matrix[newCell[1]][newCell[0]] = 2
            }
        }
    }

    die() {
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1)
                matrix[this.y][this.x] = 0
                break
            }
        }
    }

    eat() {
        this.getNewCoordinates()
        var grasses = this.chooseCell(1)
        var oneGrass = random(grasses)
        if (oneGrass) {
            this.energy+=3
            var oneGrassX = oneGrass[0]
            var oneGrassY = oneGrass[1]
            matrix[oneGrassY][oneGrassX] = 2
            matrix[this.y][this.x] = 0
            this.y = oneGrassY
            this.x = oneGrassX
            for (var i in grassArr) {
                if (oneGrassX == grassArr[i].x && oneGrassY == grassArr[i].y) {
                    grassArr.splice(i, 1)
                    break
                }
            }
        }
        else {
            this.move()
        }
        if (this.energy >= 35 && grassEaterArr.length<sizee*sizee/3) {
            this.mul()
        }
    }
}
