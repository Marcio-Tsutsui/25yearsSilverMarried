// ===== SONS ALEATÓRIOS DO "NÃO" =====
const NAO_SOUNDS = [
    "./src/assets/sounds/nao/clicasim.mp3",
    "./src/assets/sounds/nao/doidona .mp3",
    "./src/assets/sounds/nao/não pode.mp3",
    "./src/assets/sounds/nao/noss .mp3",
    "./src/assets/sounds/nao/quer me deixar triste .mp3",
    "./src/assets/sounds/nao/tá brincando .mp3"
];

let currentNaoSound = null;
let hasEscaped      = false;

function playRandomNaoSound() {
    if (currentNaoSound) {
        currentNaoSound.pause();
        currentNaoSound.currentTime = 0;
    }
    const path = NAO_SOUNDS[Math.floor(Math.random() * NAO_SOUNDS.length)];
    currentNaoSound = new Audio(path);
    currentNaoSound.volume = 0.8;
    currentNaoSound.play().catch(e => console.warn("Erro ao tocar som:", e));
}

// ===== POSIÇÃO ALEATÓRIA DENTRO DO CENTER-BOX =====
function moveNaoButton() {
    const nao = document.getElementById("nao-button");
    const box = document.querySelector(".center-box");

    const boxRect = box.getBoundingClientRect();
    const naoW = nao.offsetWidth;
    const naoH = nao.offsetHeight;

    const padding = 16; // margem interna de segurança

    const maxX = boxRect.width  - naoW - padding;
    const maxY = boxRect.height - naoH - padding;

    const randX = padding + Math.random() * Math.max(0, maxX - padding);
    const randY = padding + Math.random() * Math.max(0, maxY - padding);

    nao.style.left = (boxRect.left + randX) + "px";
    nao.style.top  = (boxRect.top  + randY) + "px";
}

// ===== CLIQUE NO NÃO =====
function runAway() {
    // 1. Toca o som imediatamente
    playRandomNaoSound();

    const nao = document.getElementById("nao-button");

    if (!hasEscaped) {
        hasEscaped = true;
        const rect = nao.getBoundingClientRect();

        // Tira do fluxo, fixa na posição atual antes de mover
        nao.style.position = "fixed";
        nao.style.left     = rect.left + "px";
        nao.style.top      = rect.top  + "px";
        nao.style.margin   = "0";
        nao.style.width    = rect.width + "px";
    }

    // Pequeno delay para o clique registrar antes de pular
    setTimeout(moveNaoButton, 80);
}

// ===== BOTÃO SIM =====
function goToYes() {
    const audio = document.getElementById("sim-sound");
    if (audio) {
        audio.play()
            .then(() => setTimeout(() => { window.location.href = "templates/yes.html"; }, 800))
            .catch(()  => { window.location.href = "templates/yes.html"; });
    } else {
        window.location.href = "templates/yes.html";
    }
}

// ===== SOM DE DIGITAÇÃO =====
function playTypingSound(duration) {
    const typing = document.getElementById("typing-sound");
    const bg     = document.getElementById("playaudio");
    if (!typing) return;
    typing.pause();
    typing.currentTime = 0;
    if (bg) bg.volume = 0.1;
    typing.volume = 0.8;
    typing.play().catch(() => {});
    setTimeout(() => {
        typing.pause();
        typing.currentTime = 0;
        if (bg) bg.volume = 0.2;
    }, duration);
}

// ===== INIT =====
window.addEventListener("DOMContentLoaded", () => {
    const bgAudio = document.getElementById("playaudio");
    if (bgAudio) bgAudio.volume = 0.2;

    playTypingSound(3000);
    setTimeout(() => playTypingSound(5000), 3000);
});

function execSom() {
    const bg = document.getElementById("playaudio");
    if (bg && bg.paused) bg.play().catch(() => {});
}
