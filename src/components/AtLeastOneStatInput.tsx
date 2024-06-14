import React from "react";

interface AtLeastOneStatInputProps {
    setAtLeastOneStatIs: React.Dispatch<React.SetStateAction<number>>;
}

const AtLeastOneStatInput = ({
    setAtLeastOneStatIs,
}: AtLeastOneStatInputProps) => {
    return (
        <section className="row-wrap-center-center sm-margin-top">
            <label htmlFor="atLeastOneStat">
                At Least One Stat Greater Than:
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
