import BoardUI from "./BoardUI"
import GameModesUI from "./GameModesUI"
import GameStatusUI from "./GameStatusUI"
import Player from "./Player"
import Board from "./Board"
import AI from "./AI"
import { initButtons } from "./buttons"

class Game {
  constructor() {
    this.playerX = new Player("x")
    this.playerO = new Player("o")
    this.boardUI = new BoardUI()
    this.gameModeUI = new GameModesUI()
    this.gameStatusUI = new GameStatusUI()
    this.board = new Board()
    this.ai = new AI()
    this.currentMode = this.gameModeUI.getInitialMode()
    this.round = 1
    this.activePlayer = this.playerX

    this.gameModeUI.subscribe((selectedMode) => {
      this.handleModeChange(selectedMode)
    })

    this.boardUI.subscribe((cell) => {
      this.startGame(cell)
    })
  }

  createGameContainer() {
    const gameContainer = document.createElement("div")
    gameContainer.classList.add("game")
    document.querySelector("body").appendChild(gameContainer)
    return gameContainer
  }

  handleModeChange(selectedMode) {
    this.currentMode = selectedMode
    if (this.currentMode === "vsComputer") {
      this.playerX.setAI(false)
      this.playerO.setAI(true)
    }
    if (this.currentMode === "vsPlayer") {
      this.playerX.setAI(false)
      this.playerO.setAI(false)
    }
    this.resetGame()
  }

  startGame(cell) {
    if (this.activePlayer.getIsPlayerAI() === false) {
      const row = cell.dataset.row
      const column = cell.dataset.column
      this.board.setMoveOnBoard(row, column, this.activePlayer.getPlayerMark())
      this.boardUI.setMoveOnBoard(
        row,
        column,
        this.activePlayer.getPlayerMark()
      )
      this.round++
      this.updateActivePlayer()
      const { winner, winnersCombinationNumber } = this.board.checkWinner(
        this.playerX,
        this.playerO
      )

      if (winner !== null && winner !== "tie") {
        winner.score++
        this.gameStatusUI.updatePlayerScore(winner)
        this.boardUI.handleWinningGame(
          winnersCombinationNumber,
          winner.getPlayerMark()
        )
        return
      }
    }

    if (this.activePlayer.getIsPlayerAI() === true) {
      const humanPlayer =
        this.activePlayer.getPlayerMark() === "x" ? this.playerO : this.playerX
      const move = this.ai.bestMove(
        this.board,
        humanPlayer,
        this.activePlayer,
        this.board.checkWinner.bind(this.board)
      )
      if (move) {
        this.board.setMoveOnBoard(
          move.row,
          move.column,
          this.activePlayer.getPlayerMark()
        )
        this.boardUI.setMoveOnBoard(
          move.row,
          move.column,
          this.activePlayer.getPlayerMark()
        )
      }
      let { winner, winnersCombinationNumber } = this.board.checkWinner(
        this.playerX,
        this.playerO
      )

      if (winner !== null && winner !== "tie") {
        winner.score++
        this.gameStatusUI.updatePlayerScore(winner)
        this.boardUI.handleWinningGame(
          winnersCombinationNumber,
          winner.getPlayerMark()
        )
        return
      }
      this.round++
      this.updateActivePlayer()
    }
  }

  updateActivePlayer() {
    this.activePlayer = this.round % 2 !== 0 ? this.playerX : this.playerO
    this.gameStatusUI.updateActivePlayerMarker(this.activePlayer)
  }

  resetGame() {
    this.playerX.resetPlayerScore()
    this.playerO.resetPlayerScore()
    this.gameStatusUI.resetGameStatus()
    this.clearBoard()
  }

  clearBoard() {
    this.round = 1
    this.boardUI.clearBoard()
    this.board.resetBoard()
    this.updateActivePlayer()
  }

  init() {
    const gameContainer = this.createGameContainer()
    this.gameModeUI.init(gameContainer)
    this.gameStatusUI.init(gameContainer, this.playerX, this.playerO)
    this.boardUI.init(gameContainer)
    initButtons(gameContainer, this.clearBoard.bind(this))
  }
}

export default Game
