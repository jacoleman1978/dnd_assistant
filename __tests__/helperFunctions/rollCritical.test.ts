import { describe, expect, test } from "@jest/globals";
import {
    isCriticalHit,
    criticalHitMessage,
    rollCriticalHit,
    isCriticalMiss,
    criticalMissMessage,
    rollCriticalMiss,
} from "../../src/helperFunctions/rollCriticals";
import {
    bludgeoningCrit,
    slashingCrit,
    piercingCrit,
    MAGIC_CRIT_TABLE,
    weaponFumble,
    MAGIC_FUMBLE_DATA,
} from "../../src/staticData/criticalTables";

describe("isCriticalHit", () => {
    test("should return true if d100 is less than or equal to 10 + 5 * level", () => {
        expect(isCriticalHit(1, 15)).toBe(true);
        expect(isCriticalHit(1, 16)).toBe(false);

        expect(isCriticalHit(2, 20)).toBe(true);
        expect(isCriticalHit(2, 21)).toBe(false);

        expect(isCriticalHit(3, 25)).toBe(true);
        expect(isCriticalHit(3, 26)).toBe(false);

        expect(isCriticalHit(4, 30)).toBe(true);
        expect(isCriticalHit(4, 31)).toBe(false);

        expect(isCriticalHit(5, 35)).toBe(true);
        expect(isCriticalHit(5, 36)).toBe(false);

        expect(isCriticalHit(6, 40)).toBe(true);
        expect(isCriticalHit(6, 41)).toBe(false);

        expect(isCriticalHit(7, 45)).toBe(true);
        expect(isCriticalHit(7, 46)).toBe(false);

        expect(isCriticalHit(8, 50)).toBe(true);
        expect(isCriticalHit(8, 51)).toBe(false);

        expect(isCriticalHit(9, 55)).toBe(true);
        expect(isCriticalHit(9, 56)).toBe(false);

        expect(isCriticalHit(10, 60)).toBe(true);
        expect(isCriticalHit(10, 61)).toBe(false);

        expect(isCriticalHit(11, 65)).toBe(true);
        expect(isCriticalHit(11, 66)).toBe(false);

        expect(isCriticalHit(12, 70)).toBe(true);
        expect(isCriticalHit(12, 71)).toBe(false);

        expect(isCriticalHit(13, 75)).toBe(true);
        expect(isCriticalHit(13, 76)).toBe(false);

        expect(isCriticalHit(14, 80)).toBe(true);
        expect(isCriticalHit(14, 81)).toBe(false);

        expect(isCriticalHit(15, 85)).toBe(true);
        expect(isCriticalHit(15, 86)).toBe(false);

        expect(isCriticalHit(16, 90)).toBe(true);
        expect(isCriticalHit(16, 91)).toBe(false);

        expect(isCriticalHit(17, 95)).toBe(true);
        expect(isCriticalHit(17, 96)).toBe(false);

        expect(isCriticalHit(18, 100)).toBe(true);
        expect(isCriticalHit(19, 100)).toBe(true);
        expect(isCriticalHit(20, 100)).toBe(true);
    });
});

