// CORREÇÃO: removida a declaração duplicada de window.onload
// Toda a lógica agora está em um único listener

const heartTypes = ["❤️", "💖", "💕", "💗", "💓"];
let spawnRate = 800;
let container;

function createHeart() {
    if (!container) return;

    const heart = document.createElement("span");
    heart.classList.add("heart");
    heart.innerHTML = heartTypes[Math.floor(Math.random() * heartTypes.length)];
    heart.style.left = Math.random() * 100 + "vw";

    const size = Math.random() * 20 + 15;
    heart.style.fontSize = size + "px";

    const duration = Math.random() * 4 + 6;
    heart.style.animationDuration = duration + "s";

    container.appendChild(heart);

    setTimeout(() => heart.remove(), duration * 1000);
}

function startHearts() {
    const interval = setInterval(() => createHeart(), spawnRate);

    // Aumenta a quantidade de corações com o tempo
    setInterval(() => {
        if (spawnRate > 200) {
            spawnRate -= 100;
        }
    }, 5000);

    return interval;
}

// CORREÇÃO: único window.onload consolidado
window.addEventListener("DOMContentLoaded", () => {
    container = document.getElementById("hearts-container");

    const audio = document.getElementById("bg-music");
    if (audio) {
        audio.volume = 0.3;
        audio.play().catch(() => {});
    }

    // Burst inicial de corações
    for (let i = 0; i < 25; i++) {
        setTimeout(createHeart, i * 100);
    }

    startHearts();

    // Pequeno boost adicional após 1 segundo
    setTimeout(() => {
        for (let i = 0; i < 10; i++) {
            createHeart();
        }
    }, 1000);
});
