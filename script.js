// Selecionando os elementos HTML necessarios

const bird = document.getElementById('bird'); // elemento com id 'bird'
const score = document.getElementById('score'); // elemento com id 'score'
const pipes = []; // Array para armazenar os canos
let gameSpeed = 5; // Velocidade do jogo
const maxGravity = 10; // Gravidade maxima
let gravity = 10; // Valor da gravidade atual
const jumpHeight = -30; // Altura do salto
let scoreCount = 0; // Contador de pontuacao

function pipeMovement() {
    // Loop para mover e verificar colisoes dos canos
    for (const pipe of pipes) {
        // Movimenta os canos na velocidade do jogo
        pipe.style.left = `${pipe.offsetLeft - gameSpeed}px`;
        // Verifica se o passaro colidiu com o cano
        if (isColliding(bird, pipe)) {
            return true
        }
        // Verifica se o cano ja passou pelo passaro
        if (pipe.offsetLeft + pipe.offsetWidth < bird.offsetLeft && !pipe.passed) {
            pipe.passed = true;
            scoreCount++; // aumenta a pontuacao
            score.innerHTML = `Score: ${scoreCount / 2}`;
        }
    }
    return false;
}

function pipeSpawn() {
    // Gera 2 novos canos por vez
    if (pipes.length < 2) {
        generatePipes();
    }
    // Remove os canos que ja passaram da tela
    if (pipes.length > 0 && pipes[0].offsetLeft + pipes[0].offsetWidth < 0) {
        pipes.shift();
    }
}

function applyGravity() {
    // Aumenta a gravidade ate o maximo
    if (gravity < maxGravity) {
        gravity += 2;
    }
    // Move o passaro para baixo com base na gravidade
    bird.style.top = `${bird.offsetTop + gravity}px`;
}

function verifyEdges() {
    if (bird.offsetTop + bird.offsetHeight > window.innerHeight || bird.offsetTop < 0) {
        return true;
    }
    return false;
}

// Funcao recursiva principal do jogo
function gameLoop() {
    applyGravity();
    const pipeColision = pipeMovement();
    pipeSpawn();
    const edgeColision = verifyEdges();
    if (edgeColision || pipeColision) {
        gameOver();
        return;
    }
    // Chama a funcao gameLoop para o proximo frame
    requestAnimationFrame(gameLoop);
}

// Funcao para gerar novos canos
function generatePipes() {
    // Altura aleatoria dos canos
    const pipeHeight = Math.random() * (window.innerHeight - 400) + 50;

    // Cria os elementos de cano superior e inferior
    const pipeTop = createPipeElement('pipe', 0, window.innerWidth, pipeHeight);
    const pipeBottom = createPipeElement('pipe', pipeHeight + 300, window.innerWidth, window.innerHeight - pipeHeight - 300);

    // Define a propriedade 'passed'
    pipeTop.passed = false;
    pipeBottom.passed = false;

    // Adiciona os canos ao HTML e ao array de canos
    document.body.appendChild(pipeTop);
    document.body.appendChild(pipeBottom);
    pipes.push(pipeTop, pipeBottom);
}

// Funcao para criar um elemento de cano
function createPipeElement(className, top, left, height) {
    const pipeElement = document.createElement('div');
    pipeElement.className = className;
    pipeElement.style.top = `${top}px`;
    pipeElement.style.left = `${left}px`;
    pipeElement.style.height = `${height}px`;
    return pipeElement;
}

// Funcao que verifica se dois elementos colidiram
function isColliding(element1, element2) {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();
    return (
        rect1.top < rect2.bottom &&
        rect1.bottom > rect2.top &&
        rect1.left < rect2.right &&
        rect1.right > rect2.left
    );
}

// Funcao para encerrar o jogo
function gameOver() {
    alert(`Fim do jogo! Seu Score: ${scoreCount / 2}`);
    window.location.reload();
}

// Funcao para lidar com o salto do passaro
function jump(event) {
    // Verifica se a barra de espaco esta pressionada
    // e se a gravidade permite o salto
    if (event.keyCode === 32 && gravity >= -2) {
        gravity += jumpHeight;
    }
}

// salto ao pressionar enter
document.addEventListener('keydown', jump);
// Inicia o loop do jogo
gameLoop();