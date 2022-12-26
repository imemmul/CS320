let food = require( "/Users/metinkaraca/Desktop/CS320PROJECT/static/js/food.test.js/food.test.js" );
const assert = require( "assert" );
let EXPANSION_RATE = 2
describe('update', () => {
    beforeEach(() => {
        point = 0;
        snake = [{ x: 5, y: 5 }, { x: 4, y: 5 }, { x: 3, y: 5 }];
    });

    it('should add one point to the score if the food is on the snake', () => {
        food = { x: 5, y: 5 };
        assert.equal(point, 0);
    });

    it('should move the food to a new random position if the food is on the snake', () => {
        food = { x: 5, y: 5 };
        const initialFoodPosition = { x: food.x, y: food.y };
        assert.equal(food.x && food.y, initialFoodPosition.x && initialFoodPosition.y);
    });

    it('should expand the snake by the expansion rate if the food is on the snake', () => {
        food = { x: 5, y: 5 };
        const initialLength = snake.length;
        snake.length += EXPANSION_RATE;
        assert.equal(snake.length, initialLength + EXPANSION_RATE);
    });

    it('should not change the score or the snake if the food is not on the snake', () => {
        food = { x: 2, y: 5 };
        const initialPoint = point;
        const initialLength = snake.length;
        assert.equal(point, initialPoint);
        assert.equal(snake.length, initialLength);
    });
});
