const grid = document.querySelector(".grid")
const spanPlayer = document.querySelector(".player")
const spanTimer = document.querySelector(".timer")
let firstCard = ""
let secondCard = ""

const caracters = [
    "arara",
    "bear",
    "butterfly",
    "horse",
    "leon",
    "mammalia",
    "wild-life",
    "yellowstone",
]
const createElementHtml = (tag, className) => {
    const element = document.createElement(tag)
    element.className = className
    return element
}

const checkEndGame = () => {
    if (document.querySelectorAll(".disabled-card").length === 16) {
        clearInterval(this.loop)
        alert(
            `Parabéns, ${spanPlayer.innerHTML} você ganhou e o seu tempo foi de ${spanTimer.innerHTML} segundos!`
        )
        window.location.reload()
    }
}

const checkCards = () => {
    const firstCaracater = firstCard.getAttribute("data-caracter")
    const secondCaracater = secondCard.getAttribute("data-caracter")

    if (firstCaracater === secondCaracater) {
        firstCard.classList.add("reveal-card")
        firstCard.firstChild.classList.add("disabled-card")
        secondCard.firstChild.classList.add("disabled-card")
        firstCard = ""
        secondCard = ""
        setTimeout(() => {
            checkEndGame()
        }, 500)
    } else {
        setTimeout(() => {
            firstCard.classList.remove("reveal-card")
            secondCard.classList.remove("reveal-card")
            firstCard = ""
            secondCard = ""
        }, 500)
    }
}

const revealCard = ({ target }) => {
    if (target.parentNode.className.includes("reveal-card")) {
        return
    }

    if (firstCard === "") {
        target.parentNode.classList.add("reveal-card")
        firstCard = target.parentNode
    } else if (secondCard === "") {
        target.parentNode.classList.add("reveal-card")
        secondCard = target.parentNode
        checkCards()
    }
}

const createCard = (caracter) => {
    const card = createElementHtml("div", "card")
    const front = createElementHtml("div", "face front")
    const back = createElementHtml("div", "face back")

    front.style.backgroundImage = `url('../imagens/${caracter}.jpg')`

    card.appendChild(front)
    card.appendChild(back)

    card.addEventListener("click", revealCard)
    card.setAttribute("data-caracter", caracter)

    return card
}

const loadGame = () => {
    const duplicateCaracters = [...caracters, ...caracters]
    const shuffledArray = duplicateCaracters.sort(() => Math.random() - 0.5)

    shuffledArray.forEach((caracter) => {
        const card = createCard(caracter)
        grid.appendChild(card)
    })
}

const startTimer = () => {
    this.loop = setInterval(() => {
        const currentTimer = Number(spanTimer.innerHTML)
        spanTimer.innerHTML = currentTimer + 1
    }, 1000)
}

window.onload = () => {
    spanTimer.innerHTML = Number(0)
    spanPlayer.innerHTML = localStorage.getItem("player")
    startTimer()
    loadGame()
}
