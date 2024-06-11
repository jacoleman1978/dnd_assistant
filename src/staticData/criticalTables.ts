import { rollDice } from "../helperFunctions/rollDice";
import { SpellLevel } from "./types";

// The melee crit tables were published by Carl Parlagreco, "Good Hits & Bad Misses", in Dragon #39 (July, 1980).
// Magic crits were posted on https://d20despot.blogspot.com/2015/07/critical-hit-tables-scaling-crits-for.html Monday, July 13, 2015.

/**
 * Returns a string describing the result of a bludgeoning critical hit.
 * @param d100 A number between 1 and 100 representing the result of a d100 roll.
 * @returns A string describing the result of a bludgeoning critical hit.
 */
export const bludgeoningCrit = (d100: number): string => {
    if (d100 < 32) {
        return "x2 damage";
    } else if (d100 < 65) {
        return "x3 damage";
    } else if (d100 < 67) {
        return "Shield destroyed. No effect, if no shield.";
    } else if (d100 < 69) {
        return "Shield destroyed. Roll again, if no shield.";
    } else if (d100 < 71) {
        return `Shield arm struck. No shield defense for ${rollDice(
            "d6"
        )} rounds.`;
    } else if (d100 < 73) {
        return "Shield arm broken. Lose shield.";
    } else if (d100 < 75) {
        return "Weapon arm struck. -2 to all attacks.";
    } else if (d100 < 77) {
        return "Weapon arm struck. -4 to all attacks.";
    } else if (d100 < 79) {
        return "Weapon arm broken. No attacks.";
    } else if (d100 < 81) {
        return `Hand struck. Dexterity reduced by ${rollDice(
            "d4"
        )} points until healed.`;
    } else if (d100 < 83) {
        return `Hand struck. Dexterity reduced by ${rollDice("d4")} points.`;
    } else if (d100 < 85) {
        return `Chest struck. Stunned ${rollDice("d6")} rounds.`;
    } else if (d100 < 87) {
        return "Chest struck. Ribs broken. Lungs punctured. Movement reduced to 0.";
    } else if (d100 < 89) {
        return "Chest struck. Ribs broken. Heart puntured. Immediate death.";
    } else if (d100 < 91) {
        return "Leg struck. Become prone.";
    } else if (d100 < 93) {
        return "Leg struck. Movement halved.";
    } else if (d100 < 95) {
        return "Leg broken. Movement reduced to 0.";
    } else if (d100 === 95) {
        return `Head struck. Intelligence reduced by ${rollDice(
            "d6"
        )} points. No effect if helmed.`;
    } else if (d100 === 96) {
        return `Head struck. Intelligence reduced by ${rollDice("d6")} points.`;
    } else if (d100 === 97) {
        return `Head struck. Intelligence reduced by ${
            rollDice("d6") + rollDice("d6")
        } points. No effect if helmed.`;
    } else if (d100 === 98) {
        return `Head struck. Intelligence reduced by ${
            rollDice("d6") + rollDice("d6")
        } points.`;
    } else if (d100 === 99) {
        return "Skull crushed. Immediate death. No effect, if helmed.";
    } else if (d100 === 100) {
        return "Skull crushed. Immediate death.";
    }

    return "";
};

/**
 * Returns a string describing the result of a piercing critical hit.
 * @param d100 A number between 1 and 100 representing the result of a d100 roll.
 * @returns A string describing the result of a piercing critical hit.
 */
export const piercingCrit = (d100: number): string => {
    if (d100 < 35) {
        return "x2 damage";
    } else if (d100 < 71) {
        return "x3 damage";
    } else if (d100 < 73) {
        return `Off-hand arm struck. No shield defense for ${rollDice(
            "d6"
        )} rounds. No effect, if shield.`;
    } else if (d100 < 75) {
        return "Shield arm struck. Lose shield.";
    } else if (d100 < 77) {
        return "Weapon arm struck. -2 to all attacks.";
    } else if (d100 < 79) {
        return "Weapon arm struck. -4 to all attacks.";
    } else if (d100 < 81) {
        return "Weapon arm broken. No attacks.";
    } else if (d100 < 83) {
        return `Struck in abdomen. Death in ${rollDice("d6")} days.`;
    } else if (d100 < 85) {
        return `Struck in chest. Death in ${rollDice("d4")} days.`;
    } else if (d100 < 87) {
        return `Struck in abdomen. Death in ${
            rollDice("d6") + rollDice("d6")
        } rounds.`;
    } else if (d100 < 89) {
        return `Struck in chest. Death in ${
            rollDice("d4") + rollDice("d4")
        } rounds.`;
    } else if (d100 < 91) {
        return "Struck in abdomen. Immediate death.";
    } else if (d100 < 93) {
        return "Struck in chest. Immediate death.";
    } else if (d100 === 93) {
        return "Blinded in eye. No effect, if helmed.";
    } else if (d100 === 94) {
        return "Blinded in eye.";
    } else if (d100 === 95) {
        return "Larynx punctured. No effect, if helmed.";
    } else if (d100 === 96) {
        return "Larynx punctured.";
    } else if (d100 === 97) {
        return `Head struck. Intelligence reduced by ${rollDice(
            "d6"
        )} points. No effect if helmed.`;
    } else if (d100 === 98) {
        return `Head struck. Intelligence reduced by ${rollDice("d6")} points.`;
    } else if (d100 === 99) {
        return "Head struck. Immediate death. No effect, if helmed.";
    } else if (d100 === 100) {
        return "Head struck. Immediate death.";
    }

    return "";
};

