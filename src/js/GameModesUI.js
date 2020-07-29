class GameModesUI {
  constructor() {
    this.gameModes = [
      { label: "Play with friend", value: "vsPlayer" },
      { label: "Play with computer", value: "vsComputer" },
    ]
    this.subscribers = []
  }

  createSelect() {
    const select = document.createElement("select")
    select.classList.add("dropdown")

    this.gameModes.forEach((mode) => {
      const option = document.createElement("option")
      option.text = mode.label
      option.value = mode.value
      select.appendChild(option)
    })
    select.addEventListener("change", ({ target }) => {
      this.subscribers.forEach((s) => s(target.value))
    })

    return select
  }

  createGameModesWrapper() {
    const gameModesWrapper = document.createElement("div")
    gameModesWrapper.classList.add("game__mode")
    gameModesWrapper.appendChild(this.createSelect())
    return gameModesWrapper
  }

  getInitialMode() {
    return this.gameModes[0].value
  }

  subscribe(fn) {
    this.subscribers.push(fn)
  }

  init(container) {
    container.appendChild(this.createGameModesWrapper())
  }
}

export default GameModesUI
