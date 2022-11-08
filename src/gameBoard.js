
// Business Logic -----------------------------------

// Business Logic for Game Board
export function GameBoard() {
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
export function Player(name) {
  this.name = name;
  this.gameScore = 0;
  this.turnScore = 0;
}

// Game Turn Function

export function NewTurn(hold, player) {
 
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