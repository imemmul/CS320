const assert = require('assert');
const {fn} = require("jest-mock");

describe('checkDeath', () => {
    it('should wrap the snake around the grid if it goes off the top edge', () => {
        let getSnakeHead = jest.fn(() => ({ x: 10, y: 0 }));
        assert.deepStrictEqual(getSnakeHead.x,getSnakeHead.y, { x: 10, y: 21 }, 'Test failed: snake was not wrapped around the grid when it went off the top edge');
    });
});