import React, { ChangeEvent } from "react";

import { GroupRollInputs } from "../../staticData/interfaces";
import { SpellLevel } from "../../staticData/types";

interface SpellLevelSelectProps {
    setGroupInputs: React.Dispatch<React.SetStateAction<GroupRollInputs>>;
}

/**
 * A dropdown select input for choosing the spell level for a group roll.
 * @param setGroupInputs A function to update the group roll inputs
 */
const SpellLevelSelect = ({ setGroupInputs }: SpellLevelSelectProps) => {
    const handleSpellLevelChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setGroupInputs((prev) => ({
            ...prev,
            spellLevel: Number(event.target.value) as SpellLevel,
        }));
    };

    return (
        <section className="row-wrap-center-center sm-margin-bottom">
            <label htmlFor="spell-level">Spell Level:</label>
            <select
                id="spell-level"
                className="select-box"
                name="spell-level"
                defaultValue={"5"}
                onChange={handleSpellLevelChange}
            >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
            </select>
        </section>
    );
};
export default SpellLevelSelect;
