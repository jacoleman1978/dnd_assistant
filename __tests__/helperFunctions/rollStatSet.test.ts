import { describe, expect, test } from "@jest/globals";
import { rollStat, rollStatSet } from "../../src/helperFunctions/rollStatSet";

describe("rollStat", () => {
    test("should throw an error if minimumStatAllowed is less than 3", () => {
        expect(() => rollStat(2)).toThrow(
            "Minimum stat allowed must be 3 or greater for rollStat."
        );
    });

    test("should throw an error if minimumStatAllowed is greater than 18", () => {
        expect(() => rollStat(19)).toThrow(
            "Minimum stat allowed must be 10 or less for rollStat."
        );
    });

    test("should return a number greater than or equal to 3", () => {
        for (let i = 0; i < 1000; i++) {
            const result = rollStat();

            expect(result).toBeGreaterThanOrEqual(3);
            expect(result).toBeLessThanOrEqual(18);
        }
    });

    test("should return a number greater than or equal to 6", () => {
        for (let i = 0; i < 1000; i++) {
            const result = rollStat(6);

            expect(result).toBeGreaterThanOrEqual(6);
            expect(result).toBeLessThanOrEqual(18);
        }
    });

    test("should return a number greater than or equal to 10", () => {
        for (let i = 0; i < 1000; i++) {
            const result = rollStat(10);

            expect(result).toBeGreaterThanOrEqual(10);
            expect(result).toBeLessThanOrEqual(18);
        }
    });
});

describe("rollStatSet", () => {
    test("should throw an error if minimumStatAllowed is less than 3", () => {
        expect(() => rollStatSet(2)).toThrow(
            "Minimum stat allowed must be 3 or greater for rollStatSet."
        );
    });

    test("should throw an error if minimumStatAllowed is greater than 18", () => {
        expect(() => rollStatSet(19)).toThrow(
            "Minimum stat allowed must be 10 or less for rollStatSet."
        );
    });

    test("should throw an error if minimumStatSum is less than 18", () => {
        expect(() => rollStatSet(3, 17)).toThrow(
            "Minimum stat sum must be 18 or greater for rollStatSet."
        );
    });

    test("should throw an error if minimumStatSum is greater than 108", () => {
        expect(() => rollStatSet(3, 109)).toThrow(
            "Minimum stat sum must be 85 or less for rollStatSet."
        );
    });

    test("should throw an error if atLeastOneStatEqualToOrGreaterThan is less than 3", () => {
        expect(() => rollStatSet(3, 18, 2)).toThrow(
            "Minimum stat allowed must be 3 or greater for rollStatSet."
        );
    });

    test("should throw an error if atLeastOneStatEqualToOrGreaterThan is greater than 18", () => {
        expect(() => rollStatSet(3, 18, 19)).toThrow(
            "Minimum stat allowed must be 18 or less for rollStatSet."
        );
    });

    test("should return an array of 6 numbers that are all greater than or equal to 3", () => {
        for (let i = 0; i < 1000; i++) {
            const result = rollStatSet();

            expect(result).toHaveLength(6);
            let statSum = 0;
            result.forEach((stat) => {
                expect(typeof stat).toBe("number");
                expect(stat).toBeGreaterThanOrEqual(3);
                expect(stat).toBeLessThanOrEqual(18);
                statSum += stat;
            });
            expect(statSum).toBeGreaterThanOrEqual(18);
        }
    });

    test("should return an array of 6 numbers that are all greater than or equal to 6", () => {
        for (let i = 0; i < 1000; i++) {
            const result = rollStatSet(6, 18, 17);

            expect(result).toHaveLength(6);
            let statSum = 0;
            let maxStat = 0;
            result.forEach((stat) => {
                expect(typeof stat).toBe("number");
                expect(stat).toBeGreaterThanOrEqual(6);
                expect(stat).toBeLessThanOrEqual(18);
                statSum += stat;
                maxStat = Math.max(maxStat, stat);
            });
            expect(maxStat).toBeGreaterThanOrEqual(17);
            expect(statSum).toBeGreaterThanOrEqual(36);
        }
    });

    test("should return an array of 6 numbers that are all greater than or equal to 10", () => {
        for (let i = 0; i < 1000; i++) {
            const result = rollStatSet(10, 18, 17);

            expect(result).toHaveLength(6);
            let statSum = 0;
            let maxStat = 0;
            result.forEach((stat) => {
                expect(typeof stat).toBe("number");
                expect(stat).toBeGreaterThanOrEqual(10);
                expect(stat).toBeLessThanOrEqual(18);
                statSum += stat;
                maxStat = Math.max(maxStat, stat);
            });
            expect(maxStat).toBeGreaterThanOrEqual(17);
            expect(statSum).toBeGreaterThanOrEqual(60);
        }
    });

    test("should return an array of 6 numbers that have a minimumStatSum of 67", () => {
        for (let i = 0; i < 1000; i++) {
            const result = rollStatSet(6, 67, 17);

            expect(result).toHaveLength(6);
            let statSum = 0;
            let maxStat = 0;
            result.forEach((stat) => {
                expect(typeof stat).toBe("number");
                expect(stat).toBeGreaterThanOrEqual(6);
                expect(stat).toBeLessThanOrEqual(18);
                statSum += stat;
                maxStat = Math.max(maxStat, stat);
            });
            expect(maxStat).toBeGreaterThanOrEqual(17);
            expect(statSum).toBeGreaterThanOrEqual(67);
        }
    });

    test("should return an array of 6 numbers that have a minimumStatSum of 85", () => {
        for (let i = 0; i < 1000; i++) {
            const result = rollStatSet(6, 85, 17);

            expect(result).toHaveLength(6);
            let statSum = 0;
            let maxStat = 0;
            result.forEach((stat) => {
                expect(typeof stat).toBe("number");
                expect(stat).toBeGreaterThanOrEqual(6);
                expect(stat).toBeLessThanOrEqual(18);
                statSum += stat;
                maxStat = Math.max(maxStat, stat);
            });
            expect(maxStat).toBeGreaterThanOrEqual(17);
            expect(statSum).toBeGreaterThanOrEqual(85);
        }
    });
});
