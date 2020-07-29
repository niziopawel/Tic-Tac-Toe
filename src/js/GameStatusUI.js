class GameStatusUI {
  createPlayerScoreBox(player, active) {
    const playerScoreBox = document.createElement("div")
    playerScoreBox.classList.add(`player${player.mark.toUpperCase()}-score`)
    const playerScoreValue = document.createElement("span")

    if (player.score === 0) {
      playerScoreValue.innerText = "-"
    } else {
      playerScoreValue.innerText = player.score
    }

    if (active) {
      playerScoreBox.classList.add("active")
    }
    playerScoreBox.innerText = `${player.mark.toUpperCase()}`
    playerScoreBox.appendChild(playerScoreValue)

    return playerScoreBox
  }

  createGameStateWrapper() {
    const gameStateWrapper = document.createElement("div")
    gameStateWrapper.classList.add("game__state")

    return gameStateWrapper
  }

  updateActivePlayerMarker(activePlayer) {
    this.removeActiveClass()

    document
      .querySelector(`.player${activePlayer.mark.toUpperCase()}-score`)
      .classList.add("active")
  }

  updatePlayerScore(winner) {
    document.querySelector(
      `.player${winner.mark.toUpperCase()}-score span`
    ).innerText = winner.score
  }

  removeActiveClass() {
    document
      .querySelector(".game__state")
      .childNodes.forEach((c) => c.classList.remove("active"))
  }

  resetPlayersScore() {
    document.querySelectorAll("span").forEach((s) => (s.innerText = "-"))
  }

  setInitialActivePlayer() {
    document.querySelector(".playerX-score").classList.add("active")
  }

  init(container, playerX, playerY) {
    const wrapper = this.createGameStateWrapper()
    wrapper.appendChild(this.createPlayerScoreBox(playerX, true))
    wrapper.appendChild(this.createPlayerScoreBox(playerY))

    container.appendChild(wrapper)
  }

  resetGameStatus() {
    this.removeActiveClass()
    this.setInitialActivePlayer()
    this.resetPlayersScore()
  }
}

export default GameStatusUI