describe("criticalHitMessage", () => {
    test('should return a string with the correct message for damageType of "Bludgeoning"', () => {
        expect(criticalHitMessage("Bludgeoning", 1, 99, 1)).toBe(
            "A 99% is just a normal critical hit. Better luck next time!"
        );
        expect(criticalHitMessage("Bludgeoning", 1, 10, 1)).toBe(
            "A 10% is a critical hit!\n1% on the table: " + bludgeoningCrit(1)
        );
        expect(criticalHitMessage("Bludgeoning", 1, 10, 50)).toBe(
            "A 10% is a critical hit!\n50% on the table: " + bludgeoningCrit(50)
        );
        expect(criticalHitMessage("Bludgeoning", 1, 10, 66)).toBe(
            "A 10% is a critical hit!\n66% on the table: " + bludgeoningCrit(66)
        );
        expect(criticalHitMessage("Bludgeoning", 1, 10, 99)).toBe(
            "A 10% is a critical hit!\n99% on the table: " + bludgeoningCrit(99)
        );
    });

    test('should return a string with the correct message for damageType of "Slashing"', () => {
        expect(criticalHitMessage("Slashing", 1, 99, 1)).toBe(
            "A 99% is just a normal critical hit. Better luck next time!"
        );
        expect(criticalHitMessage("Slashing", 1, 10, 1)).toBe(
            "A 10% is a critical hit!\n1% on the table: " + slashingCrit(1)
        );
        expect(criticalHitMessage("Slashing", 1, 10, 50)).toBe(
            "A 10% is a critical hit!\n50% on the table: " + slashingCrit(50)
        );
        expect(criticalHitMessage("Slashing", 1, 10, 67)).toBe(
            "A 10% is a critical hit!\n67% on the table: " + slashingCrit(67)
        );
        expect(criticalHitMessage("Slashing", 1, 10, 99)).toBe(
            "A 10% is a critical hit!\n99% on the table: " + slashingCrit(99)
        );
    });

    test('should return a string with the correct message for damageType of "Piercing"', () => {
        expect(criticalHitMessage("Piercing", 1, 99, 1)).toBe(
            "A 99% is just a normal critical hit. Better luck next time!"
        );
        expect(criticalHitMessage("Piercing", 1, 10, 1)).toBe(
            "A 10% is a critical hit!\n1% on the table: " + piercingCrit(1)
        );
        expect(criticalHitMessage("Piercing", 1, 10, 50)).toBe(
            "A 10% is a critical hit!\n50% on the table: " + piercingCrit(50)
        );
        expect(criticalHitMessage("Piercing", 1, 10, 74)).toBe(
            "A 10% is a critical hit!\n74% on the table: " + piercingCrit(74)
        );
        expect(criticalHitMessage("Piercing", 1, 10, 99)).toBe(
            "A 10% is a critical hit!\n99% on the table: " + piercingCrit(99)
        );
    });

    test('should return a string with the correct message for damageType of "Magic"', () => {
        expect(criticalHitMessage("Magic", 1, 99, 1, 0)).toBe(
            "A 99% is just a normal critical hit. Better luck next time!"
        );
        expect(criticalHitMessage("Magic", 1, 10, 85, 0)).toBe(
            "A 10% is a critical hit!\n85% on the table: " +
                MAGIC_CRIT_TABLE[15]
        );
        expect(criticalHitMessage("Magic", 1, 10, 85, 3)).toBe(
            "A 10% is a critical hit!\n85% on the table: " +
                MAGIC_CRIT_TABLE[30]
        );
        expect(criticalHitMessage("Magic", 1, 10, 85, 7)).toBe(
            "A 10% is a critical hit!\n85% on the table: " +
                MAGIC_CRIT_TABLE[35]
        );
    });
});

describe("rollCriticalHit", () => {
    test('should return a string with the correct message for damageType of "Bludgeoning"', () => {
        for (let i = 0; i < 100; i++) {
            expect(rollCriticalHit("Bludgeoning", 1)).toMatch(
                /A \d+% is (just a normal critical hit\. Better luck next time!|a critical hit!\n\d+% on the table: .+)/
            );
        }
    });

    test('should return a string with the correct message for damageType of "Slashing"', () => {
        for (let i = 0; i < 100; i++) {
            expect(rollCriticalHit("Slashing", 1)).toMatch(
                /A \d+% is (just a normal critical hit\. Better luck next time!|a critical hit!\n\d+% on the table: .+)/
            );
        }
    });

    test('should return a string with the correct message for damageType of "Piercing"', () => {
        for (let i = 0; i < 100; i++) {
            expect(rollCriticalHit("Piercing", 1)).toMatch(
                /A \d+% is (just a normal critical hit\. Better luck next time!|a critical hit!\n\d+% on the table: .+)/
            );
        }
    });

    test('should return a string with the correct message for damageType of "Magic"', () => {
        for (let i = 0; i < 100; i++) {
            expect(rollCriticalHit("Magic", 1)).toMatch(
                /A \d+% is (just a normal critical hit\. Better luck next time!|a critical hit!\n\d+% on the table: .+)/
            );
        }
    });
});

