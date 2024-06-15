import React, { Dispatch, SetStateAction } from "react";

interface MinStatAllowedInputProps {
    setMinStatAllowed: Dispatch<SetStateAction<number>>;
}

/**
 * An input for choosing the minimum value for each stat.
 * @param setMinStatAllowed A function to update the minimum value for each stat
 * @returns
 */
const MinStatAllowedInput = ({
    setMinStatAllowed,
}: MinStatAllowedInputProps) => {
    return (
        <section className="row-wrap-center-center sm-margin-top sm-entry-box sm-screen-margin-right">
            <label htmlFor="minStatAllowed">Min Stat Allowed:</label>
            <input
                type="number"
                className="input-field"
                id="minStatAllowed"
                defaultValue={3}
                min="3"
                max="10"
                onChange={(event) =>
                    setMinStatAllowed(Number(event.target.value))
                }
            />
        </section>
    );
};
export default MinStatAllowedInput;
