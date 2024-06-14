import React, { ChangeEvent, Dispatch, SetStateAction } from "react";

import { GroupRollInputs } from "../../staticData/interfaces";
import { SpellLevel } from "../../staticData/types";

interface SpellLevelSelectProps {
    setGroupInputs: Dispatch<SetStateAction<GroupRollInputs>>;
}

/**
 * A dropdown select input for choosing the spell level for a group roll.
 * @param setGroupInputs A function to update the group roll inputs
 */
const SpellLevelInput = ({ setGroupInputs }: SpellLevelSelectProps) => {
    const handleSpellLevelChange = (event: ChangeEvent<HTMLInputElement>) => {
        setGroupInputs((prev) => ({
            ...prev,
            spellLevel: Number(event.target.value) as SpellLevel,
        }));
    };

    return (
        <section className="row-wrap-center-center sm-margin-bottom">
            <label htmlFor="spell-level">Spell Level:</label>
            <input
                type="number"
                id="spell-level"
                className="input-field"
                defaultValue={0}
                min={0}
                max={9}
                onChange={handleSpellLevelChange}
            />
        </section>
    );
};
export default SpellLevelInput;
