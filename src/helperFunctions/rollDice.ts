import { DiceType, AdvantageType } from "../staticData/types";

export const diceTypeToMaxNumber = (diceType: DiceType): number => {
    switch (diceType) {
        case 'd4':
            return 4;
        case 'd6':
            return 6;
        case 'd8':
            return 8;
        case 'd10':
            return 10;
        case 'd12':
            return 12;
        case 'd20':
            return 20;
        case 'd100':
            return 100;
    }
};


export const rollDice = (diceType: DiceType ): number => {
    const maxDiceTypeNumber = diceTypeToMaxNumber(diceType);

    return Math.floor(Math.random() * maxDiceTypeNumber) + 1;
};

export const rollTwoD20 = () => {
    const firstRoll = rollDice('d20');
    const secondRoll = rollDice('d20');

    return {firstRoll, secondRoll};
};


export const selectDiceByAdvantageType = (firstRoll: number, secondRoll: number = 0, advantageType: AdvantageType): number => {
    switch (advantageType) {
        case 'Normal':
            return firstRoll;
        case 'Advantage':
            return Math.max(firstRoll, secondRoll);
        case 'Disadvantage':
            return Math.min(firstRoll, secondRoll);
    }
}