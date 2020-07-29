class Player {
  constructor(mark, isAI = false) {
    this.mark = mark
    this.score = 0
    this.isAI = isAI
  }

  getPlayerMark() {
    return this.mark
  }

  resetPlayerScore() {
    this.score = 0
  }

  setAI(isAI) {
    this.isAI = isAI
  }

  getIsPlayerAI() {
    return this.isAI
  }
}

export default Player
