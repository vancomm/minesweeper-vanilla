const boardParams = {
    rows: 16,
    cols: 16,
    mines: 40,
    width: "24px",
    height: "24px",
}

const gameState = {
    started: false,
    lost: false,
    won: false,
}

const startGame = (firstMove) => {
    const { rows, cols, mines } = boardParams
    const search = new URLSearchParams({
        height: rows,
        width: cols,
        mines,
        firstMove,
    })
    const url = "/start?" + search.toString()
    fetch(url)
        .then(res => res.json())
        .then(({ updates }) => {
            // use updates
        })
        .catch(e => console.error(e))
}

const settingsForm = document.getElementById("settings")
settingsForm.onsubmit = function (e) {
    e.preventDefault()
    const formData = new FormData(this)
    for (let [name, value] of formData.entries()) {
        boardParams[name] = value.toString()
    }
    render()
}

const face = document.getElementById("face")
const faceButton = document.getElementById("face-button")

faceButton.onpointerdown = function (e) {
    face.dataset["down"] = "true"
}
faceButton.onpointerup = function (e) {
    face.dataset["down"] = "false"
}
faceButton.onpointerleave = function (e) {
    face.dataset["down"] = "false"
}
faceButton.onclick = function (e) {
    console.log(`face ${e.type}`, e)
}

const container = document.getElementById("game-container")
const board = document.getElementById("game-board")

const updateCSS = () => {
    for (const [key, value] of Object.entries(boardParams)) {
        container.style.setProperty(`--${key}`, value)
    }
}

const createCell = (x, y) => {
    const cell = document.createElement("div")
    cell.className = "cell"
    cell.id = `cell_${x}_${y}`
    cell.dataset["x"] = x
    cell.dataset["y"] = y
    cell.dataset["index"] = x * boardParams.width + y
    if (Math.random() < 0.3) {
        cell.dataset["mined"] = "true"
    } else {
        cell.dataset["mines"] = Math.floor(9 * Math.random())
    }
    cell.dataset["down"] = "false"
    cell.dataset["covered"] = "true"
    cell.onpointerdown = function () {
        this.dataset["down"] = "true"
    }
    cell.onpointerup = function () {
        this.dataset["down"] = "false"
    }
    cell.onclick = function () {
        if (this.dataset["covered"] === "true") {
            this.dataset["covered"] = "false"
        } else {
            this.dataset["covered"] = "true"
        }
    }
    return cell
}

const render = () => {
    updateCSS()
    board.replaceChildren()
    for (let i = 0; i < boardParams.rows * boardParams.cols; i++) {
        const y = Math.floor(i / boardParams.rows) // because float: left
        const x = i % 10
        const cell = createCell(x, y)
        board.appendChild(cell)
    }
}

render()