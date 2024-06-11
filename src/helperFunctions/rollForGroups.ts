import { rollCriticalHit } from "./rollCriticals";
import { rollCriticalMiss } from "./rollCriticals";
import { rollDiceByAdvantageType } from "./rollDice";

import {
    AdvantageType,
    DamageType,
    Level,
    Modifier,
    SpellLevel,
} from "../staticData/types";
import {
    GroupCriticals,
    GroupRollInputs,
    GroupRolls,
    GroupRollStats,
    WhoTableCritted,
} from "../staticData/interfaces";

/**
 * Rolls a specified number of d20 dice for a group of attacks or saves and returns the results, including the number of successes, failures, and for attacks, normal criticals and table criticals.
 * @param groupRollInputs An object with a GroupRollInputs interface: { numberOfRolls: number, advantageType: AdvantageType, targetDC: number, modifier: Modifier, damageType: DamageType, charLevel: Level, spellLevel: SpellLevel }
 * @returns The results of a group roll as an object with a GroupRollStats interface: { whoSucceeded: number[], whoFailed: number[], whoHasNormalCriticalHit: number[], whoHasTableCriticalHit: WhoTableCritted[], whoHasNormalCriticalMiss: number[], whoHasTableCriticalMiss: WhoTableCritted[] }
 */
export const getGroupRollResults = (
    groupRollInputs: GroupRollInputs
): GroupRollStats => {
    const {
        numberOfRolls,
        advantageType,
        targetDC,
        modifier,
        damageType,
        charLevel,
        spellLevel,
    } = groupRollInputs;

    const groupRolls: GroupRolls = rollD20sForGroup(
        numberOfRolls,
        advantageType
    );

    const groupStats: GroupRollStats = groupRollStats(
        groupRolls,
        targetDC,
        modifier
    );

    const groupCrits: GroupCriticals = groupCritical(
        groupRolls,
        damageType,
        charLevel,
        spellLevel
    );

    const { hits, misses } = groupCrits;

    groupStats.whoHasNormalCriticalHit = hits.whoHasNormalCritical;
    groupStats.whoHasTableCriticalHit = hits.whoHasTableCritical;
    groupStats.whoHasNormalCriticalMiss = misses.whoHasNormalCritical;
    groupStats.whoHasTableCriticalMiss = misses.whoHasTableCritical;

    return groupStats;
};

/**
 * Rolls a specified number of d20 dice for a group of attacks or saves with the given advantage type, storing the results in an object with keys for each possible roll result and values for the identities of the group members who rolled that result.
 * @param numberOfRolls An integer between 1 and 50 representing the number of d20 dice to roll.
 * @param advantageType An AdvantageType type literal: "Normal", "Advantage", or "Disadvantage" with a default value of "Normal".
 * @returns An object with keys for each possible roll result and values for the identities of the group members who rolled that result.
 */
export const rollD20sForGroup = (
    numberOfRolls: number,
    advantageType: AdvantageType = "Normal"
): GroupRolls => {
    if (numberOfRolls < 1)
        throw new Error(
            "Number of rolls must be at least 1 for rollD20sForGroup."
        );
    if (numberOfRolls > 50)
        throw new Error(
            "Number of rolls must be 50 or fewer for rollD20sForGroup."
        );

    const results: GroupRolls = {
        "1": [],
        "2": [],
        "3": [],
        "4": [],
        "5": [],
        "6": [],
        "7": [],
        "8": [],
        "9": [],
        "10": [],
        "11": [],
        "12": [],
        "13": [],
        "14": [],
        "15": [],
        "16": [],
        "17": [],
        "18": [],
        "19": [],
        "20": [],
    };

    for (let i = 0; i < numberOfRolls; i++) {
        const roll = rollDiceByAdvantageType(advantageType);

        results[`${roll}`].push(i + 1);
    }

    return results;
};

/**
 * Compares the results of a group roll to a target DC with a modifier and returns the number of successes and failures. Roller succeeds on a roll equal to or greater than the target DC.
 * @param groupRolls An object with keys for each possible roll result and values for the identities of the group members who rolled that result.
 * @param targetDC An integer between 1 and 50 representing the target DC for the group roll.
 * @param modifier A Modifier type literal with a default value of 0: -5 to 30.
 * @returns An object with the number of successes and failures for the group roll.
 */
export const groupRollStats = (
    groupRolls: GroupRolls,
    targetDC: number,
    modifier: Modifier = 0
): GroupRollStats => {
    if (targetDC < 1)
        throw new Error("Target DC must be at least 1 for groupRollStats.");
    if (targetDC > 50)
        throw new Error("Target DC must be 50 or fewer for groupRollStats.");

    const modifiedTargetDC = targetDC - modifier;

    const results: GroupRollStats = {
        whoSucceeded: [],
        whoFailed: [],
        whoHasNormalCriticalHit: [],
        whoHasTableCriticalHit: [],
        whoHasNormalCriticalMiss: [],
        whoHasTableCriticalMiss: [],
    };

    for (let i = 1; i <= 20; i++) {
        if (i < modifiedTargetDC) {
            results.whoFailed = results.whoFailed.concat(groupRolls[`${i}`]);
        } else if (i >= modifiedTargetDC) {
            results.whoSucceeded = results.whoSucceeded.concat(
                groupRolls[`${i}`]
            );
        }
    }

    return results;
};

/**
 * Determines which group members rolled a critical hit or miss and returns the results.
 * @param groupRolls An object with keys for each possible roll result and values for the identities of the group members who rolled that result.
 * @param damageType A DamageType type literal: "Bludgeoning", "Slashing", "Piercing", "Magic".
 * @param charLevel A Level type literal: 1 to 20.
 * @param spellLevel A SpellLevel type literal: 0 to 9 with a default value of 0.
 * @returns An object with the identities of the group members who rolled a critical hit or miss: { hits: { whoHasTableCritical: WhoTableCritted[], whoHasNormalCritical: number[] }, misses: { whoHasTableCritical: WhoTableCritted[], whoHasNormalCritical: number[] } }
 */
export const groupCritical = (
    groupRolls: GroupRolls,
    damageType: DamageType,
    charLevel: Level,
    spellLevel: SpellLevel = 0
): GroupCriticals => {
    const whoRolled20 = groupRolls["20"];
    const whoHasTableCriticalHit: WhoTableCritted[] = [];
    const whoHasNormalCriticalHit: number[] = [];

    whoRolled20.forEach((identity) => {
        const critMessage = rollCriticalHit(damageType, charLevel, spellLevel);

        if (critMessage.includes("table")) {
            whoHasTableCriticalHit.push({ identity, critMessage });
        } else {
            whoHasNormalCriticalHit.push(identity);
        }
    });

    const whoRolled1 = groupRolls["1"];
    const whoHasTableCriticalMiss: WhoTableCritted[] = [];
    const whoHasNormalCriticalMiss: number[] = [];

    whoRolled1.forEach((identity) => {
        const critMessage = rollCriticalMiss(damageType, charLevel);

        if (critMessage.includes("table")) {
            whoHasTableCriticalMiss.push({ identity, critMessage });
        } else {
            whoHasNormalCriticalMiss.push(identity);
        }
    });

    return {
        hits: {
            whoHasTableCritical: whoHasTableCriticalHit,
            whoHasNormalCritical: whoHasNormalCriticalHit,
        },
        misses: {
            whoHasTableCritical: whoHasTableCriticalMiss,
            whoHasNormalCritical: whoHasNormalCriticalMiss,
        },
    };
};
