const cells = document.getElementsByClassName("cell");
const restart = document.getElementById("btn");
const statusText = document.getElementById("statusText");
let gameFinished = false;
let turnO=true
const cellArray = Array.from(cells)
const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

const WinSound = new Audio('Sounds/WinSound.mp3')


cellArray.forEach((cell) => {
    cell.addEventListener("click",()=>{
        if(!gameFinished && cell.innerText===""){
           if(turnO){
                 cell.innerText="O"
                 turnO=false
                }
            else{
                cell.innerText="X"
                turnO=true
            }}
            checkWinner();
    
    },)
});


function checkWinner(){
    for (let patterns of winConditions) {
        let pos1 =cellArray[patterns[0]].innerText;
        let pos2 =cellArray[patterns[1]].innerText;
        let pos3 =cellArray[patterns[2]].innerText;
        if(pos1!=="" && pos2!=="" && pos3!=="")
        if(pos1===pos2 && pos2===pos3){
            statusText.innerText=`Player ${pos1} won`;
            WinSound.play()
            statusText.classList.remove("hide")
            gameFinished=true
        }
    }
    if (!cellArray.some(cell => cell.innerText === "")) {
        statusText.innerText = "It's a tie!";
        statusText.classList.remove("hide");
        gameFinished = true;
    }
}

function restartGame(){
    turnO=true;
    cellArray.forEach(cell=>cell.textContent="")
    statusText.innerText=""
    WinSound.pause()
    WinSound.currentTime=0
    gameFinished=false
}

restart.addEventListener("click",restartGame,)