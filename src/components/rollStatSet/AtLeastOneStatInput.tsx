import React, { Dispatch, SetStateAction } from "react";

interface AtLeastOneStatInputProps {
    setAtLeastOneStatIs: Dispatch<SetStateAction<number>>;
}

/**
 * An input for choosing the minimum value for at least one stat.
 * @param setAtLeastOneStatIs A function to update the minimum value for at least one stat
 * @returns
 */
const AtLeastOneStatInput = ({
    setAtLeastOneStatIs,
}: AtLeastOneStatInputProps) => {
    return (
        <section className="row-wrap-center-center sm-margin-top">
            <label htmlFor="atLeastOneStat">
                At Least One Stat Is:
            </label>
            <input
                type="number"
                className="input-field"
                id="atLeastOneStat"
                defaultValue={3}
                min="3"
                max="18"
                onChange={(event) =>
                    setAtLeastOneStatIs(Number(event.target.value))
                }
            />
        </section>
    );
};
export default AtLeastOneStatInput;
