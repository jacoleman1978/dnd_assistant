import { DiceType, AdvantageType } from "../staticData/types";

export const diceTypeToMaxNumber = (diceType: DiceType): number => {
    if (['d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd100'].indexOf(diceType) === -1) throw new Error('Invalid dice type for diceTypeToMaxNumber.');

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
    if(['d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd100'].indexOf(diceType) === -1) throw new Error('Invalid dice type for rollDice.');

    const maxDiceTypeNumber = diceTypeToMaxNumber(diceType);

    return Math.floor(Math.random() * maxDiceTypeNumber) + 1;
};

export const rollTwoD20 = (): {firstD20: number, secondD20: number} => {
    const firstD20 = rollDice('d20');
    const secondD20 = rollDice('d20');

    return {firstD20, secondD20};
};

export const rollTwoD100 = () : {firstD100: number, secondD100: number} => {
    const firstD100 = rollDice('d100');
    const secondD100 = rollDice('d100');

    return {firstD100, secondD100};
};

export const selectDiceByAdvantageType = (firstD20: number, secondD20: number = 0, advantageType: AdvantageType): number => {
    if (['Normal', 'Advantage', 'Disadvantage'].indexOf(advantageType) === -1) throw new Error('Invalid advantage type for selectDiceByAdvantageType.');

    if (firstD20 < 1) throw new Error('First roll must be 1 or greater for selectDiceByAdvantage.');

    if (firstD20 > 20) throw new Error('First roll must be less than or equal to 20 for selectDiceByAdvantage.');

    if (secondD20 < 1) throw new Error('Second roll must be 1 or greater for selectDiceByAdvantage.');

    if (secondD20 > 20) throw new Error('Second roll must be less than or equal to 20 for selectDiceByAdvantage.');

    switch (advantageType) {
        case 'Normal':
            return firstD20;
        case 'Advantage':
            return Math.max(firstD20, secondD20);
        case 'Disadvantage':
            return Math.min(firstD20, secondD20);
    }
}

export const rollDiceByAdvantageType = (advantageType: AdvantageType): number => {
    const {firstD20, secondD20} = rollTwoD20();

    return selectDiceByAdvantageType(firstD20, secondD20, advantageType);
};
