import { describe, expect, test } from "@jest/globals";
import {
    diceTypeToMaxNumber,
    rollDice,
    rollTwoD20,
    selectDiceByAdvantageType,
} from "../../src/helperFunctions/rollDice";

describe("diceTypeToMaxNumber", () => {
    test("should return 4 for d4", () => {
        expect(diceTypeToMaxNumber("d4")).toBe(4);
    });
    test("should return 6 for d6", () => {
        expect(diceTypeToMaxNumber("d6")).toBe(6);
    });
    test("should return 8 for d8", () => {
        expect(diceTypeToMaxNumber("d8")).toBe(8);
    });
    test("should return 10 for d10", () => {
        expect(diceTypeToMaxNumber("d10")).toBe(10);
    });
    test("should return 12 for d12", () => {
        expect(diceTypeToMaxNumber("d12")).toBe(12);
    });
    test("should return 20 for d20", () => {
        expect(diceTypeToMaxNumber("d20")).toBe(20);
    });
    test("should return 100 for d100", () => {
        expect(diceTypeToMaxNumber("d100")).toBe(100);
    });
});

describe("rollDice", () => {
    const numberOfRolls: number = 10000;
    test("should return a number between 1 and 4 for d4", () => {
        const diceSize: number = 4;
        const minNumOfRolls: number = (0.9 * numberOfRolls) / diceSize;
        const maxNumOfRolls: number = (1.1 * numberOfRolls) / diceSize;
        const stats = {};

        for (let i = 0; i < numberOfRolls; i++) {
            const result = rollDice("d4");
            expect(result).toBeGreaterThanOrEqual(1);
            expect(result).toBeLessThanOrEqual(diceSize);
            if (stats[result]) {
                stats[result] += 1;
            } else {
                stats[result] = 1;
            }
        }
        expect(Object.keys(stats).length).toBe(diceSize);
        for (let i = 1; i <= diceSize; i++) {
            expect(stats[i]).toBeGreaterThanOrEqual(minNumOfRolls);
            expect(stats[i]).toBeLessThanOrEqual(maxNumOfRolls);
        }
    });

    test("should return a number between 1 and 6 for d6", () => {
        const diceSize: number = 6;
        const minNumOfRolls: number = (0.9 * numberOfRolls) / diceSize;
        const maxNumOfRolls: number = (1.1 * numberOfRolls) / diceSize;
        const stats = {};

        for (let i = 0; i < numberOfRolls; i++) {
            const result = rollDice("d6");
            expect(result).toBeGreaterThanOrEqual(1);
            expect(result).toBeLessThanOrEqual(diceSize);
            if (stats[result]) {
                stats[result] += 1;
            } else {
                stats[result] = 1;
            }
        }
        expect(Object.keys(stats).length).toBe(diceSize);
        for (let i = 1; i <= diceSize; i++) {
            expect(stats[i]).toBeGreaterThanOrEqual(minNumOfRolls);
            expect(stats[i]).toBeLessThanOrEqual(maxNumOfRolls);
        }
    });

    test("should return a number between 1 and 8 for d8", () => {
        const diceSize: number = 8;
        const minNumOfRolls: number = (0.9 * numberOfRolls) / diceSize;
        const maxNumOfRolls: number = (1.1 * numberOfRolls) / diceSize;
        const stats = {};

        for (let i = 0; i < numberOfRolls; i++) {
            const result = rollDice("d8");
            expect(result).toBeGreaterThanOrEqual(1);
            expect(result).toBeLessThanOrEqual(diceSize);
            if (stats[result]) {
                stats[result] += 1;
            } else {
                stats[result] = 1;
            }
        }
        expect(Object.keys(stats).length).toBe(diceSize);
        for (let i = 1; i <= diceSize; i++) {
            expect(stats[i]).toBeGreaterThanOrEqual(minNumOfRolls);
            expect(stats[i]).toBeLessThanOrEqual(maxNumOfRolls);
        }
    });

    test("should return a number between 1 and 10 for d10", () => {
        const diceSize: number = 10;
        const minNumOfRolls: number = (0.9 * numberOfRolls) / diceSize;
        const maxNumOfRolls: number = (1.1 * numberOfRolls) / diceSize;
        const stats = {};

        for (let i = 0; i < numberOfRolls; i++) {
            const result = rollDice("d10");
            expect(result).toBeGreaterThanOrEqual(1);
            expect(result).toBeLessThanOrEqual(diceSize);
            if (stats[result]) {
                stats[result] += 1;
            } else {
                stats[result] = 1;
            }
        }
        expect(Object.keys(stats).length).toBe(diceSize);
        for (let i = 1; i <= diceSize; i++) {
            expect(stats[i]).toBeGreaterThanOrEqual(minNumOfRolls);
            expect(stats[i]).toBeLessThanOrEqual(maxNumOfRolls);
        }
    });

    test("should return a number between 1 and 12 for d12", () => {
        const diceSize: number = 12;
        const minNumOfRolls: number = (0.9 * numberOfRolls) / diceSize;
        const maxNumOfRolls: number = (1.1 * numberOfRolls) / diceSize;
        const stats = {};

        for (let i = 0; i < numberOfRolls; i++) {
            const result = rollDice("d12");
            expect(result).toBeGreaterThanOrEqual(1);
            expect(result).toBeLessThanOrEqual(diceSize);
            if (stats[result]) {
                stats[result] += 1;
            } else {
                stats[result] = 1;
            }
        }
        expect(Object.keys(stats).length).toBe(diceSize);
        for (let i = 1; i <= diceSize; i++) {
            expect(stats[i]).toBeGreaterThanOrEqual(minNumOfRolls);
            expect(stats[i]).toBeLessThanOrEqual(maxNumOfRolls);
        }
    });

    test("should return a number between 1 and 20 for d20", () => {
        const numberOfRolls: number = 100000;
        const diceSize: number = 20;
        const minNumOfRolls: number = (0.9 * numberOfRolls) / diceSize;
        const maxNumOfRolls: number = (1.1 * numberOfRolls) / diceSize;
        const stats = {};

        for (let i = 0; i < numberOfRolls; i++) {
            const result = rollDice("d20");
            expect(result).toBeGreaterThanOrEqual(1);
            expect(result).toBeLessThanOrEqual(diceSize);
            if (stats[result]) {
                stats[result] += 1;
            } else {
                stats[result] = 1;
            }
        }
        expect(Object.keys(stats).length).toBe(diceSize);
        for (let i = 1; i <= diceSize; i++) {
            expect(stats[i]).toBeGreaterThanOrEqual(minNumOfRolls);
            expect(stats[i]).toBeLessThanOrEqual(maxNumOfRolls);
        }
    });

    test("should return a number between 1 and 100 for d100", () => {
        const numberOfRolls: number = 100000;
        const diceSize: number = 100;
        const minNumOfRolls: number = (0.9 * numberOfRolls) / diceSize;
        const maxNumOfRolls: number = (1.1 * numberOfRolls) / diceSize;
        const stats = {};

        for (let i = 0; i < numberOfRolls; i++) {
            const result = rollDice("d100");
            expect(result).toBeGreaterThanOrEqual(1);
            expect(result).toBeLessThanOrEqual(diceSize);
            if (stats[result]) {
                stats[result] += 1;
            } else {
                stats[result] = 1;
            }
        }
        expect(Object.keys(stats).length).toBe(diceSize);
        for (let i = 1; i <= diceSize; i++) {
            expect(stats[i]).toBeGreaterThanOrEqual(minNumOfRolls);
            expect(stats[i]).toBeLessThanOrEqual(maxNumOfRolls);
        }
    });
});

