import { rollCriticalHit } from "./rollCriticals";
import { rollCriticalMiss } from "./rollCriticals";
import { rollDiceByAdvantageType } from "./rollDice";

import { AdvantageType, DamageType, Level, Modifier, SpellLevel } from "../staticData/types";
import { GroupCriticals, GroupRollInputs, GroupRolls, GroupRollStats, WhoTableCritted} from "../staticData/interfaces";

export const getGroupRollResults = (groupRollInputs: GroupRollInputs): GroupRollStats => {
    const { numberOfRolls, advantageType, targetDC, modifier, damageType, charLevel, spellLevel } = groupRollInputs;

    const groupRolls: GroupRolls = rollD20sForGroup(numberOfRolls, advantageType);

    const groupStats: GroupRollStats = groupRollStats(groupRolls, targetDC, modifier);

    const groupCrits: GroupCriticals = groupCritical(groupRolls, damageType, charLevel, spellLevel);

    const { hits, misses } = groupCrits;

    groupStats.whoHasNormalCriticalHit = hits.whoHasNormalCritical;
    groupStats.whoHasTableCriticalHit = hits.whoHasTableCritical;
    groupStats.whoHasNormalCriticalMiss = misses.whoHasNormalCritical;
    groupStats.whoHasTableCriticalMiss = misses.whoHasTableCritical;

    return groupStats;
};


export const rollD20sForGroup = (numberOfRolls: number, advantageType: AdvantageType = 'Normal'): GroupRolls => {
    const results: GroupRolls = {
        '1': [],
        '2': [],
        '3': [],
        '4': [],
        '5': [],
        '6': [],
        '7': [],
        '8': [],
        '9': [],
        '10': [],
        '11': [],
        '12': [],
        '13': [],
        '14': [],
        '15': [],
        '16': [],
        '17': [],
        '18': [],
        '19': [],
        '20': [],
    };

    for (let i = 0; i < numberOfRolls; i++) {
        const roll = rollDiceByAdvantageType(advantageType);

        results[`${roll}`].push(i + 1);
    }

    return results;
};

export const groupRollStats = (groupRolls: GroupRolls, targetDC: number, modifier: Modifier = 0): GroupRollStats => {
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
            results.whoSucceeded = results.whoSucceeded.concat(groupRolls[`${i}`]);
        }
    }

    return results;
};

export const groupCritical = (groupRolls: GroupRolls, damageType: DamageType, charLevel: Level, spellLevel: SpellLevel = 0): GroupCriticals => {
    const whoRolled20 = groupRolls['20'];
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

    const whoRolled1 = groupRolls['1'];
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

    return { hits: { whoHasTableCritical: whoHasTableCriticalHit, whoHasNormalCritical: whoHasNormalCriticalHit }, misses: { whoHasTableCritical: whoHasTableCriticalMiss, whoHasNormalCritical: whoHasNormalCriticalMiss}};
};
