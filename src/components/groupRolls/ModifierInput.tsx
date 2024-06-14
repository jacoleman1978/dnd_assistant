import React, { ChangeEvent, Dispatch, SetStateAction } from "react";

import { GroupRollType, Modifier } from "../../staticData/types";
import { GroupRollInputs } from "../../staticData/interfaces";

interface ModifierInputProps {
    groupRollType: GroupRollType;
    setGroupInputs: Dispatch<SetStateAction<GroupRollInputs>>;
}

/**
 * An input for choosing the number modifier for a group roll.
 * @param groupRollType The type of group roll: attacks or saves
 * @param setGroupInputs A function to update the group roll inputs
 */
const ModifierInput = ({
    groupRollType,
    setGroupInputs,
}: ModifierInputProps) => {
    const handleModifierChange = (event: ChangeEvent<HTMLInputElement>) => {
        setGroupInputs((prev) => ({
            ...prev,
            modifier: parseInt(event.target.value) as Modifier,
        }));
    };
    return (
        <section className="row-wrap-center-center sm-margin-top">
            <label htmlFor="modifier">
                {`${groupRollType === "Attacks" ? "To Hit" : "Save"} Modifier:`}
            </label>
            <input
                className="input-field"
                type="number"
                id="modifier"
                defaultValue={3}
                min="-5"
                max="30"
                onChange={handleModifierChange}
            />
        </section>
    );
};
export default ModifierInput;
