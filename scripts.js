var pontos = 0
const container = document.querySelector(".jogo-memoria");
var numeroDeCartas = 0
const myCards = ["bobrossparrot", "fiestaparrot", "explodyparrot", "metalparrot", "revertitparrot", "tripletsparrot", "unicornparrot"];
var jogadas = 0
var vidas = 10
var tempoDeJogo = 0;

function aumentarContador() {
  const spanContador = document.querySelector('.contador span');
  tempoDeJogo++;
  spanContador.innerHTML = tempoDeJogo;
}

function addCards(){
  while(numeroDeCartas<4 || numeroDeCartas>14 || numeroDeCartas%2 ==1)
   numeroDeCartas = parseInt(prompt("Quantas cartas?"));
  let cartitas = []
  for (let numeroDaCarta = 0; numeroDaCarta < numeroDeCartas/2; numeroDaCarta++) {
    let cartinha = `<div class="carta-jogo" data-identifier="card" data-framework="${myCards[numeroDaCarta]}">
    <img class="frente" data-identifier="front-face" src="./arquivos/${myCards[numeroDaCarta]}.gif" alt="${myCards[numeroDaCarta]}" />
    <img class="verso" data-identifier="back-face" src="./arquivos/front.png" alt="logo" />
  </div>`

    cartitas.push(cartinha)
    cartitas.push(cartinha)
  }
  cartitas.sort(comparador);
  for (let i = 0; i < cartitas.length; i++) {
   container.innerHTML += cartitas[i]
    
  }

}

function comparador(){
  return Math.random() - 0.5;
}

addCards();

var cartas = document.querySelectorAll(".carta-jogo");
cartas.forEach((carta) => carta.addEventListener("click", flipcarta));


let CartaoVirado = false;
let lockBoard = false;
let cartao1, cartao2;

function flipcarta() {
  if (lockBoard) return;
  if (this === cartao1) return;

  this.classList.add("flip");

  if (!CartaoVirado) {
    CartaoVirado = true;
    cartao1 = this;

    return;
  }

  cartao2 = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = cartao1.dataset.framework === cartao2.dataset.framework;

  isMatch ? disablecartas() : unflipcartas();
  jogadas ++
  if (pontos == numeroDeCartas/2){
    alert(`Você ganhou em ${jogadas} jogadas! e em${tempoDeJogo} segundos`)
  }
  if (vidas==0){
    alert(`perdeu calvo`)
    jogarDenovo()
  }
}

function disablecartas() {
  pontos ++
  cartao1.removeEventListener("click", flipcarta);
  cartao2.removeEventListener("click", flipcarta);

  resetBoard();
}

function unflipcartas() {
  lockBoard = true;
  vidas --
  setTimeout(() => {
    cartao1.classList.remove("flip");
    cartao2.classList.remove("flip");

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [CartaoVirado, lockBoard] = [false, false];
  [cartao1, cartao2] = [null, null];
}

function jogarDenovo (){
  pontos=0
  numeroDeCartas=0
  jogadas=0
  vidas=3
  tempoDeJogo = 0;
  container.innerHTML=""
  addCards()
  resetBoard()
 cartas = document.querySelectorAll(".carta-jogo");
cartas.forEach((carta) => carta.addEventListener("click", flipcarta));

}
