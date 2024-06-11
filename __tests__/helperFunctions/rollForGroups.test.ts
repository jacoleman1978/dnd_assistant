import { describe, expect, test } from "@jest/globals";
import {
    rollD20sForGroup,
    groupRollStats,
    groupCritical,
    getGroupRollResults,
} from "../../src/helperFunctions/rollForGroups";
import { GroupRollInputs } from "../../src/staticData/interfaces";

describe("rollD20sForGroup", () => {
    test("should throw an error if number of rolls is less than 1", () => {
        const numberOfRolls = 0;
        const advantageType = "Normal";

        expect(() => rollD20sForGroup(numberOfRolls, advantageType)).toThrow(
            "Number of rolls must be at least 1 for rollD20sForGroup."
        );
    });

    test("should throw an error if number of rolls is greater than 50", () => {
        const numberOfRolls = 51;
        const advantageType = "Normal";

        expect(() => rollD20sForGroup(numberOfRolls, advantageType)).toThrow(
            "Number of rolls must be 50 or fewer for rollD20sForGroup."
        );
    });

    test("should return an object where the total number of rolls is equal to the number of rolls requested, 10", () => {
        const numberOfRolls = 10;
        const advantageType = "Normal";

        const result = rollD20sForGroup(numberOfRolls, advantageType);

        const totalRolls = Object.values(result).reduce(
            (acc, rolls) => acc + rolls.length,
            0
        );

        expect(totalRolls).toBe(numberOfRolls);
    });

    test("should return an object where the total number of rolls is equal to the number of rolls requested, 50", () => {
        const numberOfRolls = 50;
        const advantageType = "Normal";

        const result = rollD20sForGroup(numberOfRolls, advantageType);

        const totalRolls = Object.values(result).reduce(
            (acc, rolls) => acc + rolls.length,
            0
        );

        expect(totalRolls).toBe(numberOfRolls);
    });

    test("should return objects with 'Disadvantage' having the most 1s, 'Advantage' having the least 1s and 'Disadvantage' having the least 20's and 'Advantage' having the most 20s", () => {
        const numberOfRolls = 50;

        const disadvantageResult = rollD20sForGroup(
            numberOfRolls,
            "Disadvantage"
        );
        const nomralResult = rollD20sForGroup(numberOfRolls, "Normal");
        const advantageResult = rollD20sForGroup(numberOfRolls, "Advantage");

        const disadvantageOnes = disadvantageResult["1"].length;
        const advantageOnes = advantageResult["1"].length;

        const disadvantageTwenties = disadvantageResult["20"].length;
        const advantageTwenties = advantageResult["20"].length;

        expect(disadvantageOnes).toBeGreaterThan(advantageOnes);

        expect(disadvantageTwenties).toBeLessThan(advantageTwenties);
    
    });
});

describe("groupRollStats", () => {
    test("should throw an error if number of rolls is less than 1", () => {
        const numberOfRolls = 10;
        const advantageType = "Normal";
        const targetDC = 0;
        const modifier = 0;

        const groupRolls = rollD20sForGroup(numberOfRolls, advantageType);

        expect(() => groupRollStats(groupRolls, targetDC, modifier)).toThrow(
            "Target DC must be at least 1 for groupRollStats."
        );
    });

    test("should throw an error if target DC is more than 50", () => {
        const numberOfRolls = 10;
        const advantageType = "Normal";
        const targetDC = 51;
        const modifier = 0;

        const groupRolls = rollD20sForGroup(numberOfRolls, advantageType);

        expect(() => groupRollStats(groupRolls, targetDC, modifier)).toThrow(
            "Target DC must be 50 or fewer for groupRollStats."
        );
    });

    test("should return an object where the number who succeeded and failed is equal to the number of rolls requested, 10", () => {
        const numberOfRolls = 10;
        const advantageType = "Normal";
        const targetDC = 10;
        const modifier = 0;

        const groupRolls = rollD20sForGroup(numberOfRolls, advantageType);

        const result = groupRollStats(groupRolls, targetDC, modifier);

        const totalSucceeded = result.whoSucceeded.length;
        const totalFailed = result.whoFailed.length;

        expect(totalSucceeded + totalFailed).toBe(numberOfRolls);
    });

    test("should return an object where the number who succeeded and failed is equal to the number of rolls requested, 50", () => {
        const numberOfRolls = 50;
        const advantageType = "Normal";
        const targetDC = 10;
        const modifier = 0;

        const groupRolls = rollD20sForGroup(numberOfRolls, advantageType);

        const result = groupRollStats(groupRolls, targetDC, modifier);

        const totalSucceeded = result.whoSucceeded.length;
        const totalFailed = result.whoFailed.length;

        expect(totalSucceeded + totalFailed).toBe(numberOfRolls);
        expect(result.whoHasNormalCriticalHit).toHaveLength(0);
        expect(result.whoHasTableCriticalHit).toHaveLength(0);
        expect(result.whoHasNormalCriticalMiss).toHaveLength(0);
        expect(result.whoHasTableCriticalMiss).toHaveLength(0);
    });
});