/**
 * Returns a string describing the result of a slashing critical hit.
 * @param d100 A number between 1 and 100 representing the result of a d100 roll.
 * @returns A string describing the result of a slashing critical hit.
 */
export const slashingCrit = (d100: number): string => {
    if (d100 < 32) {
        return "x2 damage";
    } else if (d100 < 63) {
        return "x3 damage";
    } else if (d100 === 63) {
        return "Shield destroyed. No effect, if no shield.";
    } else if (d100 === 64) {
        return "Shield destroyed. Roll again, if no shield.";
    } else if (d100 === 65) {
        return `Helm removed. If no helm, lose ear and stunned for ${rollDice(
            "d6"
        )} rounds.`;
    } else if (d100 === 66) {
        return `Helm removed. Lose ear and stunned for ${rollDice(
            "d6"
        )} rounds.`;
    } else if (d100 === 67) {
        return "Voice box punctured. No talking until healed. No effect, if helmed.";
    } else if (d100 < 70) {
        return "Ear removed. No effect, if helmed.";
    } else if (d100 === 70) {
        return "Ear removed. Helm removed, if helmed.";
    } else if (d100 < 73) {
        return "Eye removed. No effect, if helmed.";
    } else if (d100 === 73) {
        return "Eye removed.";
    } else if (d100 === 74) {
        return "Knee split. Movement is halved.";
    } else if (d100 === 75) {
        return "Knee split. Movement is reduced to 0.";
    } else if (d100 === 76) {
        return `Fingers removed. Dexterity is reduced by ${rollDice("d4")}.`;
    } else if (d100 === 77) {
        return "Leg removed at ankle.";
    } else if (d100 === 78) {
        return "Leg removed at knee.";
    } else if (d100 === 79) {
        return "Leg removed at hip.";
    } else if (d100 === 80) {
        return "Shield arm removed at wrist. No effect, if shield.";
    } else if (d100 === 81) {
        return "Shield arm removed at elbow. No effect, if shield.";
    } else if (d100 === 82) {
        return "Shield arm removed at shoulder. No effect, if shield.";
    } else if (d100 === 83) {
        return "Shield arm removed at wrist.";
    } else if (d100 === 84) {
        return "Shield arm removed at elbow.";
    } else if (d100 === 85) {
        return "Shield arm removed at shoulder.";
    } else if (d100 === 86) {
        return "Weapon arm removed at wrist.";
    } else if (d100 === 87) {
        return "Weapon arm removed at elbow.";
    } else if (d100 === 88) {
        return "Weapon arm removed at shoulder.";
    } else if (d100 === 89) {
        return "Abdominal injuries. Carrying capacity halved.";
    } else if (d100 === 90) {
        return "Chest injuries. Carrying capacity halved.";
    } else if (d100 === 91) {
        return `Abdominal injuries. Death in ${rollDice("d6")} days.`;
    } else if (d100 === 92) {
        return `Chest injuries. Death in ${rollDice("d4")} days.`;
    } else if (d100 === 93) {
        return `Abdominal injuries. Death in ${
            rollDice("d6") + rollDice("d6")
        } rounds.`;
    } else if (d100 === 94) {
        return `Chest injuries. Death in ${
            rollDice("d4") + rollDice("d4")
        } rounds.`;
    } else if (d100 === 95) {
        return "Abdominal injuries. Immediate death.";
    } else if (d100 === 96) {
        return "Chest injuries. Immediate death.";
    } else if (d100 === 97) {
        return "Throat cut. Immediate death. No effect, if helmed.";
    } else if (d100 === 98) {
        return "Throat cut. Immediate death.";
    } else if (d100 === 99) {
        return "Decapitated. Immediate death. No effect, if helmed.";
    } else if (d100 === 100) {
        return "Decapitated. Immediate death.";
    }

    return "";
};

