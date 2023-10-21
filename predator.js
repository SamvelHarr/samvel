const LivingCreature = require("./livingCreature")
const random = require("./random")

module.exports = class Predator extends LivingCreature {
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

    chooseCell(ch1, ch2, ch3) {
        this.getNewCoordinates()
        var found = []

        for (var i = 0; i < this.directions.length; i++) {
            var x = this.directions[i][0]
            var y = this.directions[i][1]

            if (y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0) {
                if (matrix[y][x] == ch1 || matrix[y][x] == ch2 || matrix[y][x] == ch3) {
                    found.push(this.directions[i])
                }
            }

        }
        return found
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
                matrix[neighY][neighX] = 4
                this.y = neighY
                this.x = neighX
                this.energy--
            }
        }
        else {
            this.die()
        }
    }

    die() {
        for (var i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1)
                matrix[this.y][this.x] = 0
                break
            }
        }
    }

    eat() {
        this.getNewCoordinates()
        var cells = this.chooseCell(1, 2, 3)
        var oneCell = random(cells)
        if (oneCell) {
            this.energy++
            var oneCellX = oneCell[0]
            var oneCellY = oneCell[1]
            matrix[oneCellY][oneCellX] = 4
            matrix[this.y][this.x] = 0
            this.y = oneCellY
            this.x = oneCellX
            for (var i in grassArr) {
                if (oneCellX == grassArr[i].x && oneCellY == grassArr[i].y) {
                    grassArr.splice(i, 1)
                    break
                }
            }
            for (var i in grassEaterArr) {
                if (oneCellX == grassEaterArr[i].x && oneCellY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1)
                    break
                }
            }
            for (var i in grassSaverArr) {
                if (oneCellX == grassSaverArr[i].x && oneCellY == grassSaverArr[i].y) {
                    grassSaverArr.splice(i, 1)
                    break
                }
            }
        }
        else {
            this.move()
        }
    }
}