describe("groupCritical", () => {
    test("should return a Criticals object for melee weapon attacks", () => {
        const numberOfRolls = 10;
        const advantageType = "Normal";
        const damageType = "Bludgeoning";
        const charLevel = 10;

        const groupRolls = rollD20sForGroup(numberOfRolls, advantageType);

        const groupCriticals = groupCritical(groupRolls, damageType, charLevel);

        expect(groupCriticals).toHaveProperty("hits");
        expect(groupCriticals).toHaveProperty("misses");
        expect(groupCriticals.hits).toHaveProperty("whoHasNormalCritical");
        expect(groupCriticals.hits).toHaveProperty("whoHasTableCritical");
        expect(groupCriticals.misses).toHaveProperty("whoHasNormalCritical");
        expect(groupCriticals.misses).toHaveProperty("whoHasTableCritical");
    });

    test("should return a Criticals object for magic attacks", () => {
        const numberOfRolls = 10;
        const advantageType = "Normal";
        const damageType = "Magic";
        const charLevel = 10;
        const spellLevel = 6;

        const groupRolls = rollD20sForGroup(numberOfRolls, advantageType);

        const groupCriticals = groupCritical(
            groupRolls,
            damageType,
            charLevel,
            spellLevel
        );

        expect(groupCriticals).toHaveProperty("hits");
        expect(groupCriticals).toHaveProperty("misses");
        expect(groupCriticals.hits).toHaveProperty("whoHasNormalCritical");
        expect(groupCriticals.hits).toHaveProperty("whoHasTableCritical");
        expect(groupCriticals.misses).toHaveProperty("whoHasNormalCritical");
        expect(groupCriticals.misses).toHaveProperty("whoHasTableCritical");
    });

    test("should return a Criticals object with 'hits' attribute populated and the number of Table and Normal critical hits equals the number of groupRolls['20'] for melee attacks", () => {
        const numberOfRolls = 50;
        const advantageType = "Advantage";
        const damageType = "Bludgeoning";
        const charLevel = 10;

        const groupRolls = rollD20sForGroup(numberOfRolls, advantageType);
        const numberOfTwenties = groupRolls["20"].length;

        const groupCriticals = groupCritical(groupRolls, damageType, charLevel);
        const numberOfTableCriticals =
            groupCriticals.hits.whoHasTableCritical.length;
        const numberOfNormalCriticals =
            groupCriticals.hits.whoHasNormalCritical.length;

        expect(groupCriticals).toHaveProperty("hits");
        expect(groupCriticals).toHaveProperty("misses");
        expect(groupCriticals.hits).toHaveProperty("whoHasNormalCritical");
        expect(groupCriticals.hits).toHaveProperty("whoHasTableCritical");
        expect(groupCriticals.misses).toHaveProperty("whoHasNormalCritical");
        expect(groupCriticals.misses).toHaveProperty("whoHasTableCritical");

        expect(numberOfTableCriticals + numberOfNormalCriticals).toBe(
            numberOfTwenties
        );
    });

    test("should return a Criticals object with 'hits' attribute populated and the number of Table and Normal critical hits equals the number of groupRolls['20'] for magic attacks", () => {
        const numberOfRolls = 50;
        const advantageType = "Advantage";
        const damageType = "Magic";
        const charLevel = 10;
        const spellLevel = 6;

        const groupRolls = rollD20sForGroup(numberOfRolls, advantageType);
        const numberOfTwenties = groupRolls["20"].length;

        const groupCriticals = groupCritical(
            groupRolls,
            damageType,
            charLevel,
            spellLevel
        );
        const numberOfTableCriticals =
            groupCriticals.hits.whoHasTableCritical.length;
        const numberOfNormalCriticals =
            groupCriticals.hits.whoHasNormalCritical.length;

        expect(groupCriticals).toHaveProperty("hits");
        expect(groupCriticals).toHaveProperty("misses");
        expect(groupCriticals.hits).toHaveProperty("whoHasNormalCritical");
        expect(groupCriticals.hits).toHaveProperty("whoHasTableCritical");
        expect(groupCriticals.misses).toHaveProperty("whoHasNormalCritical");
        expect(groupCriticals.misses).toHaveProperty("whoHasTableCritical");

        expect(numberOfTableCriticals + numberOfNormalCriticals).toBe(
            numberOfTwenties
        );
    });

    test("should return a Criticals object with 'misses' attribute populated and the number of Table and Normal critical misses equals the number of groupRolls['20'] for melee attacks", () => {
        const numberOfRolls = 50;
        const advantageType = "Disadvantage";
        const damageType = "Bludgeoning";
        const charLevel = 10;

        const groupRolls = rollD20sForGroup(numberOfRolls, advantageType);
        const numberOfOnes = groupRolls["1"].length;

        const groupCriticals = groupCritical(groupRolls, damageType, charLevel);
        const numberOfTableCriticals =
            groupCriticals.misses.whoHasTableCritical.length;
        const numberOfNormalCriticals =
            groupCriticals.misses.whoHasNormalCritical.length;

        expect(groupCriticals).toHaveProperty("hits");
        expect(groupCriticals).toHaveProperty("misses");
        expect(groupCriticals.hits).toHaveProperty("whoHasNormalCritical");
        expect(groupCriticals.hits).toHaveProperty("whoHasTableCritical");
        expect(groupCriticals.misses).toHaveProperty("whoHasNormalCritical");
        expect(groupCriticals.misses).toHaveProperty("whoHasTableCritical");

        expect(numberOfTableCriticals + numberOfNormalCriticals).toBe(
            numberOfOnes
        );
    });

    test("should return a Criticals object with 'misses' attribute populated and the number of Table and Normal critical misses equals the number of groupRolls['20'] for spell attacks", () => {
        const numberOfRolls = 50;
        const advantageType = "Disadvantage";
        const damageType = "Magic";
        const charLevel = 10;
        const spellLevel = 6;

        const groupRolls = rollD20sForGroup(numberOfRolls, advantageType);
        const numberOfOnes = groupRolls["1"].length;

        const groupCriticals = groupCritical(
            groupRolls,
            damageType,
            charLevel,
            spellLevel
        );
        const numberOfTableCriticals =
            groupCriticals.misses.whoHasTableCritical.length;
        const numberOfNormalCriticals =
            groupCriticals.misses.whoHasNormalCritical.length;

        expect(groupCriticals).toHaveProperty("hits");
        expect(groupCriticals).toHaveProperty("misses");
        expect(groupCriticals.hits).toHaveProperty("whoHasNormalCritical");
        expect(groupCriticals.hits).toHaveProperty("whoHasTableCritical");
        expect(groupCriticals.misses).toHaveProperty("whoHasNormalCritical");
        expect(groupCriticals.misses).toHaveProperty("whoHasTableCritical");

        expect(numberOfTableCriticals + numberOfNormalCriticals).toBe(
            numberOfOnes
        );
    });
});

