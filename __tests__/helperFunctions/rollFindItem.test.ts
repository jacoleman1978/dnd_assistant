import { describe, expect, test } from "@jest/globals";
import {
    isItemFoundByPercent,
    rollMagicItemCost,
    findItemByRarity,
} from "../../src/helperFunctions/rollFindItem";

describe("isItemFoundByPercent", () => {
    test("should throw an error if findPercent is less than 0", () => {
        expect(() => isItemFoundByPercent(-1, 10, 20)).toThrow(
            "Find percentage must be between 0 and 100 for isItemFoundByPercent."
        );
    });

    test("should throw an error if findPercent is greater than 100", () => {
        expect(() => isItemFoundByPercent(101, 10, 20)).toThrow(
            "Find percentage must be between 0 and 100 for isItemFoundByPercent."
        );
    });

    test("should throw an error if percentOne is less than 0", () => {
        expect(() => isItemFoundByPercent(10, -1, 20)).toThrow(
            "First percentage must be between 0 and 100 for isItemFoundByPercent."
        );
    });

    test("should throw an error if percentOne is greater than 100", () => {
        expect(() => isItemFoundByPercent(10, 101, 20)).toThrow(
            "First percentage must be between 0 and 100 for isItemFoundByPercent."
        );
    });

    test("should throw an error if percentTwo is less than 0", () => {
        expect(() => isItemFoundByPercent(10, 10, -1)).toThrow(
            "Second percentage must be between 0 and 100 for isItemFoundByPercent."
        );
    });

    test("should throw an error if percentTwo is greater than 100", () => {
        expect(() => isItemFoundByPercent(10, 10, 101)).toThrow(
            "Second percentage must be between 0 and 100 for isItemFoundByPercent."
        );
    });

    test("should return true if the difference is less than or equal to the rarityMap value for 'Common' rarity, 50%", () => {
        const percentOne = 50;
        const percentTwo = 51;

        const result = isItemFoundByPercent(50, percentOne, percentTwo);

        expect(result).toBe(true);
    });

    test("should return true if the difference is less than or equal to the rarityMap value for 'Common' rarity, 50%", () => {
        const percentOne = 51;
        const percentTwo = 50;

        const result = isItemFoundByPercent(50, percentOne, percentTwo);

        expect(result).toBe(true);
    });

    test("should return false if the difference is greater than the rarityMap value for 'Common' rarity, 50%", () => {
        const percentOne = 10;
        const percentTwo = 61;

        const result = isItemFoundByPercent(50, percentOne, percentTwo);

        expect(result).toBe(false);
    });

    test("should return true if the difference is less than or equal to the rarityMap value for 'Uncommon' rarity, 30%", () => {
        const percentOne = 30;
        const percentTwo = 31;

        const result = isItemFoundByPercent(30, percentOne, percentTwo);

        expect(result).toBe(true);
    });

    test("should return true if the difference is less than or equal to the rarityMap value for 'Uncommon' rarity, 30%", () => {
        const percentOne = 31;
        const percentTwo = 30;

        const result = isItemFoundByPercent(30, percentOne, percentTwo);

        expect(result).toBe(true);
    });

    test("should return false if the difference is greater than the rarityMap value for 'Uncommon' rarity, 30%", () => {
        const percentOne = 10;
        const percentTwo = 41;

        const result = isItemFoundByPercent(30, percentOne, percentTwo);

        expect(result).toBe(false);
    });

    test("should return true if the difference is less than or equal to the rarityMap value for 'Rare' rarity, 15%", () => {
        const percentOne = 15;
        const percentTwo = 16;

        const result = isItemFoundByPercent(15, percentOne, percentTwo);

        expect(result).toBe(true);
    });

    test("should return true if the difference is less than or equal to the rarityMap value for 'Rare' rarity, 15%", () => {
        const percentOne = 16;
        const percentTwo = 15;

        const result = isItemFoundByPercent(15, percentOne, percentTwo);

        expect(result).toBe(true);
    });

    test("should return false if the difference is greater than the rarityMap value for 'Rare' rarity, 15%", () => {
        const itemRarity = "Rare";
        const percentOne = 10;
        const percentTwo = 26;

        const result = isItemFoundByPercent(15, percentOne, percentTwo);

        expect(result).toBe(false);
    });

    test("should return true if the difference is less than or equal to the rarityMap value for 'Very rare' rarity, 10%", () => {
        const percentOne = 10;
        const percentTwo = 11;

        const result = isItemFoundByPercent(10, percentOne, percentTwo);

        expect(result).toBe(true);
    });

    test("should return true if the difference is less than or equal to the rarityMap value for 'Very rare' rarity, 10%", () => {
        const percentOne = 11;
        const percentTwo = 10;

        const result = isItemFoundByPercent(10, percentOne, percentTwo);

        expect(result).toBe(true);
    });

    test("should return false if the difference is greater than the rarityMap value for 'Very rare' rarity, 10%", () => {
        const percentOne = 10;
        const percentTwo = 21;

        const result = isItemFoundByPercent(10, percentOne, percentTwo);

        expect(result).toBe(false);
    });

    test("should return true if the difference is less than or equal to the rarityMap value for 'Legendary' rarity, 1%", () => {
        const percentOne = 1;
        const percentTwo = 2;

        const result = isItemFoundByPercent(1, percentOne, percentTwo);

        expect(result).toBe(true);
    });

    test("should return true if the difference is less than or equal to the rarityMap value for 'Legendary' rarity, 1%", () => {
        const percentOne = 2;
        const percentTwo = 1;

        const result = isItemFoundByPercent(1, percentOne, percentTwo);

        expect(result).toBe(true);
    });

    test("should return false if the difference is greater than the rarityMap value for 'Legendary' rarity, 1%", () => {
        const percentOne = 1;
        const percentTwo = 6;

        const result = isItemFoundByPercent(1, percentOne, percentTwo);

        expect(result).toBe(false);
    });
});

