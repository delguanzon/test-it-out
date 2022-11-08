
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

//Business Logic for NewTurn

