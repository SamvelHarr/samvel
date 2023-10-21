const Grass = require("./grass")
const GrassEater = require("./grassEater")
const GrassSaver = require("./grassSaver")
const Predator = require("./predator")
const Snake = require("./snake")
const Spawner = require("./spawner")
const Virus = require("./virus")

function explosion(x, y) {
    for (var a = x - 1; a <= x + 1; a++) {
        for (var b = y - 1; b <= y + 1; b++) {
            matrix[a][b]=9;
            for (var i in grassArr) {
                if (a == grassArr[i].x && b == grassArr[i].y) {
                    grassArr.splice(i, 1)
                    break
                }
            }
            for (var i in grassEaterArr) {
                if (a== grassEaterArr[i].x && b == grassEaterArr[i].y) {
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
                if (a == predatorArr[i].x && b == predatorArr[i].y) {
                    predatorArr.splice(i, 1)
                    break
                }
            }
        }
        setTimeout(() => {
            for (var a = x - 1; a <= x + 1; a++) {
                for (var b = y - 1; b <= y + 1; b++) {
                    matrix[a][b]=0;
                }
            }
        }, 2000)
    }
}