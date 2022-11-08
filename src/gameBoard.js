
// Business Logic -----------------------------------

// Business Logic for Game Board
export default function GameBoard() {
  this.players = {};
  this.id = 0;
  this.turnId = 0;
  this.diceRoll = 0;
}

GameBoard.prototype.addPlayer = function(players) {
  players.id = this.assignId();
  this.players[players.id] = players;
};

GameBoard.prototype.assignId = function() {
  this.id += 1;
  return this.id;
};

GameBoard.prototype.roll = function() {
  return Math.round(Math.random() * (6-1) + 1);
};

// Business Logic for Player
function Player(name) {
  this.name = name;
  this.gameScore = 0;
  this.turnScore = 0;
}

// Game Turn Function

function newTurn(hold, player) {
 
  if (!hold) {
    gameBoard.diceRoll = gameBoard.roll();    
    if (gameBoard.diceRoll === 1) {
      console.log("dice roll === 1");
      player.turnScore = 0;
      if(gameBoard.turnId < Object.keys(gameBoard.players).length) {
        gameBoard.turnId += 1;
      }
      else {
        gameBoard.turnId = 1;
      }      
      console.log("Next Player: "+ gameBoard.players[gameBoard.turnId].name);
    } else {
      player.turnScore += gameBoard.diceRoll;
      console.log("player scores! " + player.turnScore);
    }
  } else {
    console.log("Turn Score: " + player.turnScore);
    player.gameScore += player.turnScore;
    
    player.turnScore = 0;
    
    if(gameBoard.turnId < Object.keys(gameBoard.players).length) {
      gameBoard.turnId += 1;
    }
    else {
      gameBoard.turnId = 1;
    }  
    console.log("Player Held: " + player.gameScore + "Next Player: " + gameBoard.players[gameBoard.turnId].name);
  } 
  checkEndGame(); 
  //console.log("Game Score:" + player.gameScore + "Turn Score: " + player.turnScore);
}

// UI Logic -----------------------------------
let gameBoard = new GameBoard();

function handleGameStart(e) {
  e.preventDefault();
// const addPlayer = document.querySelector("input#player-add")  
  const player1Input = document.querySelector("input#player1").value;
  const player2Input = document.querySelector("input#player2").value;
  let player1 = new Player(player1Input);
  let player2 = new Player(player2Input);
  gameBoard.addPlayer(player1);
  gameBoard.addPlayer(player2);
  gameBoard.turnId = 1;
  const holdButton = document.querySelector("button#hold");
  const rollButton = document.querySelector("button#roll");
  newTurn(false, player1); 
  displayTurn();
  holdButton.removeAttribute("disabled");
  rollButton.removeAttribute("disabled");
}

function displayTurn() {
  let currentPlayer = gameBoard.players[gameBoard.turnId].name;
  let turnScore = gameBoard.players[gameBoard.turnId].turnScore;
  let currentScore = gameBoard.players[gameBoard.turnId].gameScore;
  document.getElementById("player-name").innerText = currentPlayer;
  document.getElementById("turn-score").innerText = turnScore;
  document.getElementById("current-score").innerText = currentScore;
  document.getElementById("dice-roll").innerText = gameBoard.diceRoll;
  
}

function handleHold(e) {
  e.preventDefault();
  let player = gameBoard.players[gameBoard.turnId];  
  newTurn(true, player);
  displayTurn();
}

function handleRoll(e) {
  e.preventDefault();
  let player = gameBoard.players[gameBoard.turnId];
  newTurn(false, player);
  displayTurn();
}

function checkEndGame() {
  if (gameBoard.players[gameBoard.turnId].gameScore >= 100) {
    console.log("score is 100," + gameBoard.players[gameBoard.turnId].name +" wins!");
    document.getElementById("turnDiv").append(gameBoard.players[gameBoard.turnId].name + " Won!");
    document.querySelector("button#roll").setAttribute("disabled");
    document.querySelector("button#hold").setAttribute("disabled");
    }
    return 0;
}

window.addEventListener("load", function () {
  document.querySelector("form#form").addEventListener("submit", handleGameStart);
  document.querySelector("button#hold").addEventListener("click", handleHold);
  document.querySelector("button#roll").addEventListener("click", handleRoll);
});