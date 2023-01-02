import { describe, expect, it } from "vitest";
import { calculateExpression } from "./Calculadora";

describe('calculateExpression', () => {
    it('Should execute corretly sum between two numbers with + sign', () => {
        expect(calculateExpression('1+1')).toBe(2);
        expect(calculateExpression('5+5')).toBe(10);
        expect(calculateExpression('77+11')).toBe(88);
    });

    it('Should execute corretly substracts between two numbers with - sign', () => {
        expect(calculateExpression("1-1")).toBe(0);
        expect(calculateExpression("10-1")).toBe(9);
        expect(calculateExpression("11-12")).toBe(-1);
    });

    it('Should execute corretly multiples between two numbers with x sign', () => {
        expect(calculateExpression("1x1")).toBe(1);
    expect(calculateExpression("10x0")).toBe(0);
    expect(calculateExpression("11x-12")).toBe(-132);
    });

    it('Should execute corretly divides between two numbers with ÷ sign', () => {
        expect(calculateExpression("1÷1")).toBe(1);
    expect(calculateExpression("10÷2")).toBe(5);
    expect(calculateExpression("144÷12")).toBe(12);
    });

    it('division by 0 returns 0 and logs exception', () => {
        expect(calculateExpression('1÷0')).toBe(undefined);
        
    });
});