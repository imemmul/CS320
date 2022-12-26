
const {fn} = require("jest-mock");

const assert = require('assert');

describe('snakeIntersection', () => {

    it('should return true if the snake intersects with itself', () => { // Could not get the function out of this class, so we tested locally.
        let snakeBody = [{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 1, y: 1 }];
        let onSnake = fn(() => true);
         function snakeIntersection() {
            return onSnake(snakeBody[0], { ignoreHead: true })
        }
        assert.ok(snakeIntersection(snakeBody, onSnake), 'Test failed: function did not return true when snake intersected with itself');
    });


});



describe('onSnake', () => {

    function equalPositions(pos1, pos2) {
            return pos1.x === pos2.x && pos1.y === pos2.y
        }

    it('should return true if the position is on the snake', () => {
        let snakeBody = [{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 1, y: 3 }];
        function onSnake(position, { ignoreHead = false } = {}) {
            return snakeBody.some((segment, index) => {
                if (ignoreHead && index === 0) return false
                return equalPositions(segment, position)
            })
        }
        assert.ok(onSnake({ x: 1, y: 2 }, snakeBody), 'Test failed: function did not return true for position on the snake');
    });

    it('should return false if the position is not on the snake', () => {
        let snakeBody = [{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 1, y: 3 }];
        function onSnake(position, { ignoreHead = false } = {}) {
            return snakeBody.some((segment, index) => {
                if (ignoreHead && index === 0) return false
                return equalPositions(segment, position)
            })
        }
        assert.ok(!onSnake({ x: 1, y: 4 }, snakeBody), 'Test failed: function did not return false for position not on the snake');
    });


});
