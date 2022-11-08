import {GameBoard, Player} from './../src/gameBoard.js/';

describe('Gameboard', ()=> {
  
  test('should create a player object with a name', () => {
    
    const player = new Player('Del');
    expect(player.name).toEqual('Del');
  });

  test('should correctly add a player to gameboard', () => {
    const gameBoard = new GameBoard();
    let player = new Player('Vera');
    gameBoard.addPlayer(player);
    expect(gameBoard.players).toContain(player);
  });
});