describe("rollMagicItemCost", () => {
    test("should return the cost of a Common magic item", () => {
        const itemRarity = "Common";

        for (let i = 0; i < 1000; i++) {
            const result = rollMagicItemCost(itemRarity);

            expect(result).toBeGreaterThanOrEqual(20);
            expect(result).toBeLessThanOrEqual(700);
        }
    });

    test("should return the cost of an Uncommon magic item", () => {
        const itemRarity = "Uncommon";

        for (let i = 0; i < 1000; i++) {
            const result = rollMagicItemCost(itemRarity);

            expect(result).toBeGreaterThanOrEqual(100);
            expect(result).toBeLessThanOrEqual(600);
        }
    });

    test("should return the cost of a Rare magic item", () => {
        const itemRarity = "Rare";

        for (let i = 0; i < 1000; i++) {
            const result = rollMagicItemCost(itemRarity);

            expect(result).toBeGreaterThanOrEqual(2000);
            expect(result).toBeLessThanOrEqual(20000);
        }
    });

    test("should return the cost of a Very rare magic item", () => {
        const itemRarity = "Very rare";

        for (let i = 0; i < 1000; i++) {
            const result = rollMagicItemCost(itemRarity);

            expect(result).toBeGreaterThanOrEqual(20000);
            expect(result).toBeLessThanOrEqual(50000);
        }
    });

    test("should return the cost of a Legendary magic item", () => {
        const itemRarity = "Legendary";

        for (let i = 0; i < 1000; i++) {
            const result = rollMagicItemCost(itemRarity);

            expect(result).toBeGreaterThanOrEqual(50000);
            expect(result).toBeLessThanOrEqual(300000);
        }
    });
});

describe("findItemByRarity", () => {
    test("should throw an error if findModifier is less than -100", () => {
        expect(() => findItemByRarity("Common", -101)).toThrow(
            "Find modifier must be between -100 and 100 for findItemByRarity."
        );
    });

    test("should return a message whether a magic item was found or not for 'Common' rarity", () => {
        const message: string = findItemByRarity("Common");

        expect(message).toMatch(
            /Common has a 50% find percentage and you rolled a \d+%./
        );
    });

    test("should return a message whether a magic item was found or not for 'Uncommon' rarity", () => {
        const message: string = findItemByRarity("Uncommon");

        expect(message).toMatch(
            /Uncommon has a 30% find percentage and you rolled a \d+%./
        );
    });

    test("should return a message whether a magic item was found or not for 'Rare' rarity", () => {
        const message: string = findItemByRarity("Rare");

        expect(message).toMatch(
            /Rare has a 15% find percentage and you rolled a \d+%./
        );
    });

    test("should return a message whether a magic item was found or not for 'Very rare' rarity", () => {
        const message: string = findItemByRarity("Very rare");

        expect(message).toMatch(
            /Very rare has a 10% find percentage and you rolled a \d+%./
        );
    });

    test("should return a message whether a magic item was found or not for 'Legendary' rarity", () => {
        const message: string = findItemByRarity("Legendary");

        expect(message).toMatch(
            /Legendary has a 1% find percentage and you rolled a \d+%./
        );
    });

    test("should return an item not found message when the findModifier makes the find percentage <= 0", () => {
        let message: string = findItemByRarity("Common", -60);
        expect(message).toMatch(
            /Common has a 0% find percentage and you rolled a \d+%./
        );

        message = findItemByRarity("Uncommon", -30);
        expect(message).toMatch(
            /Uncommon has a 0% find percentage and you rolled a \d+%./
        );

        message = findItemByRarity("Rare", -15);
        expect(message).toMatch(
            /Rare has a 0% find percentage and you rolled a \d+%./
        );

        message = findItemByRarity("Very rare", -10);
        expect(message).toMatch(
            /Very rare has a 0% find percentage and you rolled a \d+%./
        );

        message = findItemByRarity("Legendary", -1);
        expect(message).toMatch(
            /Legendary has a 0% find percentage and you rolled a \d+%./
        );
    });

    test("should return an item found message when the findModifier makes the find percentage >= 100", () => {
        let message: string = findItemByRarity("Common", 60);
        expect(message).toMatch(
            /Common has a 100% find percentage and you rolled a \d+%./
        );

        message = findItemByRarity("Uncommon", 70);
        expect(message).toMatch(
            /Uncommon has a 100% find percentage and you rolled a \d+%./
        );

        message = findItemByRarity("Rare", 85);
        expect(message).toMatch(
            /Rare has a 100% find percentage and you rolled a \d+%./
        );

        message = findItemByRarity("Very rare", 90);
        expect(message).toMatch(
            /Very rare has a 100% find percentage and you rolled a \d+%./
        );

        message = findItemByRarity("Legendary", 99);
        expect(message).toMatch(
            /Legendary has a 100% find percentage and you rolled a \d+%./
        );
    });

    test("should return a message whether a magic item was found or not for 'Common' rarity with a find modifier", () => {
        const message: string = findItemByRarity("Common", 10);

        expect(message).toMatch(
            /Common has a 60% find percentage and you rolled a \d+%./
        );
    });
});
