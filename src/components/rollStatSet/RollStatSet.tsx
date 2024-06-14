import { useState } from "react";

import MinStatAllowedInput from "./MinStatAllowedInput";
import MinStatSumInput from "./MinStatSumInput";
import AtLeastOneStatInput from "./AtLeastOneStatInput";
import Button from "../Button";

import { rollStatSet } from "../../helperFunctions/rollStatSet";

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
        <section>
            <section className="card">
                <h1>Roll Character Stat Set</h1>

                <MinStatAllowedInput setMinStatAllowed={setMinStatAllowed} />

                <MinStatSumInput setMinStatSum={setMinStatSum} />

                <AtLeastOneStatInput
                    setAtLeastOneStatIs={setAtLeastOneStatIs}
                />

                <Button
                    label="Roll Stat Set"
                    className="submit-button sm-margin-vertical"
                    handleClick={handleRollStatSetClick}
                />

                <p style={{ textAlign: "center", width: "100%" }}>
                    {statSet.length > 0 ? statSet.join(", ") : ""}
                </p>
            </section>
            <section className="card">
                <h1>Stat Set Roll Options</h1>

                <p className="vsm-margin-top">
                    <strong>Min Stat Allowed:</strong> The minimum value a
                    single stat can be. By default this is 3 because the lowest
                    result of 4d6, dropping the lowest, is four 1s. Some DMs
                    prefer for their players to not have stats below a certain
                    number, such as 6 or 8.
                </p>

                <p className="sm-margin-top">
                    <strong>Min Stat Sum:</strong> The minimum sum of all stats.
                    By default this is 18, because if you were really unlucky
                    and rolled four 1s for each of the six stats, the sum would
                    be 18. The maximum sum of all stats is 108, which is an 18
                    in all 6 stats. Some DMs expect a certain level of power
                    from their players for specific campaigns, so they set a
                    minimum sum of all stats. A value of 67 would guarantee at
                    least one of the stats is 12 or higher.
                </p>

                <p className="sm-margin-top">
                    <strong>At Least One Stat Is:</strong> The minimum value at
                    least one stat must be. This ensures that the player has at
                    least one stat above a certain value, so they have at least
                    one viable option for their main stat. I've been in high
                    power campaigns where a DM wanted each character to have at
                    least one 18 and this tool can ensure that.
                </p>
            </section>
        </section>
    );
};
export default RollStatSet;
