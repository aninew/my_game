const dino = document.getElementById('dino');
const cactus = document.getElementById('cactus');
const scoreDisplay = document.getElementById('score');

let isJumping = false;
let score = 0;
let gameInterval;

// Function to update the score
function updateScore() {
    score++;
    scoreDisplay.textContent = 'Score: ' + score;
}

// Jump function
function jump() {
    if (isJumping) return;
    isJumping = true;

    let jumpHeight = 0;
    const jumpInterval = setInterval(() => {
        if (jumpHeight >= 100) {
            clearInterval(jumpInterval);
            const fallInterval = setInterval(() => {
                if (jumpHeight <= 0) {
                    clearInterval(fallInterval);
                    isJumping = false;
                }
                jumpHeight -= 5;
                dino.style.bottom = jumpHeight + 'px';
            }, 20);
        }
        jumpHeight += 5;
        dino.style.bottom = jumpHeight + 'px';
    }, 20);
}

// Start the game
function startGame() {
    gameInterval = setInterval(updateScore, 1000); // Update score every second
}

// Collision detection
setInterval(() => {
    const dinoRect = dino.getBoundingClientRect();
    const cactusRect = cactus.getBoundingClientRect();

    if (
        dinoRect.x < cactusRect.x + cactusRect.width &&
        dinoRect.x + dinoRect.width > cactusRect.x &&
        dinoRect.y < cactusRect.y + cactusRect.height &&
        dinoRect.y + dinoRect.height > cactusRect.y
    ) {
        alert('Game Over! Your score was: ' + score);
        clearInterval(gameInterval);
        location.reload(); // Reload the game
    }
}, 10);

// Event listener for mouse click
document.addEventListener('click', jump);

// Start the game when the page loads
window.onload = startGame;
