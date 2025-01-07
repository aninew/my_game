const dino = document.getElementById('dino');
const cactus = document.getElementById('cactus');

let isJumping = false;

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

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        jump();
    }
});

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
        alert('Game Over!');
        location.reload(); // Reload the game
    }
}, 10);