/**
 * Returns a string describing the result of a fumble with a weapon.
 * @param d100 A number between 1 and 100 representing the result of a d100 roll.
 * @returns A string describing the result of a fumble with a weapon.
 */
export const weaponFumble = (d100: number): string => {
    if (d100 < 20) {
        return `Slip. Roll dexterity or less on d20 or fall and be stunned for ${rollDice(
            "d4"
        )} rounds.`;
    } else if (d100 < 34) {
        return `Stumble. Roll dexterity or less on d20 or fall and be stunned for ${rollDice(
            "d6"
        )} rounds.`;
    } else if (d100 < 40) {
        return `Trip and fall. Stunned for ${rollDice("d6")} rounds.`;
    } else if (d100 < 45) {
        return "Off balance. Roll dexterity or less on d20 or no action next round.";
    } else if (d100 < 50) {
        return "Lose grip on weapon. Roll dexterity or less on d20 or no attack next round.";
    } else if (d100 < 55) {
        return "Lose grip on weapon. Roll dexterity or less on d20 or drop weapon.";
    } else if (d100 < 60) {
        return "Lose grip on weapon. Drop weapon.";
    } else if (d100 < 62) {
        return "Shield tangled with opponent. No effect if not shield.";
    } else if (d100 < 64) {
        return "Shield tangled with opponent. Neither attacks next round.";
    } else if (d100 < 66) {
        return "Weapon tangled with opponent. No attack next round.";
    } else if (d100 < 70) {
        const directions = [
            "north",
            "north-east",
            "east",
            "south-east",
            "south",
            "south-west",
            "west",
            "north-west",
        ];

        return `Weapon knocked away ${rollDice("d10")} feet to the ${
            directions[Number(rollDice("d8"))]
        }.`;
    } else if (d100 < 75) {
        return "Weapon breaks (base 100% -20% for each '+' or ability of weapon.";
    } else if (d100 < 77) {
        return "Hit self for half damage.";
    } else if (d100 < 79) {
        return "Hit self for normal damage.";
    } else if (d100 < 81) {
        return "Hit self for double damage.";
    } else if (d100 < 83) {
        return "Hit friend for half damage.";
    } else if (d100 < 85) {
        return "Hit friend for normal damage.";
    } else if (d100 < 87) {
        return "Hit friend for double damage.";
    } else if (d100 < 89) {
        return "Critical hit on self.";
    } else if (d100 < 91) {
        return "Critical hit on friend.";
    } else if (d100 < 93) {
        return "Twist ankle. Half movement for 1 turn. Roll dexterity or less on d20 or fall.";
    } else if (d100 < 96) {
        return "Helm slips. Roll dexterity or less on d20 to fix or -6 to attacks.";
    } else if (d100 < 98) {
        return "Helm slips. Roll dexterity or less on d20 to fix. No attacks until fixed.";
    } else if (d100 === 98) {
        return "Distracted. Opponent's next attack at +3 to hit.";
    } else if (d100 === 99) {
        return "Roll twice. Ignore rolls of 99 or 100.";
    } else if (d100 === 100) {
        return "Roll three times. Ignore rolls of 99 or 100.";
    }

    return "";
};

