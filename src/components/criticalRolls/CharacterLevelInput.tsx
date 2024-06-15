import React, { ChangeEvent, Dispatch, SetStateAction } from "react";

import { Level } from "../../staticData/types";
import { GroupRollInputs } from "../../staticData/interfaces";

interface CharacterLevelProps {
    setGroupInputs: Dispatch<SetStateAction<GroupRollInputs>>;
}

/**
 * A dropdown select input for choosing the character level from 1 to 20 for a group roll.
 * @param setGroupInputs A function to update the group roll inputs
 */
const CharacterLevelInput = ({ setGroupInputs }: CharacterLevelProps) => {
    const handleCharLevelChange = (event: ChangeEvent<HTMLInputElement>) => {
        setGroupInputs((prev) => ({
            ...prev,
            charLevel: Number(event.target.value) as Level,
        }));
    };
    return (
        <section className="row-wrap-center-center sm-entry-box">
            <label htmlFor="char-level">Character Level:</label>
            <input
                className="input-field"
                type="number"
                id="char-level"
                defaultValue={5}
                min={1}
                max={20}
                onChange={handleCharLevelChange}
            />
        </section>
    );
};
export default CharacterLevelInput;
