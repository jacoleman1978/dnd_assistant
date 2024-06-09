import { rollDice, rollTwoD100 } from "./rollDice";
import { ItemRarity } from "../staticData/types";

const rarityMap: {[key: string]: number} = {
    'Common': 50,
    'Uncommon': 30,
    'Rare': 15,
    'Very rare': 10,
    'Legendary': 1,
};

export const isItemFoundByRarity = (itemRarity: ItemRarity, percentOne: number, percentTwo: number): boolean => {
    const difference = Math.abs(percentOne - percentTwo);

    if (difference <= rarityMap[itemRarity]) return true;

    return false
};

export const rollMagicItemCost = (itemRarity: ItemRarity): number => {
    switch (itemRarity) {
        case 'Common':
            return (rollDice("d6") + 1) * 100;
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

export const findItemByRarity = (itemRarity: ItemRarity): string => {
    const { firstD100, secondD100 } = rollTwoD100();

    const isItemFound = isItemFoundByRarity(itemRarity, firstD100, secondD100);

    if (isItemFound) {
        const magicItemCost = rollMagicItemCost(itemRarity);

        return `${itemRarity} has a ${rarityMap[itemRarity]}% find percentage and you rolled a ${Math.abs(firstD100 - secondD100)}%. The ${itemRarity.toLowerCase()} magic item was found for ${magicItemCost.toLocaleString("en-US")} gold!`

    } else {
        return `${itemRarity} has a ${rarityMap[itemRarity]}% find percentage and you rolled a ${Math.abs(firstD100 - secondD100)}%. No ${itemRarity.toLowerCase()} magic item was found. Please check back another day.`
    }
};
