const { add, subtract, multiply, divide } = require('../src/calculator');

describe('Calculator Tests', () => {

    test('add: 5 + 3 should equal 8', () => {
        expect(add(5, 3)).toBe(8);
    });

    test('add: negative numbers', () => {
        expect(add(-5, 3)).toBe(-2);
    });

    test('subtract: 10 - 4 should equal 6', () => {
        expect(subtract(10, 4)).toBe(6);
    });

    test('subtract: result can be negative', () => {
        expect(subtract(2, 5)).toBe(-3);
    });

    test('multiply: 6 * 7 should equal 42', () => {
        expect(multiply(6, 7)).toBe(42);
    });

    test('multiply: anything by 0 equals 0', () => {
        expect(multiply(5, 0)).toBe(0);
    });

    test('divide: 20 / 4 should equal 5', () => {
        expect(divide(20, 4)).toBe(5);
    });

    test('divide: should throw error on divide by zero', () => {
        expect(() => divide(10, 0)).toThrow('Cannot divide by zero');
    });
});
