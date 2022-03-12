const d = document

//Objeto gameBoard para controlar el estado del tablero.
let gameBoard = {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0}

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

let squarePlayed, lastPlayer = playerB, winner=[]

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
    const posibleWinnerRows = []
    
    //Busca la casilla Jugada en los patrones ganadores.
    winnerPatters.forEach(function(element){
        if(element.includes(played)){          // Filtra los patrones ganadores en los que esta presente la casilla jugada.
        posibleWinnerRows.push(element)        // Guarda las lineas donde esta presente la casilla jugada en un array.
        }
     })

    posibleWinnerRows.forEach(function(element){  // Toma cada linea filtrada en el paso anterior.
        let [acum, cuentacero, cuentao, cuentax] = [0,0,0,0]

        element.forEach(function(element){        // evalua cada casilla de cada linea.
            if (gameBoard[element] === "x"){
                cuentax++
                acum++
            }else if (gameBoard[element] === "o"){ 
                cuentao++
                acum--
            }else if (gameBoard[element] === 0){
                cuentacero++
            }
        })

        //console.log(`acum=${acum} , cuentacero=${cuentacero} , cuentax=${cuentax}, cuentao=${cuentao}`);

        if(acum === 3 || acum === -3 ){                                 // Verfica si fue una linea ganadora.
            element.forEach(function(element) {                         //pinta la linea ganadora de rojo
                let cuadroact = d.getElementById(`${element}`)
                cuadroact.style.background = ("red")
            })

            setTimeout(function(){
                alert(`Fin del Juego. Gano ${lastPlayer.rol}`);
                endGame();
            }, 600);
        } 
    })
}

//funcion que finaliza el juego, resetea gameBoard y el tablerohtml
function endGame(){
    //Deshabilitar boton Reset y habilita boton Switch.
    btnSwitch.style.visibility = "visible"
    btnReset.style.visibility = "hidden"
   
    //Reiniciar valores
    squares.forEach ( element => element.setAttribute ("src", "./assets/img/empy.svg"))
    squares.forEach ( element => element.style.background = ("white"))
    gameBoard = {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0}

    
}