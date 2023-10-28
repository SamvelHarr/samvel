const Virus = require("./Virus")

module.exports = class Snake {
    constructor(x, y) {
        this.stY = y
        this.x = x
        this.y = y
        this.length = Math.floor(sizee / 4)
        this.directions = []
        this.snake = []
        for (var i = this.length - 1; i >= 0; i--) {
            this.snake[i] = []
            this.snake[i][0] = this.x - i
            this.snake[i][1] = this.stY
            matrix[this.snake[i][1]][this.snake[i][0]] = 8
        }
        this.finish = 0
        if (sizee % 2 != this.stY % 2)
            this.finish = sizee - 1
        else
            this.finish = 0
    }

    generate() {
        if ((this.snake[0][1] != sizee - 1 || this.snake[0][0] != this.finish) && this.snake.length==this.length && snake!=0 && this.snake.length>0) {
            matrix[this.snake[this.length - 1][1]][this.snake[this.length - 1][0]] = 0
            for (var i = 0; i < this.snake.length; i++) {
                if (this.snake[i][1] >= 0 && this.snake[i][1] < sizee && this.snake[i][0] >= 0 && this.snake[i][0] < sizee) {
                    var next=this.choose(this.snake[i][0], this.snake[i][1])
                    this.snake[i][0] = next[0]
                    this.snake[i][1] = next[1]
                }
            }
            for (var i = 0; i < this.length; i++) {
                if (this.snake[i][1] >= 0 && this.snake[i][1] < sizee && this.snake[i][0] >= 0 && this.snake[i][0] < sizee) {
                    matrix[this.snake[i][1]][this.snake[i][0]] = 8
                }
            }
        }
        else {
            this.die()
        }
    }

    die() {
        for (var i = 0; i < this.length; i++) {
            matrix[this.snake[i][1]][this.snake[i][0]] = 5
            var newVirus = new Virus(this.snake[i][0], this.snake[i][1])
            virusArr.push(newVirus)
        }
        snake = new Snake(Math.floor(sizee/4), 0)
    }


    choose(x, y) {
        var next = [x, y]

        if (next[0] == sizee-1 && this.stY % 2 == next[1] % 2) {
            next[1]++
        }
        else if (next[0] == 0 && this.stY % 2 != next[1] % 2) {
            next[1]++
        }
        else if (this.stY % 2 == next[1] % 2) {
            next[0]++
        }
        else
            next[0]--
        return next
    }

    eat() {
        for (var i = 0; i < this.snake.length; i++) {
            for (var j in grassArr) {
                if (this.snake[i][0] == grassArr[j].x && this.snake[i][1] == grassArr[j].y) {
                    grassArr.splice(j, 1)
                    stats.grassCount--
                    break
                }
            }
            for (var j in grassEaterArr) {
                if (this.snake[i][0] == grassEaterArr[j].x && this.snake[i][1] == grassEaterArr[j].y) {
                    grassEaterArr.splice(j, 1)
                    stats.grassEaterCount--
                    break
                }
            }
            for (var j in grassSaverArr) {
                if (this.snake[i][0] == grassSaverArr[j].x && this.snake[i][1] == grassSaverArr[j].y) {
                    grassSaverArr.splice(j, 1)
                    stats.grassSaverCount--
                    break
                }
            }
            for (var j in predatorArr) {
                if (this.snake[i][0] == predatorArr[j].x && this.snake[i][1] == predatorArr[j].y) {
                    predatorArr.splice(j, 1)
                    stats.predatorCount--
                    break
                }
            }
        }
    }
}