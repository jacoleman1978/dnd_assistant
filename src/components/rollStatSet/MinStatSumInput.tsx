import React, { Dispatch, SetStateAction } from "react";

interface MinStatSumInputProps {
    setMinStatSum: Dispatch<SetStateAction<number>>;
}

/**
 * An input for choosing the minimum sum of all stats.
 * @param setMinStatSum A function to update the minimum sum of all stats
 */
const MinStatSumInput = ({ setMinStatSum }: MinStatSumInputProps) => {
    return (
        <section className="row-wrap-center-center sm-margin-top sm-entry-box">
            <label htmlFor="minStatSum">Min Stat Sum:</label>
            <input
                type="number"
                className="input-field"
                id="minStatSum"
                defaultValue={18}
                min="18"
                max="85"
                onChange={(event) =>
                    setMinStatSum(parseInt(event.target.value))
                }
            />
        </section>
    );
};
export default MinStatSumInput;
