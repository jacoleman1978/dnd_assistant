import React, { ChangeEvent, Dispatch, SetStateAction } from "react";

import { AdvantageType } from "../../staticData/types";
import { GroupRollInputs } from "../../staticData/interfaces";

interface AdvantageTypeSelectProps {
    setGroupInputs: Dispatch<SetStateAction<GroupRollInputs>>;
}

/**
 * A dropdown select input for choosing the advantage type for a group roll.
 * @param setGroupInputs A function to update the group roll inputs
 */
const AdvantageTypeSelect = ({ setGroupInputs }: AdvantageTypeSelectProps) => {
    const handleAdvantageTypeChange = (
        event: ChangeEvent<HTMLSelectElement>
    ) => {
        setGroupInputs((prev) => ({
            ...prev,
            advantageType: event.target.value as AdvantageType,
        }));
    };
    return (
        <section className="row-wrap-center-center sm-margin-vertical sm-entry-box">
            <label htmlFor="advantage-type">Advantage Type:</label>
            <select
                id="advantage-type"
                className="select-box"
                name="advantage-type"
                defaultValue={"Normal"}
                onChange={handleAdvantageTypeChange}
            >
                <option value="Normal">Normal</option>
                <option value="Advantage">Advantage</option>
                <option value="Disadvantage">Disadvantage</option>
            </select>
        </section>
    );
};
export default AdvantageTypeSelect;
