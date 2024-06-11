import { DiceType, AdvantageType } from "../staticData/types";

/**
 * Returns the maximum number of a die type.
 * @param diceType A DiceType type literal: "d4", "d6", "d8", "d10", "d12", "d20", or "d100"
 * @returns A number representing the maximum number of the specified die type
 */
export const diceTypeToMaxNumber = (diceType: DiceType): number => {
    if (
        ["d4", "d6", "d8", "d10", "d12", "d20", "d100"].indexOf(diceType) === -1
    )
        throw new Error("Invalid dice type for diceTypeToMaxNumber.");

    switch (diceType) {
        case "d4":
            return 4;
        case "d6":
            return 6;
        case "d8":
            return 8;
        case "d10":
            return 10;
        case "d12":
            return 12;
        case "d20":
            return 20;
        case "d100":
            return 100;
    }
};

/**
 * Rolls a die of the specified type and returns the result.
 * @param diceType A DiceType type literal: "d4", "d6", "d8", "d10", "d12", "d20", or "d100"
 * @returns A random number from 1 to the maximum number of the specified die type
 */
export const rollDice = (diceType: DiceType): number => {
    if (
        ["d4", "d6", "d8", "d10", "d12", "d20", "d100"].indexOf(diceType) === -1
    )
        throw new Error("Invalid dice type for rollDice.");

    const maxDiceTypeNumber = diceTypeToMaxNumber(diceType);

    return Math.floor(Math.random() * maxDiceTypeNumber) + 1;
};

/**
 * Rolls two d20 dice and returns the results, simulating advantage or disadvantage.
 * @returns An object with the results of two d20 rolls
 */
export const rollTwoD20 = (): { firstD20: number; secondD20: number } => {
    const firstD20 = rollDice("d20");
    const secondD20 = rollDice("d20");

    return { firstD20, secondD20 };
};

/**
 * Rolls two d100 dice and returns the results, simulating rolls for needed for critical hits and misses.
 * @returns An object with the results of two d100 rolls
 */
export const rollTwoD100 = (): { firstD100: number; secondD100: number } => {
    const firstD100 = rollDice("d100");
    const secondD100 = rollDice("d100");

    return { firstD100, secondD100 };
};

/**
 * Selects the appropriate number of dice to roll and which to keep based on the advantage type.
 * @param firstD20 A number from 1 to 20 representing the result of the first d20 roll
 * @param secondD20 A number from 1 to 20 representing the result of the second d20 roll with a default value of 0
 * @param advantageType An AdvantageType type literal: "Normal", "Advantage", or "Disadvantage" with a default value of "Normal"
 * @returns The result of a d20 roll based on the advantage type as a number from 1 to 20
 */
export const selectDiceByAdvantageType = (
    firstD20: number,
    secondD20: number = 0,
    advantageType: AdvantageType = "Normal"
): number => {
    if (["Normal", "Advantage", "Disadvantage"].indexOf(advantageType) === -1)
        throw new Error(
            "Invalid advantage type for selectDiceByAdvantageType."
        );

    if (firstD20 < 1)
        throw new Error(
            "First roll must be 1 or greater for selectDiceByAdvantage."
        );

    if (firstD20 > 20)
        throw new Error(
            "First roll must be less than or equal to 20 for selectDiceByAdvantage."
        );

    if (secondD20 < 1)
        throw new Error(
            "Second roll must be 1 or greater for selectDiceByAdvantage."
        );

    if (secondD20 > 20)
        throw new Error(
            "Second roll must be less than or equal to 20 for selectDiceByAdvantage."
        );

    switch (advantageType) {
        case "Normal":
            return firstD20;
        case "Advantage":
            return Math.max(firstD20, secondD20);
        case "Disadvantage":
            return Math.min(firstD20, secondD20);
    }
};

/**
 * Rolls one or more d20 dice based on the advantage type, returning the appropriate result as a number from 1 to 20.
 * @param advantageType An AdvantageType type literal: "Normal", "Advantage", or "Disadvantage" with a default value of "Normal"
 * @returns A number from 1 to 20 representing the result of a d20 roll based on the advantage type
 */
export const rollDiceByAdvantageType = (
    advantageType: AdvantageType
): number => {
    const { firstD20, secondD20 } = rollTwoD20();

    return selectDiceByAdvantageType(firstD20, secondD20, advantageType);
};
