class Board {
  constructor() {
    this.board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]
    this.winningCombination = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
  }
  getBoard() {
    return this.board
  }
  setMoveOnBoard(row, column, sign) {
    if (this.board[row][column] !== "") return
    this.board[row][column] = sign
  }
  resetBoard() {
    this.board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]
  }

  checkWinner(playerX, playerY, board) {
    let result
    if (board === undefined || board === null) {
      result = this.board.reduce((total, row) => total.concat(row))
    } else {
      result = board.reduce((total, row) => total.concat(row))
    }

    let winner = null
    let winnersCombinationNumber = null
    const moves = {
      x: [],
      o: [],
    }
    result.forEach((field, index) =>
      moves[field] ? moves[field].push(index) : null
    )
    this.winningCombination.forEach((combination, index) => {
      if (
        combination.every((index) => moves[playerX.mark].indexOf(index) > -1)
      ) {
        winner = playerX
        winnersCombinationNumber = index
      }
      if (
        combination.every((index) => moves[playerY.mark].indexOf(index) > -1)
      ) {
        winner = playerY
        winnersCombinationNumber = index
      } else if (moves["x"].length + moves["o"].length === 9) {
        winner = "tie"
      }
    })
    return { winner, winnersCombinationNumber }
  }
}

export default Board
