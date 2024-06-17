import React, { useEffect, useRef, Dispatch, SetStateAction } from "react";

import CritHitMessage from "./CritHitMessage";
import CritMissMessage from "./CritMissMessage";

import {
    Criticals,
    GroupRollStats,
    WhoTableCritted,
} from "../../staticData/interfaces";
import { GroupRollType, CritType } from "../../staticData/types";

interface GroupRollStatsDisplayProps {
    groupRollType: GroupRollType;
    critType: CritType;
    normalRolls: number[];
    critRolls: Criticals;
    setGroupRollStats: Dispatch<SetStateAction<GroupRollStats>>;
}

/**
 * A display for showing who made a normal a group roll and who had normal and table criticals.
 * @param groupRollType The type of group roll: attacks or saves
 * @param critType The type of critical: 'Hit' or 'Miss'
 * @param normalRolls The array of normal rolls as numbers
 * @param critRolls The object of critical rolls of type Criticals
 * @param setGroupRollStats A function to update the group roll stats
 */
const GroupRollStatsDisplay = ({
    groupRollType,
    critType,
    normalRolls,
    critRolls,
    setGroupRollStats,
}: GroupRollStatsDisplayProps) => {
    const normalRollsRef = useRef<number[]>([]);

    // Sort the stats arrays by increasing order
    useEffect(() => {
        normalRollsRef.current = normalRolls.sort((a, b) => a - b);
        const whoHasNormalCritical: number[] =
            critRolls.whoHasNormalCritical.sort((a, b) => a - b);
        const whoHasTableCritical: WhoTableCritted[] =
            critRolls.whoHasTableCritical.sort(
                (a, b) => a.identity - b.identity
            );

        if (critType === "Hit") {
            setGroupRollStats((prev) => ({
                ...prev,
                whoSucceeded: normalRollsRef.current,
                whoHasNormalCriticalHit: whoHasNormalCritical,
                whoHasTableCriticalHit: whoHasTableCritical,
            }));
        } else if (critType === "Miss") {
            setGroupRollStats((prev) => ({
                ...prev,
                whoFailed: normalRollsRef.current,
                whoHasNormalCriticalMiss: whoHasNormalCritical,
                whoHasTableCriticalMiss: whoHasTableCritical,
            }));
        }
    }, [
        critRolls.whoHasNormalCritical,
        critRolls.whoHasTableCritical,
        critType,
        normalRolls,
        setGroupRollStats,
    ]);
    return (
        <section className="column-align-start">
            {normalRollsRef.current.length > 0 ? (
                <p className="group-roll-stats-section">
                    {`Who ${
                        groupRollType === "Attacks" ? (critType === "Hit" ? "Hit": "Missed") : (critType === "Hit" ? "Passed" : "Failed")
                    }: ${normalRollsRef.current.join(", ")}`}
                </p>
            ) : null}

            {groupRollType === "Attacks" &&
            critRolls.whoHasNormalCritical.length > 0 ? (
                <p className="group-roll-stats-section">
                    {`Who Had Normal Critical ${critType.toString()}: ${critRolls.whoHasNormalCritical.join(
                        ", "
                    )}`}
                </p>
            ) : null}

            {groupRollType === "Attacks" &&
            critRolls.whoHasTableCritical.length > 0 ? (
                <>
                    <p className="group-roll-stats-section">
                        {` Who Had A Table Critical ${critType.toString()}:`}
                    </p>
                    {critRolls.whoHasTableCritical.map((crit, index) => {
                        if (critType === "Hit") {
                            return (
                                <CritHitMessage
                                    crit={crit}
                                    index={index}
                                    key={crit.identity}
                                />
                            );
                        } else {
                            return (
                                <CritMissMessage
                                    crit={crit}
                                    index={index}
                                    key={crit.identity}
                                />
                            );
                        }
                    })}
                </>
            ) : null}
        </section>
    );
};
export default GroupRollStatsDisplay;
