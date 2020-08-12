document.addEventListener('DOMContentLoaded', () => {

const player = document.querySelector('.player')
const grid = document.querySelector('.grid')
const alert = document.getElementById('alert')

let isJumping = false
let gravity = 0.9
let isGameOver = false

function controller(e) {
    if (e.keyCode === 32) {
        if (!isJumping){
            isJumping = true
            jump()
        }
    }
}

document.addEventListener('keyup', controller)

let position = 0

function jump() {
    let count = 0
    let timerID = setInterval(function () {

        //gravity
        if (count === 15){
            clearInterval(timerID)
            let downTimerId = setInterval(function() {
                if (count === 0) {
                    clearInterval(downTimerId)
                    isJumping = false
                }
                position -= 5
                count-- 
                position = position * gravity
            player.style.bottom = position + 'px'
            }, 20)
        }

        //jump 
        position +=30
        count++
        position = position * gravity
        player.style.bottom = position + 'px'
    }, 20)
}

function generateMap (){
    let randomTime = Math.random() * 4000
    let obstaclePos = 1000
    const obstacle = document.createElement('div')
    obstacle.classList.add('obstacle')
    grid.appendChild(obstacle) 
    obstacle.style.left = obstaclePos + 'px'

    let timerID = setInterval(function(){
    if (obstaclePos > 0 && obstaclePos < 60 && position < 60){
        clearInterval(timerID)
        alert.innerHTML = 'Game Over'
        isGameOver = true

        //removes all the children
        while (grid.firstChild) {
            grid.removeChild(grid.lastChild)
        }
    }

        obstaclePos -= 10
        obstacle.style.left = obstaclePos + 'px'
    }, 20);

    if (!isGameOver) setTimeout(generateMap, randomTime)
}

generateMap()



})