describe("rollTwoD20", () => {
    test("should return two numbers between 1 and 20", () => {
        for (let i = 0; i < 10000; i++) {
            const result = rollTwoD20();
            expect(result.firstRoll).toBeGreaterThanOrEqual(1);
            expect(result.firstRoll).toBeLessThanOrEqual(20);
            expect(result.secondRoll).toBeGreaterThanOrEqual(1);
            expect(result.secondRoll).toBeLessThanOrEqual(20);
        }
    });
});

describe("selectDiceByAdvantageType", () => {
    test("should return the first roll for Normal advantage", () => {
        const firstRoll = 10;
        const secondRoll = 15;
        expect(selectDiceByAdvantageType(firstRoll, secondRoll, "Normal")).toBe(
            firstRoll
        );
    });

    test("should return the higher roll for Advantage advantage", () => {
        const firstRoll = 10;
        const secondRoll = 15;
        expect(
            selectDiceByAdvantageType(firstRoll, secondRoll, "Advantage")
        ).toBe(secondRoll);
    });

    test("should return the lower roll for Disadvantage advantage", () => {
        const firstRoll = 10;
        const secondRoll = 15;
        expect(
            selectDiceByAdvantageType(firstRoll, secondRoll, "Disadvantage")
        ).toBe(firstRoll);
    });

    test("should return the first roll for Normal advantage when second roll is 0", () => {
        const firstRoll = 10;
        expect(selectDiceByAdvantageType(firstRoll, 0, "Normal")).toBe(
            firstRoll
        );
    });

    test("should return the 20 when both rolls are 20 and advantage type is 'Normal'", () => {
        const firstRoll = 20;
        const secondRoll = 20;
        expect(selectDiceByAdvantageType(firstRoll, secondRoll, "Normal")).toBe(
            firstRoll
        );
    });

    test("should return the 20 when both rolls are 20 and advantage type is 'Advantage'", () => {
        const firstRoll = 20;
        const secondRoll = 20;
        expect(
            selectDiceByAdvantageType(firstRoll, secondRoll, "Advantage")
        ).toBe(firstRoll);
    });

    test("should return the 20 when both rolls are 20 and advantage type is 'Disadvantage'", () => {
        const firstRoll = 20;
        const secondRoll = 20;
        expect(
            selectDiceByAdvantageType(firstRoll, secondRoll, "Disadvantage")
        ).toBe(firstRoll);
    });

    test("should return 20 when first roll is 20 and second roll is 1 and advantage type is 'Advantage'", () => {
        const firstRoll = 20;
        const secondRoll = 1;
        expect(
            selectDiceByAdvantageType(firstRoll, secondRoll, "Advantage")
        ).toBe(firstRoll);
    });

    test("should return 1 when first roll is 20 and second roll is 1 and advantage type is 'Disadvantage'", () => {
        const firstRoll = 20;
        const secondRoll = 1;
        expect(
            selectDiceByAdvantageType(firstRoll, secondRoll, "Disadvantage")
        ).toBe(secondRoll);
    });
});
