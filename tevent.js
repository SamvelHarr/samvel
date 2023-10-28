const Grass = require("./grass")
const GrassEater = require("./grassEater")
const GrassSaver = require("./grassSaver")
const Predator = require("./predator")
const Snake = require("./snake")
const Spawner = require("./spawner")
const Virus = require("./virus")

function explodeM(x, y, explodeMatrix) {
    for (var i = 0; i < explodeMatrix.length; i++) {
        for (var j = 0; j < explodeMatrix[i].length; j++) {
            var a = x + i;
            var b = y + j;
            if (a < sizee && b < sizee && a >= 0 && b >= 0) {
                matrix[b][a] = 9;
                setTimeout(() => {
                    matrix[b][a] = 0;
                }, 5000)
                if (a < sizee && a >= 0 && b < sizee && b >= 0 && explodeMatrix[i][j] == 1) {
                    for (var i in grassArr) {
                        if (a == grassArr[i].x && b == grassArr[i].y) {
                            grassArr.splice(i, 1)
                            break
                        }
                    }
                    for (var i in grassEaterArr) {
                        if (a == grassEaterArr[i].x && b == grassEaterArr[i].y) {
                            grassEaterArr.splice(i, 1)
                            break
                        }
                    }
                    for (var i in grassSaverArr) {
                        if (a == grassSaverArr[i].x && b == grassSaverArr[i].y) {
                            grassSaverArr.splice(i, 1)
                            break
                        }
                    }
                    for (var i in grassSaverArr) {
                        if (a == grassSaverArr[i].x && b == grassSaverArr[i].y) {
                            grassSaverArr.splice(i, 1)
                            break
                        }
                    }
                    for (var i in predatorArr) {
                        if (a == predatorArr[i].x && b == predatorArr[i].y) {
                            predatorArr.splice(i, 1)
                            break
                        }
                    }
                    for (var i in virusArr) {
                        if (a == virusArr[i].x && b == virusArr[i].y) {
                            virusArr.splice(i, 1)
                            break
                        }
                    }
                }
            }
        }
    }
}

module.exports = explodeM;