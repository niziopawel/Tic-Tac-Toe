import { isObject } from "./utils"
class AI {
  constructor() {
    this.scores = {
      x: -10,
      o: 10,
      tie: 0,
    }
  }
  bestMove(board, humanPlayer, aiPlayer, checkWinner) {
    let bestScore = -Infinity
    const currentBoard = board.getBoard()
    let move

    for (let row = 0; row < 3; row++) {
      for (let column = 0; column < 3; column++) {
        if (currentBoard[row][column] === "") {
          currentBoard[row][column] = aiPlayer.getPlayerMark()
          let score = this.minimax(
            currentBoard,
            0,
            humanPlayer,
            aiPlayer,
            false,
            checkWinner
          )
          currentBoard[row][column] = ""
          if (score > bestScore) {
            bestScore = score
            move = { row, column }
          }
        }
      }
    }
    return move
  }

  minimax(board, depth, humanPlayer, aiPlayer, isMaximazing, checkWinner) {
    let { winner } = checkWinner(humanPlayer, aiPlayer, board)
    if (winner !== null) {
      if (isObject(winner)) {
        return this.scores[winner.getPlayerMark()]
      } else {
        return this.scores[winner]
      }
    }

    if (isMaximazing) {
      let bestScore = -Infinity
      for (let row = 0; row < 3; row++) {
        for (let column = 0; column < 3; column++) {
          if (board[row][column] === "") {
            board[row][column] = aiPlayer.getPlayerMark()
            let score = this.minimax(
              board,
              depth + 1,
              humanPlayer,
              aiPlayer,
              false,
              checkWinner
            )
            board[row][column] = ""
            bestScore = Math.max(score, bestScore)
          }
        }
      }
      return bestScore
    } else {
      let bestScore = Infinity
      for (let row = 0; row < 3; row++) {
        for (let column = 0; column < 3; column++) {
          if (board[row][column] === "") {
            board[row][column] = humanPlayer.getPlayerMark()
            let score = this.minimax(
              board,
              depth + 1,
              humanPlayer,
              aiPlayer,
              true,
              checkWinner
            )
            board[row][column] = ""
            bestScore = Math.min(score, bestScore)
          }
        }
      }
      return bestScore
    }
  }
}

export default AI
