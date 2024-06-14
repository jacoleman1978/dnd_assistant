import React from "react";

interface MinStatSumInputProps {
    setMinStatSum: React.Dispatch<React.SetStateAction<number>>;
}

const MinStatSumInput = ({ setMinStatSum }: MinStatSumInputProps) => {
    return (
        <section className="row-wrap-center-center sm-margin-top">
            <label htmlFor="minStatSum">
                Min Stat Sum:
            </label>
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