// The magic crit table was posted on https://d20despot.blogspot.com/2015/07/critical-hit-tables-scaling-crits-for.html Monday, July 13, 2015.
export const MAGIC_CRIT_TABLE: { [key: string]: string } = {
    "01": "Empowered Spell - all variable numerical effects increased by 50%",
    "02": "Extended Spell - double duration; instantaneous spells happen again next turn",
    "03": "Maximized Spell - all variable numerical effects are maximized",
    "04": "x2",
    "05": "Retain Spell - x2 and the spell is not lost",
    "06": "Knockdown Spell - x2 and knocked prone",
    "07": "Dazzling Spell - x2 and dazzled for 1d6 rounds",
    "08": "Dazing Spell - x2 and dazed for 1 round",
    "09": "Sickening Spell - x2 and sickened for 1d6 rounds",
    "10": "Demoralizing Spell - x2 and shaken for 2d4 rounds",
    "11": "Eye-Blast - x2 and blinded for 1d4 rounds",
    "12": "Sonic Boom - x2 and target and all adjacent are deafened for 1d4 rounds",
    "13": "Nauseating Spell - x2 and nauseated for 1d6 rounds",
    "14": "Staggering Spell - x2 and staggered for 1d4 rounds",
    "15": "Stunning Spell - x2 and stunned for 1d3 rounds",
    "16": "Sleep - x2 and unconscious (this is a magical sleep effect)",
    "17": "Confusing Spell - x2 and confused for 1d6 rounds",
    "18": "Disrupting Spell - x2 and target cannot cast spell or use spell-like abilities for 1d3 rounds",
    "19": "Disappearing - x2 and target cannot see or hear the caster for 1d4 rounds",
    "20": "Overwhelmed Senses - x2 and blinded and deafened for 1d6 rounds",
    "21": "Frightening Spell - x2 and target is frightened for 1d4 rounds",
    "22": "Limning Spell - x2 and target outlined by 'fairie fire' and dazzled for 2d4 rounds",
    "23": "Paralyzing Spell - x2 and paralyzed for 1d6 rounds",
    "24": "Shattering Blast - x2 and normal damage to armor or weapon",
    "25": "Necrotic Surge - x2 and targets that die from this rise as zombies under your control next round",
    "26": "Shrunk - x2 and target is reduced (as 'reduced person') for 1d4 rounds",
    "27": "Dispelling Blast - x2 and 'dispel magic' on target",
    "28": "Elemental Surge - x2 but the second half is damage of a random energy type",
    "29": "Elemental Vulnerability - x2 and if elemental spell, target is vulnerable to that energy type for 1 day",
    "30": "x3",
    "31": "Draining Spell - x3 and 1d2 negative levels (Fort save negates after 1 day)",
    "32": "Spell Blast - x3 and spell also affects adjacent targets",
    "33": "Petrification - x3 and petrified for 1d4 hours (Fort save negates)",
    "34": "Ooze Summoning - x3 and a gelatinous cube appears around target",
    "35": "Polymorph - x3 and target is polymorphed (as 'baleful polymorph') for 1d4 rounds",
    "36": "Displacing Summoning - x3 and target disappears and 'summon monster' takes its place for 1d4 rounds",
    "37": "x4",
    "38": "Falling Up - x4 and 'reverse gravity' 10 foot radius centered on target, 50 feet high for 1 round",
    "39": "Earthquake - x4 and 10 foot radius 'earthquake' spell centered on target",
    "40": "Planar Shift - x4 and target is shifted to a random plane (Will save negates)",
};

/**
 * Returns a string describing the result of a critical hit with a spell, dependent upon the spell level.
 * @param spellLevel A SpellLevel type literal representing the level of the spell from 0 to 9.
 * @param d100 A number between 1 and 100 representing the result of a d100 roll.
 * @returns A string describing the result of a critical hit with a spell.
 */
