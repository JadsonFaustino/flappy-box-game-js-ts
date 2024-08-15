# Flappy Box

Este é um jogo simples baseado na mecânica do Flappy Bird, onde o objetivo é evitar obstáculos (canos) e acumular pontos saltando sobre eles. O jogo é desenvolvido usando JavaScript e manipulação de elementos HTML.

## Funcionalidades

- **Movimentação dos Canos:** Canos se movem da direita para a esquerda, e o jogador deve evitar colisões.
- **Gravidade e Salto:** O pássaro cai devido à gravidade e pode saltar ao pressionar a barra de espaço.
- **Pontuação:** A pontuação aumenta quando o pássaro passa pelos canos sem colidir.
- **Game Over:** O jogo termina quando o pássaro colide com um cano ou sai da tela.

## Requisitos

- Navegador web moderno que suporte JavaScript.

## Como Jogar

1. **Iniciar o Jogo:** O jogo começa automaticamente ao carregar a página.
2. **Saltar:** Pressione a barra de espaço para fazer o pássaro saltar.
3. **Pontuação:** A pontuação é exibida no elemento com id `score`. A pontuação aumenta cada vez que o pássaro passa um cano.

## Estrutura do Código

### Seleção dos Elementos HTML

```javascript
const bird = document.getElementById('bird'); // elemento com id 'bird'
const score = document.getElementById('score'); // elemento com id 'score'
const pipes = []; // Array para armazenar os canos
```

### Funções Principais

 - pipeMovement(): Move os canos e verifica colisões.
 - pipeSpawn(): Gera novos canos e remove os que saíram da tela.
 - applyGravity(): Aplica a gravidade ao pássaro.
 - verifyEdges(): Verifica se o pássaro saiu da tela.
 - gameLoop(): Função recursiva que executa o loop principal do jogo.
 - generatePipes(): Gera novos canos com altura aleatória.
 - createPipeElement(): Cria um elemento de cano HTML.
 - isColliding(): Verifica colisões entre dois elementos.
 - gameOver(): Encerra o jogo e exibe a pontuação final.
 - jump(): Faz o pássaro saltar ao pressionar a barra de espaço.

### Eventos
 - keydown: Adiciona um ouvinte de evento para o salto do pássaro.

## Executando o Jogo
 1. Adicione o código HTML básico com os elementos bird e score no seu arquivo HTML.
 2. Inclua o script JavaScript na sua página.
 3. Abra a página em um navegador web e teste!

## Nota
 - O código assume que o elemento HTML com id bird e score já estão presentes na página.
 - O jogo reinicia automaticamente quando você colide com um cano ou sai da tela.