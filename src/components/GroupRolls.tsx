import { useState, useEffect } from "react";

import GroupRollTypeRadio from "./GroupRollTypeRadio";
import NumberOfRollsInput from "./NumberOfRollsInput";
import TargetDCInput from "./TargetDCInput";
import ModifierInput from "./ModifierInput";
import AdvantageTypeSelect from "./AdvantageTypeSelect";
import CharacterLevelInput from "./CharacterLevelInput";
import DamageTypeSelect from "./DamageTypeSelect";
import SpellLevelSelect from "./SpellLevelSelect";
import GroupRollStatsDisplay from "./GroupRollStatsDisplay";
import Button from "./Button";

import { getGroupRollResults } from "../helperFunctions/rollForGroups";
import { GroupRollType } from "../staticData/types";
import { GroupRollInputs, GroupRollStats } from "../staticData/interfaces";

// A component for group attack or save rolls
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
    }, [
        groupRollType,
        groupRollInputs.numberOfRolls,
        groupRollInputs.targetDC,
        groupRollInputs.modifier,
        groupRollInputs.advantageType,
        groupRollInputs.charLevel,
        groupRollInputs.damageType,
        groupRollInputs.spellLevel,
    ]);

    const handleGroupRoll = () => {
        setGroupRollStats(getGroupRollResults(groupRollInputs));
    };

    return (
        <div className="card">
            <h1>Group Rolls</h1>

            <GroupRollTypeRadio setGroupRollType={setGroupRollType} />

            <NumberOfRollsInput setGroupInputs={setGroupRollInputs} />

            <TargetDCInput
                groupRollType={groupRollType}
                setGroupInputs={setGroupRollInputs}
            />

            <ModifierInput
                groupRollType={groupRollType}
                setGroupInputs={setGroupRollInputs}
            />

            <AdvantageTypeSelect setGroupInputs={setGroupRollInputs} />

            {groupRollType === "Attacks" ? (
                <>
                    <CharacterLevelInput setGroupInputs={setGroupRollInputs} />
                    <DamageTypeSelect setGroupInputs={setGroupRollInputs} />

                    {groupRollInputs.damageType === "Magic" ? (
                        <SpellLevelSelect setGroupInputs={setGroupRollInputs} />
                    ) : null}
                </>
            ) : null}

            <Button
                label="Roll Critical"
                className="submit-button"
                handleClick={handleGroupRoll}
            />

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    width: "100%",
                }}
            >
                <GroupRollStatsDisplay
                    groupRollType={groupRollType}
                    critType="Hit"
                    normalRolls={groupRollStats.whoSucceeded}
                    critRolls={{
                        whoHasNormalCritical:
                            groupRollStats.whoHasNormalCriticalHit,
                        whoHasTableCritical:
                            groupRollStats.whoHasTableCriticalHit,
                    }}
                    setGroupRollStats={setGroupRollStats}
                />

                <GroupRollStatsDisplay
                    groupRollType={groupRollType}
                    critType="Miss"
                    normalRolls={groupRollStats.whoFailed}
                    critRolls={{
                        whoHasNormalCritical:
                            groupRollStats.whoHasNormalCriticalMiss,
                        whoHasTableCritical:
                            groupRollStats.whoHasTableCriticalMiss,
                    }}
                    setGroupRollStats={setGroupRollStats}
                />
            </div>
        </div>
    );
};
export default GroupRolls;
