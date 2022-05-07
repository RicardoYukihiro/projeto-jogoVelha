const entrada = require('prompt-sync')({signint: true})
const PLAYER_1 = "PLAYER_1"
const PLAYER_2 = "PLAYER_2"

let ganhador = null;
let velha = false;
let nomeJogador1 = null;
let nomeJogador2 = null;
let pararJogo = false;

let jogoVelha = preencherComEspaco()

let jogadorAtual = PLAYER_1;

console.log("Escolha a opcao abaixo para iniciar o jogo")
console.log("1 - Iniciar novo jogo")
console.log("2 - Sair do jogo")

let opcaoEscolhida = entrada("Digite opcao escolhida: ");

if(opcaoEscolhida == 1){
    nomeJogador1 = entrada("Digite nome jogador1: ");
    nomeJogador2 = entrada("Digite nome jogador2: ");

    while(ganhador == null && velha == false){
        let simboloAtual = (jogadorAtual == nomeJogador1) ? "X" : "O";

        jogadorAtual = (jogadorAtual == nomeJogador1) ? nomeJogador2 : nomeJogador1;
        console.log(`${jogadorAtual}, sua vez de jogar - Você é: ${simboloAtual}`)
       
        mostrarJogoVelha();
        
        let continuarValidacaoPosicao = true;

        while(continuarValidacaoPosicao){
            let posicaoEscolhida = entrada("Digite a posicao para jogar: ")
            let linha = posicaoEscolhida.split(',')[0]
            let coluna = posicaoEscolhida.split(',')[1]

            if(jogoVelha[linha][coluna] == " "){
                jogoVelha[linha][coluna] = simboloAtual;
                continuarValidacaoPosicao = false;
            } else {
                continuarValidacaoPosicao = true;
                console.log("Essa posição já está marcada :) \n\n")
            }             
        }
     
        mostrarJogoVelha();
        verificarSeExisteGanhador();
        verificarSeDeuVelha();
    }

    if(ganhador != null){
        console.log(`Parabéns jogador ${ganhador}, você ganhou RS 1.000.000,00`)
    }

    if(velha == true){
        console.log(`Deu veelhaa!!`)
    }

}

if(opcaoEscolhida == 2){
    console.log("Jogo finalizado...")
}

function preencherComEspaco(){
    var matriz = [[],[],[]];

    for(let linha = 0; linha < 3; linha = linha + 1){ //percorrer linha
        for(let coluna = 0; coluna < 3; coluna = coluna +1){
            matriz[linha][coluna] = " ";
        }
    }

    return matriz
}

function mostrarJogoVelha(){
    /*
            0     1     2
        0   0,0 | 0,1 | 0,2            //0,0   |     1,1    |    2,2
        1   1,0 | 1,1 | 1,2            //0,2   |     1,1    |    2,0
        2   2,0 | 2,1 | 2,2
    */

    for(let i = 0; i < jogoVelha.length; i = i + 1){ //percorrer linhas
        let linha = "";
        for(let j = 0; j < 3 ; j = j + 1){ //percorrer colunas
            let valor = jogoVelha[i][j] == undefined ? "__" : jogoVelha[i][j]
            let separador = j != 2 ? "|" : ""
            linha += valor + separador
        }

        if(i == 0){
            console.log("     0 1 2")
        }

        console.log(`${i}    ${linha}`)
    }

    console.log('\n\n')
}

function verificarSeExisteGanhador(){
    processarLinha0EColuna0();
    processarLinha1EColuna1();
    processarLinha2EColuna2();
    processarColunasX();
}

function processarLinha0EColuna0(){
    //horizontal
    if(jogoVelha[0][0] == "X" && jogoVelha[0][1] == "X" && jogoVelha[0][2] == "X"){
        ganhador = nomeJogador1;
    }
    
    if(jogoVelha[0][0] == "O" && jogoVelha[0][1] == "O" && jogoVelha[0][2] == "O"){
        ganhador = nomeJogador2;
    }

    //vertical
    if(jogoVelha[0][0] == "X" && jogoVelha[1][0] == "X" && jogoVelha[2][0] == "X"){
        ganhador = nomeJogador1;
    }
    
    if(jogoVelha[0][0] == "O" && jogoVelha[1][0] == "O" && jogoVelha[2][0] == "O"){
        ganhador = nomeJogador2;
    }
}

function processarLinha1EColuna1() {
    //horizontal
    if(jogoVelha[1][0] == "X" && jogoVelha[1][1] == "X" && jogoVelha[1][2] == "X"){
        ganhador = nomeJogador1
    }

    if(jogoVelha[1][0] == "O" && jogoVelha[1][1] == "O" && jogoVelha[1][2] == "O"){
       ganhador = nomeJogador2
    }

    //vertical
    if(jogoVelha[0][1] == "X" && jogoVelha[1][1] == "X" && jogoVelha[2][1] == "X"){
        ganhador = nomeJogador1;
    }
    
    if(jogoVelha[0][1] == "O" && jogoVelha[1][1] == "O" && jogoVelha[2][1] == "O"){
        ganhador = nomeJogador2;
    }
}   

function processarLinha2EColuna2() {
    //horizontal
    if(jogoVelha[2][0] == "X" && jogoVelha[2][1] == "X" && jogoVelha[2][2] == "X"){
        ganhador = nomeJogador1
    }

    if(jogoVelha[2][0] == "O" && jogoVelha[2][1] == "O" && jogoVelha[2][2] == "O"){
       ganhador = nomeJogador2
    }

    //vertical
    if(jogoVelha[0][2] == "X" && jogoVelha[1][2] == "X" && jogoVelha[2][2] == "X"){
        ganhador = nomeJogador1
    }

    if(jogoVelha[0][2] == "O" && jogoVelha[1][2] == "O" && jogoVelha[2][2] == "O"){
       ganhador = nomeJogador2
    }
} 

function processarColunasX(){
    //colunaX1
    if(jogoVelha[0][0] == "X" && jogoVelha[1][1] == "X" && jogoVelha[2][0] == "X"){
        ganhador = nomeJogador1
    }

    if(jogoVelha[0][0] == "O" && jogoVelha[1][1] == "O" && jogoVelha[2][0] == "O"){
       ganhador = nomeJogador2
    }

    //colunaX2
    if(jogoVelha[0][2] == "X" && jogoVelha[1][1] == "X" && jogoVelha[2][0] == "X"){
        ganhador = nomeJogador1
    }

    if(jogoVelha[0][2] == "O" && jogoVelha[1][1] == "O" && jogoVelha[2][0] == "O"){
       ganhador = nomeJogador2
    }
}


/*
        0     1     2
    0   0,0 | 0,1 | 0,2            //0,0   |     1,1    |    2,2
    1   1,0 | 1,1 | 1,2            //0,2   |     1,1    |    2,0
    2   2,0 | 2,1 | 2,2
*/
function verificarSeDeuVelha(){
    for(let linha = 0; linha < 3; linha = linha + 1){ //percorrer linha
        for(let coluna = 0; coluna < 3; coluna = coluna +1){
            if(jogoVelha[linha][coluna] == " "){
                velha = false;
                return;
            }
        }
    }
    velha = true;
}
