import React from "react";

interface MinStatAllowedInputProps {
    setMinStatAllowed: React.Dispatch<React.SetStateAction<number>>;
}

const MinStatAllowedInput = ({ setMinStatAllowed }: MinStatAllowedInputProps) => {
    return (
        <section className="row-wrap-center-center sm-margin-top">
            <label htmlFor="minStatAllowed">
                Min Stat Allowed:
            </label>
            <input
                type="number"
                className="input-field"
                id="minStatAllowed"
                defaultValue={3}
                min="3"
                max="10"
                onChange={(event) => setMinStatAllowed(Number(event.target.value))}
            />
        </section>
    );
};
export default MinStatAllowedInput;