describe("isCriticalMiss", () => {
    test("should return true if d100 is greater than or equal to 10 + 5 * level", () => {
        expect(isCriticalMiss(1, 15)).toBe(false);
        expect(isCriticalMiss(1, 16)).toBe(true);

        expect(isCriticalMiss(2, 20)).toBe(false);
        expect(isCriticalMiss(2, 21)).toBe(true);

        expect(isCriticalMiss(3, 25)).toBe(false);
        expect(isCriticalMiss(3, 26)).toBe(true);

        expect(isCriticalMiss(4, 30)).toBe(false);
        expect(isCriticalMiss(4, 31)).toBe(true);

        expect(isCriticalMiss(5, 35)).toBe(false);
        expect(isCriticalMiss(5, 36)).toBe(true);

        expect(isCriticalMiss(6, 40)).toBe(false);
        expect(isCriticalMiss(6, 41)).toBe(true);

        expect(isCriticalMiss(7, 45)).toBe(false);
        expect(isCriticalMiss(7, 46)).toBe(true);

        expect(isCriticalMiss(8, 50)).toBe(false);
        expect(isCriticalMiss(8, 51)).toBe(true);

        expect(isCriticalMiss(9, 55)).toBe(false);
        expect(isCriticalMiss(9, 56)).toBe(true);

        expect(isCriticalMiss(10, 60)).toBe(false);
        expect(isCriticalMiss(10, 61)).toBe(true);

        expect(isCriticalMiss(11, 65)).toBe(false);
        expect(isCriticalMiss(11, 66)).toBe(true);

        expect(isCriticalMiss(12, 70)).toBe(false);
        expect(isCriticalMiss(12, 71)).toBe(true);

        expect(isCriticalMiss(13, 75)).toBe(false);
        expect(isCriticalMiss(13, 76)).toBe(true);

        expect(isCriticalMiss(14, 80)).toBe(false);
        expect(isCriticalMiss(14, 81)).toBe(true);

        expect(isCriticalMiss(15, 85)).toBe(false);
        expect(isCriticalMiss(15, 86)).toBe(true);

        expect(isCriticalMiss(16, 90)).toBe(false);
        expect(isCriticalMiss(16, 91)).toBe(true);

        expect(isCriticalMiss(17, 95)).toBe(false);
        expect(isCriticalMiss(17, 96)).toBe(true);

        expect(isCriticalMiss(18, 100)).toBe(true);
        expect(isCriticalMiss(19, 100)).toBe(true);
        expect(isCriticalMiss(20, 100)).toBe(true);
    });
});

