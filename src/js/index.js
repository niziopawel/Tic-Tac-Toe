import "../styles/styles.css"
import Game from "./Game"

document.addEventListener("DOMContentLoaded", () => {
  const game = new Game(".container")
  game.init()
})
