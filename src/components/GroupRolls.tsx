import { useState, useEffect } from "react";
import { Typography, Button } from "@mui/material";

import GroupRollTypeSelect from "./GroupRollTypeSelect";
import NumberOfRollsInput from "./NumberOfRollsInput";
import TargetDCInput from "./TargetDCInput";
import ModifierInput from "./ModifierInput";
import AdvantageTypeSelect from "./AdvantageTypeSelect";
import CharacterLevelSelect from "./CharacterLevelSelect";
import DamageTypeSelect from "./DamageTypeSelect";
import SpellLevelSelect from "./SpellLevelSelect";
import SucceededStatsDisplay from "./SucceededStatsDisplay";
import FailedStatsDisplay from "./FailedStatsDisplay";

import { getGroupRollResults } from "../helperFunctions/rollForGroups";
import { GroupRollType } from "../staticData/types";
import { GroupRollInputs, GroupRollStats } from "../staticData/interfaces";

const GroupRolls = () => {
    const [groupRollType, setGroupRollType] =
        useState<GroupRollType>("Attacks");

    const [groupRollInputs, setGroupRollInputs] = useState<GroupRollInputs>({
        numberOfRolls: 5,
        advantageType: "Normal",
        targetDC: 10,
        modifier: 0,
        damageType: "Bludgeoning",
        charLevel: 5,
        spellLevel: 0,
    });

    const [groupRollStats, setGroupRollStats] = useState<GroupRollStats>({
        whoSucceeded: [],
        whoFailed: [],
        whoHasNormalCriticalHit: [],
        whoHasTableCriticalHit: [],
        whoHasNormalCriticalMiss: [],
        whoHasTableCriticalMiss: [],
    });

    useEffect(() => {
        const resetGroupRollStats = () => {
            return {
                whoSucceeded: [],
                whoFailed: [],
                whoHasNormalCriticalHit: [],
                whoHasTableCriticalHit: [],
                whoHasNormalCriticalMiss: [],
                whoHasTableCriticalMiss: [],
            };
        };

        setGroupRollStats(resetGroupRollStats());
    }, [groupRollType, groupRollInputs.numberOfRolls, groupRollInputs.targetDC, groupRollInputs.modifier, groupRollInputs.advantageType, groupRollInputs.charLevel, groupRollInputs.damageType, groupRollInputs.spellLevel]);

    const handleGroupRoll = () => {
        setGroupRollStats(getGroupRollResults(groupRollInputs));
    };

    return (
        <div className="card">
            <Typography variant="h5">Group Rolls</Typography>

            <GroupRollTypeSelect
                groupRollType={groupRollType}
                setGroupRollType={setGroupRollType}
            />

            <NumberOfRollsInput setGroupInputs={setGroupRollInputs} />

            <TargetDCInput
                groupRollType={groupRollType}
                setGroupInputs={setGroupRollInputs}
            />

            <ModifierInput
                groupRollType={groupRollType}
                setGroupInputs={setGroupRollInputs}
            />

            <AdvantageTypeSelect
                advantageType={groupRollInputs.advantageType}
                setGroupInputs={setGroupRollInputs}
            />

            {groupRollType === "Attacks" ? (
                <>
                    <CharacterLevelSelect
                        charLevel={groupRollInputs.charLevel}
                        setGroupInputs={setGroupRollInputs}
                    />
                    <DamageTypeSelect
                        damageType={groupRollInputs.damageType}
                        setGroupInputs={setGroupRollInputs}
                    />

                    {groupRollInputs.damageType === "Magic" ? (
                        <SpellLevelSelect
                            spellLevel={groupRollInputs.spellLevel}
                            setGroupInputs={setGroupRollInputs}
                        />
                    ) : null}
                </>
            ) : null}
            <div className="row-wrap-center-center">
                <Button
                    sx={{ marginBottom: 1, width: 200 }}
                    variant="outlined"
                    color="primary"
                    size="large"
                    onClick={handleGroupRoll}
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
                <SucceededStatsDisplay
                    groupRollType={groupRollType}
                    groupRollStats={groupRollStats}
                    setGroupRollStats={setGroupRollStats}
                />

                <FailedStatsDisplay
                    groupRollType={groupRollType}
                    groupRollStats={groupRollStats}
                    setGroupRollStats={setGroupRollStats}
                />
            </div>
        </div>
    );
};
export default GroupRolls;
