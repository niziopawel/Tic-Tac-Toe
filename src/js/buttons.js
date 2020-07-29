export function initButtons(container, handleUserAction) {
  function buttonClick({ target }) {
    handleUserAction(target)
  }

  createResetButton(container).addEventListener("click", buttonClick)
}

function createResetButton(container) {
  const resetBtn = document.createElement("button")
  resetBtn.classList.add("btn")
  resetBtn.innerText = "Zacznij od nowa"

  container.appendChild(resetBtn)

  return resetBtn
}