export const magicCrit = (spellLevel: SpellLevel, d100: number): string => {
    if (spellLevel <= 2) {
        if (d100 <= 85) {
            if (d100 <= 10) {
                return MAGIC_CRIT_TABLE["01"];
            } else if (d100 <= 20) {
                return MAGIC_CRIT_TABLE["02"];
            } else if (d100 <= 25) {
                return MAGIC_CRIT_TABLE["03"];
            } else if (d100 <= 60) {
                return MAGIC_CRIT_TABLE["04"];
            } else if (d100 <= 70) {
                return MAGIC_CRIT_TABLE["05"];
            } else if (d100 <= 72) {
                return MAGIC_CRIT_TABLE["06"];
            } else if (d100 <= 74) {
                return MAGIC_CRIT_TABLE["07"];
            } else if (d100 <= 76) {
                return MAGIC_CRIT_TABLE["08"];
            } else if (d100 <= 78) {
                return MAGIC_CRIT_TABLE["09"];
            } else if (d100 <= 80) {
                return MAGIC_CRIT_TABLE["10"];
            } else if (d100 === 81) {
                return MAGIC_CRIT_TABLE["11"];
            } else if (d100 === 82) {
                return MAGIC_CRIT_TABLE["12"];
            } else if (d100 === 83) {
                return MAGIC_CRIT_TABLE["13"];
            } else if (d100 === 84) {
                return MAGIC_CRIT_TABLE["14"];
            } else if (d100 === 85) {
                return MAGIC_CRIT_TABLE["15"];
            }
        } else {
            if (d100 === 86) {
                return MAGIC_CRIT_TABLE["16"];
            } else if (d100 === 87) {
                return MAGIC_CRIT_TABLE["17"];
            } else if (d100 === 88) {
                return MAGIC_CRIT_TABLE["18"];
            } else if (d100 === 89) {
                return MAGIC_CRIT_TABLE["19"];
            } else if (d100 === 90) {
                return MAGIC_CRIT_TABLE["20"];
            } else if (d100 === 91) {
                return MAGIC_CRIT_TABLE["21"];
            } else if (d100 === 92) {
                return MAGIC_CRIT_TABLE["22"];
            } else if (d100 === 93) {
                return MAGIC_CRIT_TABLE["23"];
            } else if (d100 === 94) {
                return MAGIC_CRIT_TABLE["24"];
            } else if (d100 === 95) {
                return MAGIC_CRIT_TABLE["25"];
            } else if (d100 === 96) {
                return MAGIC_CRIT_TABLE["26"];
            } else if (d100 === 97) {
                return MAGIC_CRIT_TABLE["27"];
            } else if (d100 === 98) {
                return MAGIC_CRIT_TABLE["28"];
            } else if (d100 === 99) {
                return MAGIC_CRIT_TABLE["29"];
            } else {
                return MAGIC_CRIT_TABLE["30"];
            }
        }
    } else if (spellLevel <= 5) {
        if (d100 <= 63) {
            if (d100 <= 10) {
                return MAGIC_CRIT_TABLE["01"];
            } else if (d100 <= 20) {
                return MAGIC_CRIT_TABLE["02"];
            } else if (d100 <= 25) {
                return MAGIC_CRIT_TABLE["03"];
            } else if (d100 <= 30) {
                return MAGIC_CRIT_TABLE["04"];
            } else if (d100 <= 40) {
                return MAGIC_CRIT_TABLE["05"];
            } else if (d100 === 41) {
                return MAGIC_CRIT_TABLE["06"];
            } else if (d100 === 42) {
                return MAGIC_CRIT_TABLE["07"];
            } else if (d100 === 43) {
                return MAGIC_CRIT_TABLE["08"];
            } else if (d100 === 44) {
                return MAGIC_CRIT_TABLE["09"];
            } else if (d100 === 45) {
                return MAGIC_CRIT_TABLE["10"];
            } else if (d100 <= 47) {
                return MAGIC_CRIT_TABLE["11"];
            } else if (d100 <= 49) {
                return MAGIC_CRIT_TABLE["12"];
            } else if (d100 <= 51) {
                return MAGIC_CRIT_TABLE["13"];
            } else if (d100 <= 53) {
                return MAGIC_CRIT_TABLE["14"];
            } else if (d100 <= 55) {
                return MAGIC_CRIT_TABLE["15"];
            } else if (d100 <= 57) {
                return MAGIC_CRIT_TABLE["16"];
            } else if (d100 <= 59) {
                return MAGIC_CRIT_TABLE["17"];
            } else if (d100 <= 61) {
                return MAGIC_CRIT_TABLE["18"];
            } else if (d100 <= 63) {
                return MAGIC_CRIT_TABLE["19"];
            }
        } else {
            if (d100 <= 65) {
                return MAGIC_CRIT_TABLE["20"];
            } else if (d100 <= 67) {
                return MAGIC_CRIT_TABLE["21"];
            } else if (d100 <= 69) {
                return MAGIC_CRIT_TABLE["22"];
            } else if (d100 <= 71) {
                return MAGIC_CRIT_TABLE["23"];
            } else if (d100 <= 73) {
                return MAGIC_CRIT_TABLE["24"];
            } else if (d100 <= 75) {
                return MAGIC_CRIT_TABLE["25"];
            } else if (d100 <= 77) {
                return MAGIC_CRIT_TABLE["26"];
            } else if (d100 <= 79) {
                return MAGIC_CRIT_TABLE["27"];
            } else if (d100 <= 81) {
                return MAGIC_CRIT_TABLE["28"];
            } else if (d100 <= 83) {
                return MAGIC_CRIT_TABLE["29"];
            } else if (d100 <= 93) {
                return MAGIC_CRIT_TABLE["30"];
            } else if (d100 === 94) {
                return MAGIC_CRIT_TABLE["31"];
            } else if (d100 === 95) {
                return MAGIC_CRIT_TABLE["32"];
            } else if (d100 === 96) {
                return MAGIC_CRIT_TABLE["33"];
            } else if (d100 === 97) {
                return MAGIC_CRIT_TABLE["34"];
            } else if (d100 === 98) {
                return MAGIC_CRIT_TABLE["35"];
            } else if (d100 === 99) {
                return MAGIC_CRIT_TABLE["36"];
            } else {
                return MAGIC_CRIT_TABLE["37"];
            }
        }
    } else {
        if (d100 <= 55) {
            if (d100 < 5) {
                return MAGIC_CRIT_TABLE["01"];
            } else if (d100 <= 15) {
                return MAGIC_CRIT_TABLE["02"];
            } else if (d100 <= 25) {
                return MAGIC_CRIT_TABLE["03"];
            } else if (d100 <= 30) {
                return MAGIC_CRIT_TABLE["04"];
            } else if (d100 <= 40) {
                return MAGIC_CRIT_TABLE["05"];
            } else if (d100 === 41) {
                return MAGIC_CRIT_TABLE["06"];
            } else if (d100 === 42) {
                return MAGIC_CRIT_TABLE["07"];
            } else if (d100 === 43) {
                return MAGIC_CRIT_TABLE["08"];
            } else if (d100 === 44) {
                return MAGIC_CRIT_TABLE["09"];
            } else if (d100 === 45) {
                return MAGIC_CRIT_TABLE["10"];
            } else if (d100 === 46) {
                return MAGIC_CRIT_TABLE["11"];
            } else if (d100 === 47) {
                return MAGIC_CRIT_TABLE["12"];
            } else if (d100 === 48) {
                return MAGIC_CRIT_TABLE["13"];
            } else if (d100 === 49) {
                return MAGIC_CRIT_TABLE["14"];
            } else if (d100 === 50) {
                return MAGIC_CRIT_TABLE["15"];
            } else if (d100 === 51) {
                return MAGIC_CRIT_TABLE["16"];
            } else if (d100 === 52) {
                return MAGIC_CRIT_TABLE["17"];
            } else if (d100 === 53) {
                return MAGIC_CRIT_TABLE["18"];
            } else if (d100 === 54) {
                return MAGIC_CRIT_TABLE["19"];
            } else if (d100 === 55) {
                return MAGIC_CRIT_TABLE["20"];
            }
        } else {
            if (d100 === 56) {
                return MAGIC_CRIT_TABLE["21"];
            } else if (d100 === 57) {
                return MAGIC_CRIT_TABLE["22"];
            } else if (d100 === 58) {
                return MAGIC_CRIT_TABLE["23"];
            } else if (d100 === 59) {
                return MAGIC_CRIT_TABLE["24"];
            } else if (d100 === 60) {
                return MAGIC_CRIT_TABLE["25"];
            } else if (d100 === 61) {
                return MAGIC_CRIT_TABLE["26"];
            } else if (d100 === 62) {
                return MAGIC_CRIT_TABLE["27"];
            } else if (d100 === 63) {
                return MAGIC_CRIT_TABLE["28"];
            } else if (d100 === 64) {
                return MAGIC_CRIT_TABLE["29"];
            } else if (d100 <= 75) {
                return MAGIC_CRIT_TABLE["30"];
            } else if (d100 <= 77) {
                return MAGIC_CRIT_TABLE["31"];
            } else if (d100 <= 79) {
                return MAGIC_CRIT_TABLE["32"];
            } else if (d100 <= 81) {
                return MAGIC_CRIT_TABLE["33"];
            } else if (d100 <= 83) {
                return MAGIC_CRIT_TABLE["34"];
            } else if (d100 <= 85) {
                return MAGIC_CRIT_TABLE["35"];
            } else if (d100 <= 87) {
                return MAGIC_CRIT_TABLE["36"];
            } else if (d100 <= 97) {
                return MAGIC_CRIT_TABLE["37"];
            } else if (d100 === 98) {
                return MAGIC_CRIT_TABLE["38"];
            } else if (d100 === 99) {
                return MAGIC_CRIT_TABLE["39"];
            } else {
                return MAGIC_CRIT_TABLE["40"];
            }
        }
    }

    return "";
};

