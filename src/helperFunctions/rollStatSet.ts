import { rollDice } from "./rollDice";

export const rollStat = (minimumStatAllowed: number = 3): number => {
    if (minimumStatAllowed < 3) throw new Error('Minimum stat allowed must be 3 or greater for rollStat.');
    if(minimumStatAllowed > 18) throw new Error('Minimum stat allowed must be 18 or less for rollStat.');

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


export const rollStatSet = (minimumStatAllowed: number = 3, minimumStatSum: number = 18, atLeastOneStatEqualToOrGreaterThan: number = 3): number[] => {
    if (minimumStatAllowed < 3) throw new Error('Minimum stat allowed must be 3 or greater for rollStatSet.');
    if(minimumStatAllowed > 18) throw new Error('Minimum stat allowed must be 18 or less for rollStatSet.');
    if (minimumStatSum < 18) throw new Error('Minimum stat sum must be 18 or greater for rollStatSet.');
    if(minimumStatSum > 108) throw new Error('Minimum stat sum must be 108 or less for rollStatSet.');
    if(atLeastOneStatEqualToOrGreaterThan < 3) throw new Error('Minimum stat allowed must be 3 or greater for rollStatSet.');
    if(atLeastOneStatEqualToOrGreaterThan > 18) throw new Error('Minimum stat allowed must be 18 or less for rollStatSet.');

    let total = 0;
    let statSet: number[] = [];
    let maxStat = 0;

    while (total < minimumStatSum || maxStat < atLeastOneStatEqualToOrGreaterThan) {
        statSet = [];
        total = 0;
        for (let i = 0; i < 6; i++) {
            const stat = rollStat(minimumStatAllowed);

            statSet.push(stat);
            total += stat;
        }

        maxStat = Math.max(...statSet);
    }

    return statSet
};
