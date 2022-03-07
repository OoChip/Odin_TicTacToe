const d = document

//Objeto gameBoard para controlar el estado del tablero.
const gameBoard = {
    square1:0, square2:0, square3:0,
    square4:0, square5:0, square6:0,
    square7:0, square8:0, square9:0
}

const playerA = {
    player:"A",
    rol: "o",
    stamp: d.getElementById ("player-a-stamp"),
}

const playerB = {
    player:"B",
    rol: "x",
    stamp: d.getElementById ("player-b-stamp")
}

let squarePlayed, lastPlayer = playerB, winner= null

const btnSwitch = d.getElementById ("btn-switch")
btnSwitch.addEventListener("click", handlerSwitchStamp)

const btnReset = d.getElementById ("btn-reset")
btnReset.addEventListener("click", endGame)

const squares = d.querySelectorAll(".square")
squares.forEach(element => {element.addEventListener ("click", game)})

//Cambia la marca (X u O) de los jugadores.
function handlerSwitchStamp(e){
    if ( playerA.stamp.getAttribute("src") === "./assets/img/o.svg" ){
        playerA.stamp.setAttribute("src", "./assets/img/x.svg")
        playerB.stamp.setAttribute("src", "./assets/img/o.svg")
        playerA.rol = "x"
        playerB.rol = "o"
    }else{
        playerA.stamp.setAttribute("src", "./assets/img/o.svg")
        playerB.stamp.setAttribute("src", "./assets/img/x.svg")
        playerA.rol = "o"
        playerB.rol = "x"
    }
}

function game(Event){
    //Deshabilitar Botom Switch y habilita reset.
    btnSwitch.setAttribute ("disabled", "true")
    btnReset.removeAttribute("disabled")

    //identifica la casilla clickeada.
    squarePlayed = d.getElementById(`${Event.target.id}`)
    
    // Evalua si la casilla ya fue juagada (valida jugada).
    if (gameBoard[squarePlayed.getAttribute("id")] === 0 ){
        
        //Cambia el ultimo jugador y juega la casilla clickeada.
        if(lastPlayer.player === "A"){
            lastPlayer = playerB
            squarePlayed.setAttribute("src", `./assets/img/${lastPlayer.rol}.svg`)
        }else{
            lastPlayer= playerA     
            squarePlayed.setAttribute("src", `./assets/img/${lastPlayer.rol}.svg`)
        }

        //Guarda la jugada en el objeto gameBoard
        gameBoard[squarePlayed.getAttribute("id")] = lastPlayer.rol

        //llama funcion que verifica si hay un ganador
        evaluateWinner()
    }
}

function evaluateWinner(){
    const winnerPatters = [
        [1,2,3], [4,5,6], [7,8,9],
        [1,4,7], [2,5,8], [3,6,9],
        [1,5,9], [3,5,7]]   
    
    // Formatea el Id de la casilla Jugada para buscarla en los patrones ganadores.
    const played = squarePlayed.getAttribute("id").slice(6)

    console.log("evaluando ganador");
    console.log( played); 

    //Busca la casilla Jugada en los patrones ganadores.

    //verifica si en los patrones ganadores que contienen la casilla jugada todas las jugadas son iguales a X u O.


    //habemus winner.
    winner = lastPlayer
    console.log(`Gano ${lastPlayer.player}. ${lastPlayer.rol}`);

    //funcion que finaliza el juego, resetea gameBoard y el tablerohtml
    endGame()

    
//   if ( gameBoard.square1 === gameBoard.square2 && gameBoard.square2 === gameBoard.square3
//     || gameBoard.square4 === gameBoard.square5 && gameBoard.square5 === gameBoard.square6
//     || gameBoard.square7 === gameBoard.square8 && gameBoard.square8 === gameBoard.square9
//     || gameBoard.square1 === gameBoard.square4 && gameBoard.square4 === gameBoard.square7
//     || gameBoard.square2 === gameBoard.square5 && gameBoard.square5 === gameBoard.square8
//     || gameBoard.square3 === gameBoard.square6 && gameBoard.square6 === gameBoard.square9
//     || gameBoard.square1 === gameBoard.square5 && gameBoard.square5 === gameBoard.square9
//     || gameBoard.square3 === gameBoard.square5 && gameBoard.square5 === gameBoard.square7
//     ){
//         
//         
//     }
}

//funcion que finaliza el juego, resetea gameBoard y el tablerohtml
function endGame(){

}


