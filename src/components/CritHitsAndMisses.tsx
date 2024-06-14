import { useState, useEffect } from "react";

import CharacterLevelInput from "./CharacterLevelInput";
import DamageTypeSelect from "./DamageTypeSelect";
import SpellLevelSelect from "./SpellLevelSelect";
import CritTypeRadio from "./CritTypeRadio";
import Button from "./Button";

import { rollCritical } from "../helperFunctions/rollCriticals";
import { CritType } from "../staticData/types";
import { GroupRollInputs } from "../staticData/interfaces";

// A component for rolling critical hits and misses
const CritHitsAndMisses = () => {
    const [critType, setCritType] = useState<CritType>("Hit");

    const [groupInputs, setGroupInputs] = useState<GroupRollInputs>({
        numberOfRolls: 5,
        advantageType: "Normal",
        targetDC: 10,
        modifier: 0,
        damageType: "Slashing",
        charLevel: 5,
        spellLevel: 0,
    });

    const [critResult, setCritResult] = useState<string[]>([]);

    // Reset the crit result when the damage type, character level, or spell level changes
    useEffect(() => {
        setCritResult([]);
    }, [groupInputs.damageType, groupInputs.charLevel, groupInputs.spellLevel]);

    // Reset the crit result when the crit type changes
    useEffect(() => {
        setGroupInputs({
            numberOfRolls: 5,
            advantageType: "Normal",
            targetDC: 10,
            modifier: 0,
            damageType: "Slashing",
            charLevel: 5,
            spellLevel: 0,
        });
        setCritResult([]);
    }, [critType, setGroupInputs, setCritResult]);

    const handleRollCrit = () => {
        const critResult = rollCritical(
            critType,
            groupInputs.damageType,
            groupInputs.charLevel,
            groupInputs.spellLevel
        );
        setCritResult(critResult.split("\n"));
    };

    return (
        <section className="card">
            <h1>Critical Hits and Misses</h1>

            <CritTypeRadio setCritType={setCritType} />

            <CharacterLevelInput setGroupInputs={setGroupInputs} />

            <DamageTypeSelect setGroupInputs={setGroupInputs} />

            {groupInputs.damageType === "Magic" ? (
                <SpellLevelSelect setGroupInputs={setGroupInputs} />
            ) : null}

            <Button
                label="Roll Critical"
                className="submit-button"
                handleClick={handleRollCrit}
            />

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    width: "100%",
                }}
            >
                {critResult.map((result, index) => (
                    <p
                        key={`crit-${index}`}
                        style={{
                            textAlign: "left",
                            marginLeft: [0, 2, 4].includes(index)
                                ? "0px"
                                : "20px",
                        }}
                    >
                        {result}
                    </p>
                ))}
            </div>
        </section>
    );
};
export default CritHitsAndMisses;
