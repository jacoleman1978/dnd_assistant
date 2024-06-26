import React, { ChangeEvent, Dispatch, SetStateAction } from "react";

import { CritType } from "../../staticData/types";

interface CritTypeRadioProps {
    setCritType: Dispatch<SetStateAction<CritType>>;
}

/**
 * A radio group for selecting the type of critical roll: hit or miss.
 * @param setCritType A function to update the crit type
 */
const CritTypeRadio = ({ setCritType }: CritTypeRadioProps) => {
    const handleCritTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCritType(event.target.value as CritType);
    };
    return (
        <section className="row-wrap-center-center sm-margin-vertical sm-radio-group">
            <p className="sm-margin-right sm-screen-margin-right">Crit Type:</p>
            <fieldset className="radio-group">
                <legend className="hidden">Crit Type</legend>
                <div className="radio-button">
                    <input
                        type="radio"
                        name="critType"
                        value="Hit"
                        defaultChecked
                        id="critHitRadio"
                        onChange={handleCritTypeChange}
                    />
                    <label
                        htmlFor="critHitRadio"
                        className="sm-margin-right radio-label"
                    >
                        Hit
                    </label>
                </div>

                <div className="radio-button">
                    <input
                        type="radio"
                        name="critType"
                        value="Miss"
                        id="critMissRadio"
                        onChange={handleCritTypeChange}
                    />
                    <label htmlFor="critMissRadio" className="radio-label">
                        Miss
                    </label>
                </div>
            </fieldset>
        </section>
    );
};
export default CritTypeRadio;
