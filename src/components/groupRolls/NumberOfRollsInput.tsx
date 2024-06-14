import React, { ChangeEvent, Dispatch, SetStateAction } from "react";

import { GroupRollInputs } from "../../staticData/interfaces";

interface NumberOfRollsInputProps {
    setGroupInputs: Dispatch<SetStateAction<GroupRollInputs>>;
}

/**
 * An input for choosing the number of rolls for a group roll.
 * @param setGroupInputs A function to update the group roll inputs
 */
const NumberOfRollsInput = ({ setGroupInputs }: NumberOfRollsInputProps) => {
    const handleNumberOfRollsChange = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        setGroupInputs((prev) => ({
            ...prev,
            numberOfRolls: parseInt(event.target.value),
        }));
    };
    return (
        <section className="row-wrap-center-center">
            <label htmlFor="number-of-rolls">Number of Rolls:</label>
            <input
                type="number"
                id="number-of-rolls"
                className="input-field"
                defaultValue={5}
                min="1"
                max="50"
                onChange={handleNumberOfRollsChange}
            />
        </section>
    );
};
export default NumberOfRollsInput;