// A table containing all of the different possible magic fumble results.
export const MAGIC_FUMBLE_DATA: {
    [key: string]: { description: string; effect: string };
} = {
    "01": {
        description:
            "You get wrapped up in your spellcasting and forget to watch your target.",
        effect: "Your target has advantage on their attack rolls against you until the start of your next turn.",
    },
    "02": {
        description:
            "You get wrapped up in your spellcasting and forget to watch your surroundings.",
        effect: "All enemies have advantage on their attack rolls against you until the start of your next turn.",
    },
    "03": {
        description: "Your spell misfires knocking you over.",
        effect: "Roll Dex or less on d20 or you are knocked prone.",
    },
    "04": {
        description:
            "The spell fires in an unexpected manner, causing your confidence in your abilities to falter.",
        effect: "You have disadvantage on any spell attacks, and enemies have advantage against your spell savings throws until the end of your next turn.",
    },
    "05": {
        description:
            "You scramble the ingredients of your component pouch or your focus becomes overloaded with magical energy and temporarily stops working.",
        effect: "You are unable to perform material components to cast spells until the end of your next turn.",
    },
    "06": {
        description: "Your arm cramps as you cast.",
        effect: "You are unable to perform somatic components to cast spells until the end of your next turn.",
    },
    "07": {
        description: "You bite your tongue as you cast.",
        effect: "You are unable to use verbal components to cast spells until the end of your next turn.",
    },
    "08": {
        description:
            "Your spell backfires creating a small explosion causing you to fall and bump your head.",
        effect: "You fall prone. Roll a DC 10 constitution save, on failure you take 1d6 bludeoning damage and are knocked unconscious for 1 minute or until you receive damage from any source. On success take half damage and you remain conscious.",
    },
    "09": {
        description:
            "Your spell backfires creating a large explosion causing you to fall and bump your head.",
        effect: "You fall prone. Roll a DC 15 constitution save, on failure you take 1d6 bludgeoning damage, 1d6 thunder damage, and are knocked unconscious for 1 minute or until you receive damage from any source. On success take half damage and you remain conscious.",
    },
    "10": {
        description:
            "Your spell completely backfires creating a large explosion causing you to fall and bump your head.",
        effect: "You hit yourself with your spell. If the spell effect is instant you take the full effect. If the spell requires concentration the effect persists until the end of your next turn. You also fall prone, take 1d6 bludgeoning damage, 1d6 thunder damage, and become unconscious for 1 minute or until you receive damage from any source.",
    },
    "11": {
        description:
            "Your spell overloads and you fail to control it, hitting one of your allies.",
        effect: "Roll randomly to determine which ally that you can see gets hit by your spell. The spell now has an additional 120ft of range.  Ally is automatically hit, normal damage.",
    },
    "12": {
        description:
            "Your spell overloads and you fail to control it, hitting one of your allies.",
        effect: "Roll randomly to determine which ally that you can see gets hit by your spell. The spell now has an additional 2000ft of range.  Ally is automatically hit, roll double damage dice.",
    },
    "13": {
        description:
            "Your spell overloads and you fail to control it, critically hitting one of your allies.",
        effect: "Roll randomly to determine which ally that you can see gets hit by your spell. The spell now has an additional 2000ft of range.  Ally is automatically hit, roll on spell critical hit chart.",
    },
    "14": {
        description:
            "Your spell overloads and you fail to control it, critically hitting one of your allies and yourself.",
        effect: "Roll randomly to determine which ally that you can see gets hit by your spell. The spell now has an additional 2000ft of range.  You and your ally are automatically hit, roll on spell critical hit chart.",
    },
    "15": {
        description:
            "Your spell overloads and you fail to control it, hitting all of your allies and yourself.",
        effect: "You and your allies get hit by your spell. The spell now has an additional 120ft of range.  Allies are automatically hit, normal damage.",
    },
    "16": {
        description:
            "Your spell overloads and you fail to control it, hitting all of your allies and yourself.",
        effect: "You and your allies get hit by your spell. The spell now has an additional 2000ft of range.  Allies are automatically hit, roll double damage dice.",
    },
    "17": {
        description:
            "Your spell overloads and you fail to control it, hitting all of your allies and yourself.",
        effect: "You and your allies get hit by your spell. The spell now has an additional 2000ft of range.  You and your ally are automatically hit, roll on spell critical hit chart.",
    },
    "18": {
        description:
            "Your spell overloads and you fail to control it, critically hitting everyone on the battlefield.",
        effect: "All creatures on the battlefield get hit with your spell.  Roll on spell critical hit chart.",
    },
    "19": {
        description:
            "Your spell overloads and you fail to control it, critically hitting everyone on the battlefield.",
        effect: "All creatures on the battlefield get hit with your spell.  Roll twice on spell critical hit chart.",
    },
};

