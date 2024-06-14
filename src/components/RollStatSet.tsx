import { useState } from "react";

import MinStatAllowedInput from "./MinStatAllowedInput";
import MinStatSumInput from "./MinStatSumInput";
import AtLeastOneStatInput from "./AtLeastOneStatInput";
import Button from "./Button";

import { rollStatSet } from "../helperFunctions/rollStatSet";

// A component for rolling a character stat set using 4d6 and drop the lowest
const RollStatSet = () => {
    const [minStatAllowed, setMinStatAllowed] = useState<number>(3);
    const [minStatSum, setMinStatSum] = useState<number>(18);
    const [atLeastOneStatIs, setAtLeastOneStatIs] = useState<number>(3);
    const [statSet, setStatSet] = useState<number[]>([]);

    const handleRollStatSetClick = () => {
        const results = rollStatSet(
            minStatAllowed,
            minStatSum,
            atLeastOneStatIs
        );
        results.sort((a, b) => a - b);
        setStatSet(results);
    };

    return (
        <div className="card">
            <h1>Roll Character Stat Set</h1>
            <p style={{ textAlign: "left", marginTop: "20px" }}>
                Roll 4d6 and drop the lowest. Repeat 6 times to generate a stat
                set.
            </p>
            <MinStatAllowedInput setMinStatAllowed={setMinStatAllowed} />

            <MinStatSumInput setMinStatSum={setMinStatSum} />

            <AtLeastOneStatInput setAtLeastOneStatIs={setAtLeastOneStatIs} />

            <Button
                label="Roll Stat Set"
                className="submit-button sm-margin-vertical"
                handleClick={handleRollStatSetClick}
            />

            <p style={{ textAlign: "center", width: "100%" }}>
                {statSet.length > 0 ? statSet.join(", ") : ""}
            </p>
        </div>
    );
};
export default RollStatSet;
