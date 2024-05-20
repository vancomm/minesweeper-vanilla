/**
 * @returns {{height: Number, width: Number, bombs: Number} | false}
 */
function parseParams() {
    const params = new URLSearchParams(window.location.search)
    let height = params.get('height')
    let width = params.get('width')
    let bombs = params.get('bombs')
    if (!height || !width || !bombs) {
        return false
    }
    height = parseInt(height)
    width = parseInt(width)
    bombs = parseInt(bombs)
    if (isNaN(height) || isNaN(width) || isNaN(bombs)) {
        return false
    }
    return { height, width, bombs }
}

/**
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * @param {number[]} arr 
 * @param {number} size 
 * @returns {number[]}
 */
function getRandomSample(arr, size) {
    const shuffled = arr.slice(0)
    let i = arr.length, temp, index
    while (i--) {
        index = Math.floor((i + 1) * Math.random())
        temp = shuffled[index]
        shuffled[index] = shuffled[i]
        shuffled[i] = temp
    }
    return shuffled.slice(0, size);
}

/** 
 * @param {Number} height
 * @param {Number} width
 * @param {Number} bombs
 */
function generateField(height, width, bombs) {
    const bombIdxs = getRandomSample(
        [...Array.from(
            { length: height * width }, 
            (_, i) => i
        )],
        bombs
    )
    const cells = [...Array.from(
        { length: height },
        (_, i) => [...Array.from(
            { length: width },
            (_, j) => bombIdxs.includes(i * 10 + j)
        )]
    )];    
    return cells
}

const CELL_SIZE = "24px"

/** @type {HTMLDivElement} */
const gameContainer = document.getElementById("game-container")

/** @type {HTMLDivElement} */
const gameInfoContainer = document.getElementById("game-info")

/** @type {HTMLDivElement} */
const gameField = document.getElementById("game-field")

function main() {
    const params = parseParams()

    if (!params) {
        const errorDiv = document.createElement("div")
        errorDiv.textContent = "Invalid parameters. "
        const backLink = document.createElement("a")
        backLink.href = "/index.html"
        backLink.textContent = "Go back"
        errorDiv.appendChild(backLink)
        gameContainer.replaceChildren(errorDiv)
        return
    }

    const { height, width, bombs } = params

    gameContainer.style.setProperty("--cell-size", CELL_SIZE)
    gameContainer.style.setProperty("--height", height)
    gameContainer.style.setProperty("--width", width)

    const field = generateField(height, width, bombs)

    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            const cell = document.createElement('div')
            
            cell.classList.add("cell")
            cell.dataset["state"] = "up"

            cell.onpointerdown = function () {
                console.log("cell onpointerdown");
                if (this.dataset["state"] === "up") {
                    this.dataset["state"] = "down"
                }
            }
            cell.onpointerup = function () { 
                console.log("cell onpointerup");
                if (this.dataset["state"] === "down") {
                    this.dataset["state"] = "up"
                }
            }
            cell.onclick = function () {
                console.log("cell onclick");
                this.dataset["state"] = "open"
                this.dataset["bombs"] = "0"
            }
            
            gameField.appendChild(cell)
        }
    }

}

main()