const random = require("./random")
const Grass = require("./grass")
const GrassSaver = require("./grassSaver")
const GrassEater = require("./grassEater")
const Predator = require("./Predator")

module.exports = class Spawner {
    constructor(x, y) {
        this.x = x
        this.y = y
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

    chooseCell(ch1, ch2, ch3, ch4) {
        var found = []
        for (var i = 0; i < this.directions.length; i++) {
            var x = this.directions[i][0]
            var y = this.directions[i][1]
            if (y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0) {
                if (matrix[y][x] == ch1 || matrix[y][x] == ch2 || matrix[y][x] == ch3 || matrix[y][x] == ch4) {
                    found.push(this.directions[i])
                }
            }
        }
        return found
    }

    spawn() {
        var cells = this.chooseCell(0, 1, 2, 3)
        matrix[this.y][this.x] = 7
        if (grassArr.length <= spawnerCount + 1) {
            var oneCell = random(cells)
            while (!oneCell) {
                oneCell = random(cells)
            }
            var newGrass = new Grass(oneCell[0], oneCell[1])
            grassArr.push(newGrass)
            matrix[oneCell[1]][oneCell[0]] = 1
        }
        else if (predatorArr.length <= spawnerCount + 1) {
            var oneCell = random(cells)
            while (!oneCell) {
                oneCell = random(cells)
            }
            var newPredator = new Predator(oneCell[0], oneCell[1])
            predatorArr.push(newPredator)
            matrix[oneCell[1]][oneCell[0]] = 4
        }
        else if (grassSaverArr.length <= spawnerCount + 1) {
            var oneCell = random(cells)
            while (!oneCell) {
                oneCell = random(cells)
            }
            var newGrassSaver = new GrassSaver(oneCell[0], oneCell[1])
            grassSaverArr.push(newGrassSaver)
            matrix[oneCell[1]][oneCell[0]] = 3
        }
        else if (grassEaterArr.length <= spawnerCount + 1) {
            var oneCell = random(cells)
            while (!oneCell) {
                oneCell = random(cells)
            }
            var newGrassEater = new GrassEater(oneCell[0], oneCell[1])
            grassEaterArr.push(newGrassEater)
            matrix[oneCell[1]][oneCell[0]] = 2
        }
    }
}