describe("criticalMissMessage", () => {
    test('should return a string with the correct message for damageType of "Bludgeoning"', () => {
        expect(criticalMissMessage("Bludgeoning", 1, 17, 50)).toMatch(
            /Uh oh\.\.\. you rolled 17%!/
        );
        let weaponFumbleMessage = new RegExp(weaponFumble(50));
        expect(criticalMissMessage("Bludgeoning", 1, 17, 50)).toMatch(
            weaponFumbleMessage
        );

        expect(criticalMissMessage("Bludgeoning", 1, 17, 98)).toMatch(
            /Uh oh\.\.\. you rolled 17%!/
        );
        weaponFumbleMessage = new RegExp(weaponFumble(98));
        expect(criticalMissMessage("Bludgeoning", 1, 17, 98)).toMatch(
            /Uh oh\.\.\. you rolled 17%! It is a critical miss\.\n98% on the table: Distracted. Opponent's next attack at \+3 to hit\./
        );

        expect(criticalMissMessage("Bludgeoning", 1, 12, 99)).toMatch(
            /You rolled \d+%\. You are safe from further self-inflicted mishaps\.\.\.for now\.\.\.\./
        );
    });

    test('should return a string with the correct message for damageType of "Slashing"', () => {
        expect(criticalMissMessage("Slashing", 1, 17, 50)).toMatch(
            /Uh oh\.\.\. you rolled 17%!/
        );
        let weaponFumbleMessage = new RegExp(weaponFumble(50));
        expect(criticalMissMessage("Slashing", 1, 17, 50)).toMatch(
            weaponFumbleMessage
        );

        expect(criticalMissMessage("Slashing", 1, 17, 98)).toMatch(
            /Uh oh\.\.\. you rolled 17%!/
        );
        weaponFumbleMessage = new RegExp(weaponFumble(98));
        expect(criticalMissMessage("Slashing", 1, 17, 98)).toMatch(
            /Uh oh\.\.\. you rolled 17%! It is a critical miss\.\n98% on the table: Distracted. Opponent's next attack at \+3 to hit\./
        );

        expect(criticalMissMessage("Slashing", 1, 12, 99)).toMatch(
            /You rolled \d+%\. You are safe from further self-inflicted mishaps\.\.\.for now\.\.\.\./
        );
    });

    test('should return a string with the correct message for damageType of "Piercing"', () => {
        expect(criticalMissMessage("Piercing", 1, 17, 50)).toMatch(
            /Uh oh\.\.\. you rolled 17%!/
        );
        let weaponFumbleMessage = new RegExp(weaponFumble(50));
        expect(criticalMissMessage("Piercing", 1, 17, 50)).toMatch(
            weaponFumbleMessage
        );

        expect(criticalMissMessage("Piercing", 1, 17, 98)).toMatch(
            /Uh oh\.\.\. you rolled 17%!/
        );
        weaponFumbleMessage = new RegExp(weaponFumble(98));
        expect(criticalMissMessage("Piercing", 1, 17, 98)).toMatch(
            /Uh oh\.\.\. you rolled 17%! It is a critical miss\.\n98% on the table: Distracted. Opponent's next attack at \+3 to hit\./
        );

        expect(criticalMissMessage("Piercing", 1, 12, 99)).toMatch(
            /You rolled \d+%\. You are safe from further self-inflicted mishaps\.\.\.for now\.\.\.\./
        );
    });

    test('should return a string with the correct message for damageType of "Magic"', () => {
        expect(criticalMissMessage("Magic", 1, 17, 50, 0)).toMatch(
            /Uh oh\.\.\. you rolled 17%!/
        );
        let magicFumbleMessage = new RegExp(
            MAGIC_FUMBLE_DATA["05"].description
        );
        expect(criticalMissMessage("Magic", 1, 17, 50, 0)).toMatch(
            magicFumbleMessage
        );

        expect(criticalMissMessage("Magic", 1, 17, 98, 0)).toMatch(
            /Uh oh\.\.\. you rolled 17%!/
        );
        magicFumbleMessage = new RegExp(MAGIC_FUMBLE_DATA["12"].description);
        expect(criticalMissMessage("Magic", 1, 17, 98, 0)).toMatch(
            magicFumbleMessage
        );

        magicFumbleMessage = new RegExp(MAGIC_FUMBLE_DATA["07"].description);
        expect(criticalMissMessage("Magic", 1, 17, 50, 3)).toMatch(
            magicFumbleMessage
        );

        magicFumbleMessage = new RegExp(MAGIC_FUMBLE_DATA["13"].description);
        expect(criticalMissMessage("Magic", 1, 17, 98, 3)).toMatch(
            magicFumbleMessage
        );

        magicFumbleMessage = new RegExp(MAGIC_FUMBLE_DATA["07"].description);
        expect(criticalMissMessage("Magic", 1, 17, 50, 7)).toMatch(
            magicFumbleMessage
        );

        magicFumbleMessage = new RegExp(MAGIC_FUMBLE_DATA["18"].description);
        expect(criticalMissMessage("Magic", 1, 17, 98, 7)).toMatch(
            magicFumbleMessage
        );

        expect(criticalMissMessage("Magic", 1, 12, 99, 0)).toMatch(
            /You rolled \d+%\. You are safe from further self-inflicted mishaps\.\.\.for now\.\.\.\./
        );
    });
});

describe("rollCriticalMiss", () => {
    test('should return a string with the correct message for damageType of "Bludgeoning"', () => {
        for (let i = 0; i < 500; i++) {
            expect(rollCriticalMiss("Bludgeoning", 1)).toMatch(
                /(Uh oh\.\.\. you rolled \d+%!|You rolled \d+%\. You are safe from further self-inflicted mishaps\.\.\.for now\.\.\.\.)/
            );
        }
    });

    test('should return a string with the correct message for damageType of "Slashing"', () => {
        for (let i = 0; i < 500; i++) {
            expect(rollCriticalMiss("Slashing", 1)).toMatch(
                /(Uh oh\.\.\. you rolled \d+%!|You rolled \d+%\. You are safe from further self-inflicted mishaps\.\.\.for now\.)/
            );
        }
    });

    test('should return a string with the correct message for damageType of "Piercing"', () => {
        for (let i = 0; i < 500; i++) {
            expect(rollCriticalMiss("Piercing", 1)).toMatch(
                /(Uh oh\.\.\. you rolled \d+%!|You rolled \d+%\. You are safe from further self-inflicted mishaps\.\.\.for now\.)/
            );
        }
    });

    test('should return a string with the correct message for damageType of "Magic"', () => {
        for (let i = 0; i < 500; i++) {
            expect(rollCriticalMiss("Magic", 1)).toMatch(
                /(Uh oh\.\.\. you rolled \d+%!|You rolled \d+%\. You are safe from further self-inflicted mishaps\.\.\.for now\.)/
            );
        }
    });
});
