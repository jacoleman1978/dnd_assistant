import { rollDice, rollTwoD100 } from "./rollDice";
import { ItemRarity } from "../staticData/types";

// Default percentages to find magic items of each rarity
export const defaultRarityMap: { [key: string]: number } = {
    Common: 50,
    Uncommon: 30,
    Rare: 15,
    "Very rare": 10,
    Legendary: 1,
};

/**
 * Compares the difference between two percentages to see if it is less than or equal to a find percentage.
 * @param findPercent A number representing the percentage to find
 * @param percentOne A number representing the first percentage to compare
 * @param percentTwo A number representing the second percentage to compare
 * @returns A boolean indicating whether the magic item was found
 */
export const isItemFoundByPercent = (
    findPercent: number,
    percentOne: number,
    percentTwo: number
): boolean => {
    if (findPercent < 0 || findPercent > 100) {
        throw new Error(
            "Find percentage must be between 0 and 100 for isItemFoundByPercent."
        );
    }
    if (percentOne < 0 || percentOne > 100) {
        throw new Error(
            "First percentage must be between 0 and 100 for isItemFoundByPercent."
        );
    }
    if (percentTwo < 0 || percentTwo > 100) {
        throw new Error(
            "Second percentage must be between 0 and 100 for isItemFoundByPercent."
        );
    }

    const difference = Math.abs(percentOne - percentTwo);

    if (difference <= findPercent) return true;

    return false;
};

/**
 * Uses equations based on item rarity to determine the cost of a magic item. Equations are based on Xanathar's Guide to Everything.
 * @param itemRarity An ItemRarity type literal: "Common", "Uncommon", "Rare", "Very rare", or "Legendary"
 * @returns A number representing the cost of the magic item in gold
 */
export const rollMagicItemCost = (itemRarity: ItemRarity): number => {
    switch (itemRarity) {
        case "Common":
            return (rollDice("d6") + 1) * 10;
        case "Uncommon":
            return rollDice("d6") * 100;
        case "Rare":
            return (rollDice("d10") + rollDice("d10")) * 1000;
        case "Very rare":
            return (rollDice("d4") + 1) * 10000;
        case "Legendary":
            return (rollDice("d6") + rollDice("d6")) * 25000;
    }
};

/**
 * Determines if a magic item of a specific rarity is found that day, returning the result and a cost in gold, if the item is available.
 * @param itemRarity An ItemRarity type literal: "Common", "Uncommon", "Rare", "Very rare", or "Legendary"
 * @param findModifier A number representing the modifier to the find percentage with a default value of 0. It allows for a DM to adjust the find rate based on the campaign, location, or other factors.
 * @returns A string with the results of the find magic item roll, including a cost in gold if the item is found
 */
export const findItemByRarity = (
    itemRarity: ItemRarity,
    findModifier: number = 0
): string => {
    if (findModifier < -100 || findModifier > 100) {
        throw new Error(
            "Find modifier must be between -100 and 100 for findItemByRarity."
        );
    }

    const rarityMap: { [key: string]: number } = {
        ...defaultRarityMap,
    };

    // Adjust the find percentage based on the rarity and the find modifier, capped at 0 and 100
    let findPercent: number = rarityMap[itemRarity] + findModifier;

    const { firstD100, secondD100 } = rollTwoD100();
    let isItemFound = false;

    if (findPercent > 0 && findPercent < 100) {
        isItemFound = isItemFoundByPercent(findPercent, firstD100, secondD100);
    } else if (findPercent >= 100) {
        isItemFound = true;
        findPercent = 100;
    } else {
        isItemFound = false;
        findPercent = 0;
    }

    if (isItemFound) {
        const magicItemCost = rollMagicItemCost(itemRarity);

        return `${itemRarity} has a ${findPercent}% find percentage and you rolled a ${Math.abs(
            firstD100 - secondD100
        )}%. The ${itemRarity.toLowerCase()} magic item was found for ${magicItemCost.toLocaleString(
            "en-US"
        )} gold!`;
    } else {
        return `${itemRarity} has a ${findPercent}% find percentage and you rolled a ${Math.abs(
            firstD100 - secondD100
        )}%. No ${itemRarity.toLowerCase()} magic item was found. Please check back another day.`;
    }
};
