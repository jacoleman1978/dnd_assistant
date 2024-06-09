import { describe, expect, test } from "@jest/globals";
import { isItemFoundByRarity, rollMagicItemCost, findItemByRarity } from "../../src/helperFunctions/rollFindItem";

describe("isItemFoundByRarity", () => {
    test("should return true if the difference is less than or equal to the rarityMap value for 'Common' rarity", () => {
        const itemRarity = "Common";
        const percentOne = 50;
        const percentTwo = 51;

        const result = isItemFoundByRarity(itemRarity, percentOne, percentTwo);

        expect(result).toBe(true);
    });

    test("should return true if the difference is less than or equal to the rarityMap value for 'Common' rarity", () => {
        const itemRarity = "Common";
        const percentOne = 51;
        const percentTwo = 50;

        const result = isItemFoundByRarity(itemRarity, percentOne, percentTwo);

        expect(result).toBe(true);
    });

    test("should return false if the difference is greater than the rarityMap value for 'Common' rarity", () => {
        const itemRarity = "Common";
        const percentOne = 10;
        const percentTwo = 61;

        const result = isItemFoundByRarity(itemRarity, percentOne, percentTwo);

        expect(result).toBe(false);
    });

    test("should return true if the difference is less than or equal to the rarityMap value for 'Uncommon' rarity", () => {
        const itemRarity = "Uncommon";
        const percentOne = 30;
        const percentTwo = 31;

        const result = isItemFoundByRarity(itemRarity, percentOne, percentTwo);

        expect(result).toBe(true);
    });

    test("should return true if the difference is less than or equal to the rarityMap value for 'Uncommon' rarity", () => {
        const itemRarity = "Uncommon";
        const percentOne = 31;
        const percentTwo = 30;

        const result = isItemFoundByRarity(itemRarity, percentOne, percentTwo);

        expect(result).toBe(true);
    });

    test("should return false if the difference is greater than the rarityMap value for 'Uncommon' rarity", () => {
        const itemRarity = "Uncommon";
        const percentOne = 10;
        const percentTwo = 41;

        const result = isItemFoundByRarity(itemRarity, percentOne, percentTwo);

        expect(result).toBe(false);
    });

    test("should return true if the difference is less than or equal to the rarityMap value for 'Rare' rarity", () => {
        const itemRarity = "Rare";
        const percentOne = 15;
        const percentTwo = 16;

        const result = isItemFoundByRarity(itemRarity, percentOne, percentTwo);

        expect(result).toBe(true);
    });

    test("should return true if the difference is less than or equal to the rarityMap value for 'Rare' rarity", () => {
        const itemRarity = "Rare";
        const percentOne = 16;
        const percentTwo = 15;

        const result = isItemFoundByRarity(itemRarity, percentOne, percentTwo);

        expect(result).toBe(true);
    });

    test("should return false if the difference is greater than the rarityMap value for 'Rare' rarity", () => {
        const itemRarity = "Rare";
        const percentOne = 10;
        const percentTwo = 26;

        const result = isItemFoundByRarity(itemRarity, percentOne, percentTwo);

        expect(result).toBe(false);
    });

    test("should return true if the difference is less than or equal to the rarityMap value for 'Very rare' rarity", () => {
        const itemRarity = "Very rare";
        const percentOne = 10;
        const percentTwo = 11;

        const result = isItemFoundByRarity(itemRarity, percentOne, percentTwo);

        expect(result).toBe(true);
    });

    test("should return true if the difference is less than or equal to the rarityMap value for 'Very rare' rarity", () => {
        const itemRarity = "Very rare";
        const percentOne = 11;
        const percentTwo = 10;

        const result = isItemFoundByRarity(itemRarity, percentOne, percentTwo);

        expect(result).toBe(true);
    });

    test("should return false if the difference is greater than the rarityMap value for 'Very rare' rarity", () => {
        const itemRarity = "Very rare";
        const percentOne = 10;
        const percentTwo = 21;

        const result = isItemFoundByRarity(itemRarity, percentOne, percentTwo);

        expect(result).toBe(false);
    });

    test("should return true if the difference is less than or equal to the rarityMap value for 'Legendary' rarity", () => {
        const itemRarity = "Legendary";
        const percentOne = 1;
        const percentTwo = 2;

        const result = isItemFoundByRarity(itemRarity, percentOne, percentTwo);

        expect(result).toBe(true);
    });

    test("should return true if the difference is less than or equal to the rarityMap value for 'Legendary' rarity", () => {
        const itemRarity = "Legendary";
        const percentOne = 2;
        const percentTwo = 1;

        const result = isItemFoundByRarity(itemRarity, percentOne, percentTwo);

        expect(result).toBe(true);
    });

    test("should return false if the difference is greater than the rarityMap value for 'Legendary' rarity", () => {
        const itemRarity = "Legendary";
        const percentOne = 1;
        const percentTwo = 6;

        const result = isItemFoundByRarity(itemRarity, percentOne, percentTwo);

        expect(result).toBe(false);
    });
});

describe("rollMagicItemCost", () => {
    test("should return the cost of a Common magic item", () => {
        const itemRarity = "Common";

        const result = rollMagicItemCost(itemRarity);

        expect(result).toBeGreaterThanOrEqual(100);
        expect(result).toBeLessThanOrEqual(600);
    });

    test("should return the cost of an Uncommon magic item", () => {
        const itemRarity = "Uncommon";

        const result = rollMagicItemCost(itemRarity);

        expect(result).toBeGreaterThanOrEqual(100);
        expect(result).toBeLessThanOrEqual(600);
    });

    test("should return the cost of a Rare magic item", () => {
        const itemRarity = "Rare";

        const result = rollMagicItemCost(itemRarity);

        expect(result).toBeGreaterThanOrEqual(1000);
        expect(result).toBeLessThanOrEqual(20000);
    });

    test("should return the cost of a Very rare magic item", () => {
        const itemRarity = "Very rare";

        const result = rollMagicItemCost(itemRarity);

        expect(result).toBeGreaterThanOrEqual(10000);
        expect(result).toBeLessThanOrEqual(50000);
    });

    test("should return the cost of a Legendary magic item", () => {
        const itemRarity = "Legendary";

        const result = rollMagicItemCost(itemRarity);

        expect(result).toBeGreaterThanOrEqual(25000);
        expect(result).toBeLessThanOrEqual(150000);
    });
});

describe("findItemByRarity", () => {
    test("should return a message whether a magic item was found or not for 'Common' rarity", () => {
        const message: string = findItemByRarity("Common");

        expect(message).toMatch(/Common has a 50% find percentage and you rolled a \d+%./);
    });

    test("should return a message whether a magic item was found or not for 'Uncommon' rarity", () => {
        const message: string = findItemByRarity("Uncommon");

        expect(message).toMatch(/Uncommon has a 30% find percentage and you rolled a \d+%./);
    });

    test("should return a message whether a magic item was found or not for 'Rare' rarity", () => {
        const message: string = findItemByRarity("Rare");

        expect(message).toMatch(/Rare has a 15% find percentage and you rolled a \d+%./);
    });

    test("should return a message whether a magic item was found or not for 'Very rare' rarity", () => {
        const message: string = findItemByRarity("Very rare");

        expect(message).toMatch(/Very rare has a 10% find percentage and you rolled a \d+%./);
    });

    test("should return a message whether a magic item was found or not for 'Legendary' rarity", () => {
        const message: string = findItemByRarity("Legendary");

        expect(message).toMatch(/Legendary has a 1% find percentage and you rolled a \d+%./);
    });
});