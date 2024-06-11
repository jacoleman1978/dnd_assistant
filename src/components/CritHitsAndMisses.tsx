import { useState, useEffect } from "react";
import { Typography, Button } from "@mui/material";

import CharacterLevelSelect from "./CharacterLevelSelect";
import DamageTypeSelect from "./DamageTypeSelect";
import SpellLevelSelect from "./SpellLevelSelect";
import CritTypeSelect from "./CritTypeSelect";

import { rollCritical } from "../helperFunctions/rollCriticals";
import { CritType } from "../staticData/types";
import { GroupRollInputs } from "../staticData/interfaces";

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

    useEffect(() => {
        setCritResult([]);
    }, [groupInputs.damageType, groupInputs.charLevel, groupInputs.spellLevel]);

    useEffect(() => {
        setGroupInputs({
            numberOfRolls: 5,
            advantageType: "Normal",
            targetDC: 10,
            modifier: 0,
            damageType: "Slashing",
            charLevel: 5,
            spellLevel: 0,
        })
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
        <div className="card">
            <Typography variant="h5">Critical Hits and Misses</Typography>
            <CritTypeSelect setCritType={setCritType} />

            <CharacterLevelSelect
                charLevel={groupInputs.charLevel}
                setGroupInputs={setGroupInputs}
            />

            <DamageTypeSelect
                damageType={groupInputs.damageType}
                setGroupInputs={setGroupInputs}
            />

            {groupInputs.damageType === "Magic" ? (
                <SpellLevelSelect
                    spellLevel={groupInputs.spellLevel}
                    setGroupInputs={setGroupInputs}
                />
            ) : null}

            <div className="row-wrap-center-center">
                <Button
                    sx={{ marginBottom: 1, width: 200 }}
                    variant="outlined"
                    color="primary"
                    size="large"
                    onClick={handleRollCrit}
                >
                    Roll Critical
                </Button>
            </div>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    width: "100%",
                }}
            >
                {critResult.map((result, index) => (
                    <Typography
                        key={`crit-${index}`}
                        sx={{
                            textAlign: "left",
                            marginLeft: [0, 2, 4].includes(index) ? 0 : 3,
                        }}
                    >
                        {result}
                    </Typography>
                ))}
            </div>
        </div>
    );
};
export default CritHitsAndMisses;
