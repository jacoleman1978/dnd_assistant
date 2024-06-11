import { useEffect } from "react";

import { Typography } from "@mui/material";

import { GroupRollStats, WhoTableCritted } from "../staticData/interfaces";
import { GroupRollType } from "../staticData/types";

interface SucceededStatsDisplayProps {
    groupRollType: GroupRollType;
    groupRollStats: GroupRollStats;
    setGroupRollStats: React.Dispatch<React.SetStateAction<GroupRollStats>>;
}

const SucceededStatsDisplay = ({
    groupRollType,
    groupRollStats,
    setGroupRollStats,
}: SucceededStatsDisplayProps) => {
    useEffect(() => {
        const whoSucceeded: number[] = groupRollStats.whoSucceeded.sort(
            (a, b) => a - b
        );
        const whoHasNormalCriticalHit: number[] =
            groupRollStats.whoHasNormalCriticalHit.sort((a, b) => a - b);
        const whoHasTableCriticalHit: WhoTableCritted[] =
            groupRollStats.whoHasTableCriticalHit.sort(
                (a, b) => a.identity - b.identity
            );

        setGroupRollStats((prev) => ({
            ...prev,
            whoSucceeded,
            whoHasNormalCriticalHit,
            whoHasTableCriticalHit,
        }));
    }, [
        groupRollStats.whoSucceeded,
        groupRollStats.whoHasNormalCriticalHit,
        groupRollStats.whoHasTableCriticalHit,
        setGroupRollStats,
    ]);
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                width: "100%",
            }}
        >
            {groupRollStats.whoSucceeded.length > 0 ? (
                <Typography
                    sx={{ textAlign: "left", width: "100%", marginTop: 2 }}
                >
                    {`Who ${
                        groupRollType === "Attacks" ? "Hit" : "Passed"
                    }: ${groupRollStats.whoSucceeded.join(", ")}`}
                </Typography>
            ) : null}

            {groupRollType === "Attacks" &&
            groupRollStats.whoHasNormalCriticalHit.length > 0 ? (
                <Typography
                    sx={{ textAlign: "left", width: "100%", marginTop: 2 }}
                >
                    {`Who Had Normal Critical Hit: ${groupRollStats.whoHasNormalCriticalHit.join(
                        ", "
                    )}`}
                </Typography>
            ) : null}

            {groupRollType === "Attacks" &&
            groupRollStats.whoHasTableCriticalHit.length > 0 ? (
                <>
                    <Typography
                        sx={{ textAlign: "left", width: "100%", marginTop: 2 }}
                    >
                        {" "}
                        Who Had A Table Critical Hit:
                    </Typography>
                    {groupRollStats.whoHasTableCriticalHit.map(
                        (crit, index) => {
                            return (
                                <Typography
                                    sx={{
                                        textAlign: "left",
                                        width: "100%",
                                        marginTop: index > 0 ? 2 : 0,
                                        marginLeft: 2,
                                    }}
                                    key={crit.identity}
                                >
                                    {`${crit.identity}: ${crit.critMessage}`}
                                </Typography>
                            );
                        }
                    )}
                </>
            ) : null}
        </div>
    );
};
export default SucceededStatsDisplay;
