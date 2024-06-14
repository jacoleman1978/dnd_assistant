import { useState, useEffect } from "react";

import GroupRollTypeRadio from "./GroupRollTypeRadio";
import NumberOfRollsInput from "./NumberOfRollsInput";
import TargetDCInput from "./TargetDCInput";
import ModifierInput from "./ModifierInput";
import AdvantageTypeSelect from "./AdvantageTypeSelect";
import CharacterLevelInput from "../criticalRolls/CharacterLevelInput";
import DamageTypeSelect from "../criticalRolls/DamageTypeSelect";
import SpellLevelInput from "../criticalRolls/SpellLevelInput";
import GroupRollStatsDisplay from "./GroupRollStatsDisplay";
import Button from "../Button";

import { getGroupRollResults } from "../../helperFunctions/rollForGroups";
import { GroupRollType } from "../../staticData/types";
import { GroupRollInputs, GroupRollStats } from "../../staticData/interfaces";

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
        <section>
        <section className="card">
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
                        <SpellLevelInput setGroupInputs={setGroupRollInputs} />
                    ) : null}
                </>
            ) : null}

            <Button
                label="Roll Critical"
                className="submit-button"
                handleClick={handleGroupRoll}
            />

            <section className="column-align-start">
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
            </section>
        </section>
        <section className="card">
            <p className="source med-margin-top">
                Often in D&D, you need to roll attacks or saves for a group of enemies, conjured creatures, or summoned creatures. Often this task is time consuming and slows down combat. This tool is designed to help speed up the process by allowing you to roll for multiple creatures at once.
            </p>
        </section>
        </section>
    );
};
export default GroupRolls;
