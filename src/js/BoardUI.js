class BoardUI {
  constructor() {
    this.subscribers = []
    this.handlers = []
  }

  createBoard() {
    const boardContainer = document.createElement("div")
    boardContainer.classList.add("game__board")
    const table = document.createElement("table")
    const tbody = document.createElement("tbody")

    for (let row = 0; row < 3; row++) {
      const tr = document.createElement("tr")
      for (let column = 0; column < 3; column++) {
        const td = document.createElement("td")
        td.setAttribute("data-row", row)
        td.setAttribute("data-column", column)
        tr.appendChild(td)
      }
      tbody.appendChild(tr)
    }
    table.appendChild(tbody)
    boardContainer.appendChild(table)
    return boardContainer
  }

  addCellClickListener() {
    document.querySelectorAll("td").forEach((cell) => {
      if (!cell.hasAttribute("listener")) {
        const wrappedListener = this.handleCellClick.bind(this, cell)
        this.handlers.push(wrappedListener)
        cell.setAttribute("listener", true)
        cell.addEventListener("click", wrappedListener, {
          once: true,
        })
      }
    })
  }

  handleCellClick(cell) {
    const isFree = this.checkIsCellFree(cell)
    if (isFree) {
      cell.removeAttribute("listener")
      this.subscribers.forEach((s) => s(cell))
    }
  }

  removeCellsClickListeners() {
    document.querySelectorAll("td").forEach((cell) => {
      cell.removeAttribute("listener")
      this.handlers.forEach((handler) => {
        cell.removeEventListener("click", handler)
      })
    })
  }

  checkIsCellFree(cell) {
    if (cell.innerHTML === "") {
      return true
    }
    return false
  }

  setMoveOnBoard(row, column, playerMarker) {
    const td = document.querySelector(
      `td[data-row="${row}"][data-column="${column}"]`
    )

    const div = document.createElement("div")
    div.classList.add(`${playerMarker}`)
    td.appendChild(div)
  }

  clearBoard() {
    const cells = document.querySelectorAll("td")
    cells.forEach((cell) => {
      cell.innerHTML = ""
    })
    this.removeWinnerLine()

    this.addCellClickListener()
  }

  drawWinnerLine(winnerLine, winnerMark) {
    const line = document.createElement("div")
    line.classList.add("winner-line")
    const color = winnerMark === "o" ? "#fff" : "#393e46"

    if (winnerLine > 5) {
      line.style.cssText = `background-color: ${color}; height: 390px; width: 8px; top: -43px; left: 146px; transform: rotate(${
        winnerLine % 2 === 0 ? -45 : 45
      }deg)`
    } else if (winnerLine > 2) {
      line.style.cssText = `background-color: ${color}; height: 300px; width: 8px; top: 0; left: ${
        (winnerLine - 3) * 100 + 44 + (winnerLine - 3)
      }px`
    } else {
      line.style.cssText = `background-color: ${color}; height: 8px; width:300px; left: 0; top:${
        winnerLine * 100 + 47
      }px`
    }
    document.querySelector("table").appendChild(line)
  }

  handleWinningGame(winnerLine, winnerMark) {
    this.drawWinnerLine(winnerLine, winnerMark)
    this.removeCellsClickListeners()
  }

  removeWinnerLine() {
    const winnerLine = document.querySelector(".winner-line")
    if (winnerLine !== null) {
      winnerLine.parentNode.removeChild(winnerLine)
    }
  }

  init(container) {
    container.appendChild(this.createBoard())
    this.addCellClickListener()
  }

  subscribe(fn) {
    this.subscribers.push(fn)
  }
}

export default BoardUI
