import { rollDice } from "./rollDice";

/**
 * Rolls a single stat using 4d6 drop lowest method, ensuring that all stats are at least a certain value.
 * @param minimumStatAllowed An integer between 3 and 10 representing the minimum value allowed for a stat, with a default value of 3.
 * @returns A single stat between 3 and 10.
 */
export const rollStat = (minimumStatAllowed: number = 3): number => {
    if (minimumStatAllowed < 3)
        throw new Error(
            "Minimum stat allowed must be 3 or greater for rollStat."
        );
    if (minimumStatAllowed > 10)
        throw new Error(
            "Minimum stat allowed must be 10 or less for rollStat."
        );

    let total = 0;

    while (total < minimumStatAllowed) {
        const firstD6 = rollDice("d6");
        const secondD6 = rollDice("d6");
        const thirdD6 = rollDice("d6");
        const fourthD6 = rollDice("d6");

        const lowestRoll = Math.min(firstD6, secondD6, thirdD6, fourthD6);

        total = firstD6 + secondD6 + thirdD6 + fourthD6 - lowestRoll;
    }

    return total;
};

/**
 * Rolls a set of 6 stats using 4d6 drop lowest method, ensuring that all stats are at least a certain value, that the sum of the stats is at least a certain value and that at least one of the stats is or exceeds a certain value.
 * @param minimumStatAllowed An integer between 3 and 10 representing the minimum value allowed for a stat, with a default value of 3.
 * @param minimumStatSum An integer between 18 and 85 representing the minimum sum of the stats, with a default value of 18.
 * @param atLeastOneStatEqualToOrGreaterThan An integer between 3 and 18 representing the minimum value for at least one stat, with a default value of 3.
 * @returns An array of 6 stats between 3 and 18.
 */
export const rollStatSet = (
    minimumStatAllowed: number = 3,
    minimumStatSum: number = 18,
    atLeastOneStatEqualToOrGreaterThan: number = 3
): number[] => {
    if (minimumStatAllowed < 3)
        throw new Error(
            "Minimum stat allowed must be 3 or greater for rollStatSet."
        );
    if (minimumStatAllowed > 11)
        throw new Error(
            "Minimum stat allowed must be 10 or less for rollStatSet."
        );
    if (minimumStatSum < 18)
        throw new Error(
            "Minimum stat sum must be 18 or greater for rollStatSet."
        );
    if (minimumStatSum > 85)
        throw new Error("Minimum stat sum must be 85 or less for rollStatSet.");
    if (atLeastOneStatEqualToOrGreaterThan < 3)
        throw new Error(
            "Minimum stat allowed must be 3 or greater for rollStatSet."
        );
    if (atLeastOneStatEqualToOrGreaterThan > 18)
        throw new Error(
            "Minimum stat allowed must be 18 or less for rollStatSet."
        );

    let total = 0;
    let statSet: number[] = [];
    let maxStat = 0;

    while (
        total < minimumStatSum ||
        maxStat < atLeastOneStatEqualToOrGreaterThan
    ) {
        statSet = [];
        total = 0;
        for (let i = 0; i < 6; i++) {
            const stat = rollStat(minimumStatAllowed);

            statSet.push(stat);
            total += stat;
        }

        maxStat = Math.max(...statSet);
    }

    return statSet;
};
