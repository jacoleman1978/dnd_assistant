import { rollDice } from "./rollDice";
import { DamageType, Level, SpellLevel, CritType } from "../staticData/types";
import {
    bludgeoningCrit,
    slashingCrit,
    piercingCrit,
    magicCrit,
    weaponFumble,
    magicFumble,
} from "../staticData/criticalTables";

/**
 * Rolls a critical hit or miss based on the critType, returning a critical result string.
 * @param critType A CritType type literal: "Hit" or "Miss"
 * @param damageType A DamageType type literal: "Bludgeoning", "Slashing", "Piercing", or "Magic"
 * @param charLevel A Level type literal with numbers from 1 to 20
 * @param spellLevel A SpellLevel type literal with numbers from 0 to 9, only used when DamageType is "Magic"
 * @returns A string with the critical hit or miss result
 */
export const rollCritical = (
    critType: CritType,
    damageType: DamageType,
    charLevel: Level,
    spellLevel: SpellLevel = 0
): string => {
    if (critType === "Hit") {
        return rollCriticalHit(damageType, charLevel, spellLevel);
    } else if (critType === "Miss") {
        return rollCriticalMiss(damageType, charLevel, spellLevel);
    }

    return "";
};

/**
 * Compares a d100 to a critical hit threshold based on character level and returns whether the roll is a critical hit.
 * @param level A Level type literal with numbers from 1 to 20
 * @param d100 A random number from 1 to 100
 * @returns A boolean indicating whether the roll is a critical hit
 */
export const isCriticalHit = (level: Level, d100: number): boolean => {
    return d100 <= 10 + 5 * level;
};

/**
 * If the d100 roll is a critical hit, returns a string with the critical hit message from the appropriate critical hit table.
 * @param damageType A DamageType type literal: "Bludgeoning", "Slashing", "Piercing", or "Magic"
 * @param charLevel A Level type literal with numbers from 1 to 20
 * @param firstd100 A random number from 1 to 100
 * @param secondD100 A random number from 1 to 100
 * @param spellLevel A SpellLevel type literal with numbers from 0 to 9, only used when DamageType is "Magic"
 * @returns
 */
export const criticalHitMessage = (
    damageType: DamageType,
    charLevel: Level,
    firstd100: number,
    secondD100: number,
    spellLevel: SpellLevel = 0
): string => {
    if (isCriticalHit(charLevel, firstd100)) {
        let message = `A ${firstd100}% is a critical hit!\n${secondD100}% on the table: `;

        if (damageType === "Bludgeoning") {
            message += bludgeoningCrit(secondD100);

            return message;
        } else if (damageType === "Slashing") {
            message += slashingCrit(secondD100);
            return message;
        } else if (damageType === "Piercing") {
            message += piercingCrit(secondD100);
            return message;
        } else if (damageType === "Magic") {
            message += magicCrit(spellLevel, secondD100);
            return message;
        }
    } else {
        return `A ${firstd100}% is just a normal critical hit. Better luck next time!`;
    }

    return "";
};

/**
 * Rolls 2d100 to determine if a critical hit occurs, and if so, returns a string with the critical hit message from the appropriate table.
 * @param damageType A DamageType type literal: "Bludgeoning", "Slashing", "Piercing", or "Magic"
 * @param charLevel A Level type literal with numbers from 1 to 20
 * @param spellLevel A SpellLevel type literal with numbers from 0 to 9, only used when DamageType is "Magic"
 * @returns
 */
export const rollCriticalHit = (
    damageType: DamageType,
    charLevel: Level,
    spellLevel: SpellLevel = 0
): string => {
    const firstD100 = rollDice("d100");
    const secondD100 = rollDice("d100");

    return criticalHitMessage(
        damageType,
        charLevel,
        firstD100,
        secondD100,
        spellLevel
    );
};

/**
 * Compares a d100 to a critical miss threshold based on character level and returns whether the roll is a critical miss. Any roll over 95 is automatically a critical miss.
 * @param charLevel A Level type literal with numbers from 1 to 20
 * @param d100 A random number from 1 to 100
 * @returns A boolean indicating whether the roll is a critical miss
 */
export const isCriticalMiss = (charLevel: Level, d100: number) => {
    let limit: number = 10 + 5 * charLevel;

    if (limit > 95) limit = 95;

    return d100 > limit;
};

/**
 * If the d100 roll is a critical miss, returns a string with the critical miss message from the appropriate critical miss table.
 * @param damageType A DamageType type literal: "Bludgeoning", "Slashing", "Piercing", or "Magic"
 * @param charLevel A Level type literal with numbers from 1 to 20
 * @param firstD100 A random number from 1 to 100
 * @param secondD100 A random number from 1 to 100
 * @param spellLevel A SpellLevel type literal with numbers from 0 to 9, only used when DamageType is "Magic"
 * @returns A string with the critical miss message
 */
export const criticalMissMessage = (
    damageType: DamageType,
    charLevel: Level,
    firstD100: number,
    secondD100: number,
    spellLevel: SpellLevel = 0
): string => {
    const isCritMiss: boolean = isCriticalMiss(charLevel, firstD100);
    if (isCritMiss && damageType === "Magic") {
        const fumble = magicFumble(spellLevel, secondD100);
        const description = fumble.description;

        const effect = fumble.effect;
        return `Uh oh... you rolled ${firstD100}%! It is a critical miss!\n${secondD100}% on the table: \nDescription: \n${description}\nEffect: \n${effect}`;
    } else if (isCritMiss) {
        let rolls: number[] = [];

        let message = `Uh oh... you rolled ${firstD100}%! It is a critical miss!\n${secondD100}% on the table: ${weaponFumble(
            secondD100
        )}\n`;

        if (secondD100 < 99) {
            return message;
        } else {
            // 99 is roll twice on the table, ignoring 99 and 100
            let maxLength = 2;

            // 100 is roll three times on the table, ignoring 99 and 100
            if (secondD100 === 100) {
                maxLength = 3;
            }

            while (rolls.length < maxLength) {
                let nextRoll = rollDice("d100");

                if (nextRoll < 99) {
                    rolls = [...rolls, nextRoll];
                }
            }

            for (let roll of rolls) {
                message += `${roll}% on the table: ${weaponFumble(roll)}\n`;
            }

            return message;
        }
    } else if (!isCritMiss) {
        return `You rolled ${firstD100}%. You are safe from further self-inflicted mishaps...for now....`;
    }

    return "";
};

/**
 * Rolls 2d100 to determine if a critical miss occurs, and if so, returns a string with the critical miss message from the appropriate table.
 * @param damagType A DamageType type literal: "Bludgeoning", "Slashing", "Piercing", or "Magic"
 * @param charLevel A Level type literal with numbers from 1 to 20
 * @param spellLevel A SpellLevel type literal with numbers from 0 to 9, only used when DamageType is "Magic"
 * @returns A string with the critical miss message
 */
export const rollCriticalMiss = (
    damagType: DamageType,
    charLevel: Level,
    spellLevel: SpellLevel = 0
) => {
    const firstD100: number = rollDice("d100");
    const secondD100: number = rollDice("d100");

    return criticalMissMessage(
        damagType,
        charLevel,
        firstD100,
        secondD100,
        spellLevel
    );
};
