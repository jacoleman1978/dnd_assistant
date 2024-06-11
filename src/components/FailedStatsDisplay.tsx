import { useEffect } from "react";

import { Typography } from "@mui/material";

import { GroupRollStats, WhoTableCritted } from "../staticData/interfaces";
import { GroupRollType } from "../staticData/types";

interface FailedStatsDisplayProps {
    groupRollType: GroupRollType;
    groupRollStats: GroupRollStats;
    setGroupRollStats: React.Dispatch<React.SetStateAction<GroupRollStats>>;
}

const FailedStatsDisplay = ({
    groupRollType,
    groupRollStats,
    setGroupRollStats,
}: FailedStatsDisplayProps) => {
    useEffect(() => {
        const whoFailed: number[] = groupRollStats.whoFailed.sort(
            (a, b) => a - b
        );
        const whoHasNormalCriticalMiss: number[] =
            groupRollStats.whoHasNormalCriticalMiss.sort((a, b) => a - b);
        const whoHasTableCriticalMiss: WhoTableCritted[] =
            groupRollStats.whoHasTableCriticalMiss.sort(
                (a, b) => a.identity - b.identity
            );

        setGroupRollStats((prev) => ({
            ...prev,
            whoFailed,
            whoHasNormalCriticalMiss,
            whoHasTableCriticalMiss,
        }));
    }, [
        groupRollStats.whoFailed,
        groupRollStats.whoHasNormalCriticalMiss,
        groupRollStats.whoHasTableCriticalMiss,
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
            {groupRollStats.whoFailed.length > 0 ? (
                <Typography
                    sx={{ textAlign: "left", width: "100%", marginTop: 2 }}
                >
                    {`Who ${
                        groupRollType === "Attacks" ? "Missed" : "Failed"
                    }: ${groupRollStats.whoFailed.join(", ")}`}
                </Typography>
            ) : null}

            {groupRollType === "Attacks" &&
            groupRollStats.whoHasNormalCriticalMiss.length > 0 ? (
                <Typography
                    sx={{ textAlign: "left", width: "100%", marginTop: 2 }}
                >
                    {`Who Had Normal Critical Miss: ${groupRollStats.whoHasNormalCriticalMiss.join(
                        ", "
                    )}`}
                </Typography>
            ) : null}

            {groupRollType === "Attacks" &&
            groupRollStats.whoHasTableCriticalMiss.length > 0 ? (
                <>
                    <Typography
                        sx={{ textAlign: "left", width: "100%", marginTop: 2 }}
                    >
                        {" "}
                        Who Had A Table Critical Miss:
                    </Typography>
                    {groupRollType === "Attacks" &&
                        groupRollStats.whoHasTableCriticalMiss.map(
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
export default FailedStatsDisplay;