/**
 * Returns an object containing a description and effect of a magic fumble, depending on the level of spell cast.
 * @param spellLevel A SpellLevel type literal representing the level of the spell from 0 to 9.
 * @param d100 A number between 1 and 100 representing the result of a d100 roll.
 * @returns An object containing a description and effect of a magic fumble.
 */
export const magicFumble = (
    spellLevel: SpellLevel,
    d100: number
): { description: string; effect: string } => {
    if (spellLevel <= 2) {
        if (d100 <= 10) {
            return MAGIC_FUMBLE_DATA["01"];
        } else if (d100 <= 20) {
            return MAGIC_FUMBLE_DATA["02"];
        } else if (d100 <= 30) {
            return MAGIC_FUMBLE_DATA["03"];
        } else if (d100 <= 40) {
            return MAGIC_FUMBLE_DATA["04"];
        } else if (d100 <= 50) {
            return MAGIC_FUMBLE_DATA["05"];
        } else if (d100 <= 60) {
            return MAGIC_FUMBLE_DATA["06"];
        } else if (d100 <= 70) {
            return MAGIC_FUMBLE_DATA["07"];
        } else if (d100 <= 80) {
            return MAGIC_FUMBLE_DATA["08"];
        } else if (d100 <= 90) {
            return MAGIC_FUMBLE_DATA["09"];
        } else if (d100 <= 95) {
            return MAGIC_FUMBLE_DATA["10"];
        } else if (d100 <= 97) {
            return MAGIC_FUMBLE_DATA["11"];
        } else if (d100 <= 99) {
            return MAGIC_FUMBLE_DATA["12"];
        } else {
            return MAGIC_FUMBLE_DATA["13"];
        }
    } else if (spellLevel <= 5) {
        if (d100 <= 5) {
            return MAGIC_FUMBLE_DATA["01"];
        } else if (d100 <= 10) {
            return MAGIC_FUMBLE_DATA["02"];
        } else if (d100 <= 15) {
            return MAGIC_FUMBLE_DATA["03"];
        } else if (d100 <= 20) {
            return MAGIC_FUMBLE_DATA["04"];
        } else if (d100 <= 30) {
            return MAGIC_FUMBLE_DATA["05"];
        } else if (d100 <= 40) {
            return MAGIC_FUMBLE_DATA["06"];
        } else if (d100 <= 50) {
            return MAGIC_FUMBLE_DATA["07"];
        } else if (d100 <= 60) {
            return MAGIC_FUMBLE_DATA["08"];
        } else if (d100 <= 70) {
            return MAGIC_FUMBLE_DATA["09"];
        } else if (d100 <= 80) {
            return MAGIC_FUMBLE_DATA["10"];
        } else if (d100 <= 90) {
            return MAGIC_FUMBLE_DATA["11"];
        } else if (d100 <= 95) {
            return MAGIC_FUMBLE_DATA["12"];
        } else if (d100 <= 99) {
            return MAGIC_FUMBLE_DATA["13"];
        } else {
            return MAGIC_FUMBLE_DATA["14"];
        }
    } else {
        if (d100 <= 5) {
            return MAGIC_FUMBLE_DATA["01"];
        } else if (d100 <= 10) {
            return MAGIC_FUMBLE_DATA["02"];
        } else if (d100 <= 15) {
            return MAGIC_FUMBLE_DATA["03"];
        } else if (d100 <= 20) {
            return MAGIC_FUMBLE_DATA["04"];
        } else if (d100 <= 30) {
            return MAGIC_FUMBLE_DATA["05"];
        } else if (d100 <= 40) {
            return MAGIC_FUMBLE_DATA["06"];
        } else if (d100 <= 50) {
            return MAGIC_FUMBLE_DATA["07"];
        } else if (d100 <= 55) {
            return MAGIC_FUMBLE_DATA["08"];
        } else if (d100 <= 60) {
            return MAGIC_FUMBLE_DATA["09"];
        } else if (d100 <= 65) {
            return MAGIC_FUMBLE_DATA["10"];
        } else if (d100 <= 70) {
            return MAGIC_FUMBLE_DATA["11"];
        } else if (d100 <= 75) {
            return MAGIC_FUMBLE_DATA["12"];
        } else if (d100 <= 80) {
            return MAGIC_FUMBLE_DATA["13"];
        } else if (d100 <= 85) {
            return MAGIC_FUMBLE_DATA["14"];
        } else if (d100 <= 90) {
            return MAGIC_FUMBLE_DATA["15"];
        } else if (d100 <= 95) {
            return MAGIC_FUMBLE_DATA["16"];
        } else if (d100 <= 97) {
            return MAGIC_FUMBLE_DATA["17"];
        } else if (d100 <= 99) {
            return MAGIC_FUMBLE_DATA["18"];
        } else {
            return MAGIC_FUMBLE_DATA["19"];
        }
    }
};
