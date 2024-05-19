/**
 * @returns {{height: Number, width: Number} | false}
 */
function parseParams() {
    const params = new URLSearchParams(window.location.search)
    let height = params.get('height')
    let width = params.get('width')
    if (!height || !width) {
        return false
    }
    height = parseInt(height)
    width = parseInt(width)
    if (isNaN(height) || isNaN(width)) {
        return false
    }
    return { height, width }
}

const cellSize = "24px"

/** @type {HTMLDivElement} */
const gameContainer = document.getElementById("game-container")

/** @type {HTMLDivElement} */
const gameInfoContainer = document.getElementById("game-info")

/** @type {HTMLDivElement} */
const gameField = document.getElementById("game-field")

function main() {
    const params = parseParams()
    if (!params) {
        return
    }
    const { height, width } = params

    gameContainer.style.setProperty("--cell-size", cellSize)

    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            const cell = document.createElement('div')
            cell.classList.add("cell")
            cell.dataset["state"] = "up"
            gameField.appendChild(cell)
        }
    }
}

main()