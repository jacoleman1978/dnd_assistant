import {
    AdvantageType,
    DamageType,
    Level,
    Modifier,
    SpellLevel,
} from "./types";

export interface GroupRolls {
    [key: string]: number[];
}

export interface WhoTableCritted {
    identity: number;
    critMessage: string;
}

export interface GroupRollStats {
    whoSucceeded: number[];
    whoFailed: number[];
    whoHasNormalCriticalHit: number[];
    whoHasTableCriticalHit: WhoTableCritted[];
    whoHasNormalCriticalMiss: number[];
    whoHasTableCriticalMiss: WhoTableCritted[];
}

export interface Criticals {
    whoHasTableCritical: WhoTableCritted[];
    whoHasNormalCritical: number[];
}

export interface GroupCriticals {
    hits: Criticals;
    misses: Criticals;
}

export interface GroupRollInputs {
    numberOfRolls: number;
    advantageType: AdvantageType;
    targetDC: number;
    modifier: Modifier;
    damageType: DamageType;
    charLevel: Level;
    spellLevel: SpellLevel;
}
