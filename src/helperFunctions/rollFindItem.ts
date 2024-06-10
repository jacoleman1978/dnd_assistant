import { rollDice, rollTwoD100 } from "./rollDice";
import { ItemRarity } from "../staticData/types";

export const defaultRarityMap: {[key: string]: number} = {
    'Common': 50,
    'Uncommon': 30,
    'Rare': 15,
    'Very rare': 10,
    'Legendary': 1,
};

export const isItemFoundByPercent = (findPercent: number, percentOne: number, percentTwo: number): boolean => {
    const difference = Math.abs(percentOne - percentTwo);

    if (difference <= findPercent) return true;

    return false
};

export const rollMagicItemCost = (itemRarity: ItemRarity): number => {
    switch (itemRarity) {
        case 'Common':
            return (rollDice("d6") + 1) * 10;
        case 'Uncommon':
            return rollDice("d6") * 100;
        case 'Rare':
            return (rollDice("d10") + rollDice("d10")) * 1000;
        case 'Very rare':
            return (rollDice("d4") + 1) * 10000;
        case 'Legendary':
            return (rollDice("d6") + rollDice("d6")) * 25000;
    }
};

export const findItemByRarity = (itemRarity: ItemRarity, findModifier: number = 0): string => {
    const rarityMap: {[key: string]: number} = {
        ...defaultRarityMap,
    };

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

        return `${itemRarity} has a ${findPercent}% find percentage and you rolled a ${Math.abs(firstD100 - secondD100)}%. The ${itemRarity.toLowerCase()} magic item was found for ${magicItemCost.toLocaleString("en-US")} gold!`

    } else {
        return `${itemRarity} has a ${findPercent}% find percentage and you rolled a ${Math.abs(firstD100 - secondD100)}%. No ${itemRarity.toLowerCase()} magic item was found. Please check back another day.`
    }
};
