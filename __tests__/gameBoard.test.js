import {GameBoard, Player} from './../src/gameBoard.js/';

describe('Gameboard', ()=> {
  
  test('should create a player object with a name', () => {
    
    const player = new Player('Del');
    expect(player.name).toEqual('Del');
  });

});