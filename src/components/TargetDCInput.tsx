import React, { ChangeEvent } from "react";

import { GroupRollType } from "../staticData/types";
import { GroupRollInputs } from "../staticData/interfaces";

interface TargetDCInputProps {
    groupRollType: GroupRollType;
    setGroupInputs: React.Dispatch<React.SetStateAction<GroupRollInputs>>;
}

/**
 * An input for choosing the target DC for a group roll.
 * @param groupRollType The type of group roll: attacks or saves
 * @param setGroupInputs A function to update the group roll inputs
 */
const TargetDCInput = ({
    groupRollType,
    setGroupInputs,
}: TargetDCInputProps) => {
    const handleTargetDCChange = (event: ChangeEvent<HTMLInputElement>) => {
        setGroupInputs((prev) => ({
            ...prev,
            targetDC: parseInt(event.target.value),
        }));
    };
    return (
        <section className="row-wrap-center-center sm-margin-top">
            <label htmlFor="target-dc">
                {`Target ${groupRollType === "Attacks" ? "AC" : "DC"}:`}
            </label>
            <input
                className="input-field"
                type="number"
                id="target-dc"
                defaultValue={15}
                min="1"
                max="35"
                onChange={handleTargetDCChange}
            />
        </section>
    );
};
export default TargetDCInput;
