import React, { ChangeEvent, Dispatch, SetStateAction } from "react";

interface FindPercentModifierInputProps {
    findModifier: number;
    setFindModifier: Dispatch<SetStateAction<number>>;
}

/**
 * A number input for setting the find modifier percentage.
 * @param findModifier A number representing the find modifier percentage
 * @param setFindModifier A function to update the find modifier percentage
 */
const FindPercentModifierInput = ({
    findModifier,
    setFindModifier,
}: FindPercentModifierInputProps) => {
    return (
        <section className="row-wrap-center-center sm-margin-bottom sm-entry-box">
            <label htmlFor="find-modifier">Find Modifier:</label>
            <input
                className="input-field"
                type="number"
                id="find-modifier"
                min={1}
                max={99}
                value={findModifier}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setFindModifier(Number(event.target.value))
                }
            />
        </section>
    );
};
export default FindPercentModifierInput;