describe("getGroupRollResults", () => {
    const groupRollInputs: GroupRollInputs = {
        numberOfRolls: 50,
        advantageType: "Normal",
        targetDC: 10,
        modifier: 0,
        damageType: "Bludgeoning",
        charLevel: 10,
        spellLevel: 6,
    };
    test("should throw an error if number of rolls is less than 1", () => {
        groupRollInputs.numberOfRolls = 0;
        expect(() => getGroupRollResults(groupRollInputs)).toThrow(
            "Number of rolls must be at least 1 for getGroupRollResults."
        );
    });

    test("should throw an error if number of rolls is greater than 50", () => {
        groupRollInputs.numberOfRolls = 51;
        expect(() => getGroupRollResults(groupRollInputs)).toThrow(
            "Number of rolls must be 50 or fewer for getGroupRollResults."
        );
    });

    test("should throw an error if target DC is less than 1", () => {
        groupRollInputs.numberOfRolls = 50;
        groupRollInputs.targetDC = 0;
        expect(() => getGroupRollResults(groupRollInputs)).toThrow(
            "Target DC must be at least 1 for getGroupRollResults."
        );
    });

    test("should throw an error if target DC is greater than 50", () => {
        groupRollInputs.targetDC = 51;
        expect(() => getGroupRollResults(groupRollInputs)).toThrow(
            "Target DC must be 50 or fewer for getGroupRollResults."
        );
    });

    test("should return a GroupRollStats object with all attributes populated for melee attacks", () => {
        groupRollInputs.numberOfRolls = 50;
        groupRollInputs.targetDC = 10;
        const result = getGroupRollResults(groupRollInputs);

        expect(result).toHaveProperty("whoSucceeded");
        expect(result).toHaveProperty("whoFailed");
        expect(result).toHaveProperty("whoHasNormalCriticalHit");
        expect(result).toHaveProperty("whoHasTableCriticalHit");
        expect(result).toHaveProperty("whoHasNormalCriticalMiss");
        expect(result).toHaveProperty("whoHasTableCriticalMiss");

        expect(result.whoSucceeded.length + result.whoFailed.length).toBe(
            groupRollInputs.numberOfRolls
        );
    });

    test("should return a GroupRollStats object with all attributes populated for magic attacks", () => {
        groupRollInputs.damageType = "Magic";
        const result = getGroupRollResults(groupRollInputs);

        expect(result).toHaveProperty("whoSucceeded");
        expect(result).toHaveProperty("whoFailed");
        expect(result).toHaveProperty("whoHasNormalCriticalHit");
        expect(result).toHaveProperty("whoHasTableCriticalHit");
        expect(result).toHaveProperty("whoHasNormalCriticalMiss");
        expect(result).toHaveProperty("whoHasTableCriticalMiss");

        expect(result.whoSucceeded.length + result.whoFailed.length).toBe(
            groupRollInputs.numberOfRolls
        );
    });
});
