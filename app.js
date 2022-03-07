const d = document

//Objeto gameBoard para controlar el estado del tablero.
let gameBoard = {
    1:0, 2:0, 3:0,
    4:0, 5:0, 6:0,
    7:0, 8:0, 9:0
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
    //Deshabilitar boton Switch y habilita boton Reset.
    btnSwitch.style.visibility = "hidden"
    btnReset.style.visibility = "visible"

    //identifica la casilla clickeada.
    squarePlayed = d.getElementById(`${Event.target.id}`);
    
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
         
    const played = Number(squarePlayed.id)
    let acum = 0

        //Busca la casilla Jugada en los patrones ganadores.
        winnerPatters.forEach(function(element){
            if(element.includes(played)){           // Filtra los patrones ganadores en los que esta presente la casilla jugada.
                element.forEach(function(element){  // Evalua cada casilla de las lineas, de cada patron ganador filtrado.
                    if (gameBoard[element] === 0){  //si alguna de las casilla de la linea en evaluacion no ha sido jugada (vale 0 en el tablero) no hay ganador.
                        return
                    }else{                                                        
                        if (gameBoard[element] === "x" ){ acum++ }else { acum--} // cada x suma 1, cada O resta 1, al final solo si acum vale 4 o -4 singifica que huvo un ganador
               }
            })
        console.log(acum);
        }

    if(acum === 4 || acum === -4 ){
        acum = 0
        endGame()
    }
    })
    
}

//funcion que finaliza el juego, resetea gameBoard y el tablerohtml
function endGame(){
    //Deshabilitar boton Reset y habilita boton Switch.
    btnSwitch.style.visibility = "visible"
    btnReset.style.visibility = "hidden"
   alert(`Fin del Juego. Gano ${lastPlayer.rol}`);

   //Reiniciar valores
   squares.forEach ( element => element.setAttribute ("src", "./assets/img/empy.svg"))

   gameBoard = {
    1:0, 2:0, 3:0,
    4:0, 5:0, 6:0,
    7:0, 8:0, 9:0
}

}