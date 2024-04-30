// Iteration 1: Declare variables required for this game
const gameBody = document.getElementById("game-body");
const timerElement = document.getElementById("timer");
var seconds = parseInt(timerElement.textContent);
var zombieImages = [
    "zombie-1.png",
    "zombie-2.png",
    "zombie-3.png",
    "zombie-4.png",
    "zombie-5.png",
    "zombie-6.png",
]
var zombieId = 0;

// Iteration 1.2: Add shotgun sound
const shotgunSound = new Audio("./assets/shotgun.wav");
gameBody.onclick = () => {
    shotgunSound.pause();
    shotgunSound.currentTime = 0;
    shotgunSound.play();
}

// Iteration 1.3: Add background sound
const backgroundSound = new Audio("./assets/bgm.wav");
backgroundSound.play();
backgroundSound.loop = true;

// Iteration 1.4: Add lives
const maximumLives = 4;
var lives = 4;

// Iteration 2: Write a function to make a zombie
function makeZombie() {
    const randomImage = zombieImages[getRandomNum(zombieImages.length)];
    gameBody.innerHTML += `<img src="./assets/${randomImage}" id="${zombieId}" class="zombie-image"></img>`
    let zombie = document.getElementById(zombieId);
    zombie.style.transform = `translateX(${getRandomNum(10, 90)}%)`;
    zombie.onclick = () => {
        destroyZombie(zombie);
    }
    // Increment zombieId for the next zombie
    zombieId++;
}

// Iteration 3: Write a function to check if the player missed a zombie
function checkMissedZombie() {
    const zombies = document.getElementsByClassName("zombie-image");
    for (let zombie of zombies) {
        const zombiePosition = zombie.getBoundingClientRect();
        if (zombiePosition.top >= window.innerHeight) {
            destroyZombie(zombie);
            lives--;
            if (lives === 0) {
                endGame();
            }
        }
    }
}

// Iteration 4: Write a function to destroy a zombie when it is shot or missed
function destroyZombie(zombie) {
    zombie.remove();
}

// Iteration 5: Creating timer
function startTimer() {
    const interval = setInterval(() => {
        seconds--;
        timerElement.textContent = seconds;
        if (seconds === 0) {
            clearInterval(interval);
            endGame();
        }
    }, 1000);
}

// Iteration 6: Write a code to start the game by calling the first zombie
function startGame() {
    startTimer();
    makeZombie();
}

// Iteration 7: Write the helper function to get random integer
function getRandomNum(min, max) {
    if (max === undefined) {
        return Math.floor(Math.random() * min);
    } else {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}

// Call startGame to begin the game
startGame();
