import React, { ChangeEvent, Dispatch, SetStateAction } from "react";

import { DamageType } from "../../staticData/types";
import { GroupRollInputs } from "../../staticData/interfaces";

interface DamageTypeProps {
    setGroupInputs: Dispatch<SetStateAction<GroupRollInputs>>;
}

/**
 * A dropdown select input for choosing the damage type for a group roll.
 * @param setGroupInputs A function to update the group roll inputs
 */
const DamageTypeSelect = ({ setGroupInputs }: DamageTypeProps) => {
    const handleDamageTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setGroupInputs((prev) => ({
            ...prev,
            damageType: event.target.value as DamageType,
        }));
    };

    return (
        <section className="row-wrap-center-center sm-margin-vertical">
            <label htmlFor="damage-type">Damage Type:</label>
            <select
                id="damage-type"
                className="select-box"
                name="damage-type"
                defaultValue={"Slashing"}
                onChange={handleDamageTypeChange}
            >
                <option value="Slashing">Slashing</option>
                <option value="Bludgeoning">Bludgeoning</option>
                <option value="Piercing">Piercing</option>
                <option value="Magic">Magic</option>
            </select>
        </section>
    );
};
export default DamageTypeSelect;
