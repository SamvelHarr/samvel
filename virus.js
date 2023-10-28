const random = require("./random")

module.exports = class Virus {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.infected = 0;
        this.max = Math.floor(sizee/2);
        this.directions = [];
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
        ];
    }

    chooseCell(ch1, ch2, ch3, ch4) {
        this.getNewCoordinates();
        var found = [];

        for (var i = 0; i < this.directions.length; i++) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];

            if (y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0) {
                if (matrix[y][x] == ch1 || matrix[y][x] == ch2 || matrix[y][x] == ch3 || matrix[y][x] == ch3 || matrix[y][x] == ch4) {
                    found.push(this.directions[i]);
                }
            }

        }
        return found;
    }

    move() {
        this.getNewCoordinates();
        var emptyCells = this.chooseCell(0);
        var oneEmptyCell = random(emptyCells);
        if (oneEmptyCell) {
            matrix[this.y][this.x] = 0;
            var neighX = oneEmptyCell[0];
            var neighY = oneEmptyCell[1];
            matrix[neighY][neighX] = 5;
            this.y = neighY;
            this.x = neighX;
        }
    }

    die() {
        this.explode();
        for (var i in virusArr) {
            if (this.x == virusArr[i].x && this.y == virusArr[i].y) {
                virusArr.splice(i, 1);
                matrix[this.y][this.x] = 6;
                break;
            }
        }
    }

    eat() {
        this.getNewCoordinates()
        var cells = this.chooseCell(1, 2, 3, 4);
        var oneCell = random(cells);
        if (oneCell) {
            var oneCellX = oneCell[0];
            var oneCellY = oneCell[1];
            matrix[oneCellY][oneCellX] = 5;
            matrix[this.y][this.x] = 6;
            this.y = oneCellY;
            this.x = oneCellX;
            this.infected++;
            for (var i in grassArr) {
                if (oneCellX == grassArr[i].x && oneCellY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    stats.infectedCount++;
                    stats.grassCount--;
                    break;
                }
            }
            for (var i in grassEaterArr) {
                if (oneCellX == grassEaterArr[i].x && oneCellY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    stats.infectedCount++;
                    stats.grassEaterCount--;
                    break;
                }
            }
            for (var i in grassSaverArr) {
                if (oneCellX == grassSaverArr[i].x && oneCellY == grassSaverArr[i].y) {
                    grassSaverArr.splice(i, 1);
                    stats.infectedCount++;
                    stats.grassSaverCount--;
                    break;
                }
            }
            for (var i in predatorArr) {
                if (oneCellX == predatorArr[i].x && oneCellY == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    stats.infectedCount++;
                    stats.predatorCount--;
                    break;
                }
            }
        }
        else {
            this.move();
        }
        if (this.infected >= this.max) {
            this.die();
        }
    }

    explode() {
        stats.infectedCount+=8;
        var cells = this.chooseCell(1, 2, 3, 4)
        for (var i = 0; i < cells.length; i++){
            matrix[cells[i][1]][cells[i][0]] = 6
            for (var j in grassArr) {
                if (cells[i][0] == grassArr[j].x && cells[i][1] == grassArr[j].y) {
                    grassArr.splice(j, 1)
                    stats.grassCount--
                    break
                }
            }
            for (var j in grassEaterArr) {
                if (cells[i][0] == grassEaterArr[j].x && cells[i][1] == grassEaterArr[j].y) {
                    grassEaterArr.splice(j, 1)
                    stats.grassEaterCount--
                    break
                }
            }
            for (var j in grassSaverArr) {
                if (cells[i][0] == grassSaverArr[j].x && cells[i][1] == grassSaverArr[j].y) {
                    grassSaverArr.splice(j, 1)
                    stats.grassSaverCount--
                    break
                }
            }
            for (var j in predatorArr) {
                if (cells[i][0] == predatorArr[j].x && cells[i][1] == predatorArr[j].y) {
                    predatorArr.splice(j, 1)
                    stats.predatorCount--
                    break
                }
            }
        }
    }
}