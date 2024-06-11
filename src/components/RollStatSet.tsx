import { useState } from "react";

import { Typography, FormControl, Button } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

import { rollStatSet } from "../helperFunctions/rollStatSet";

// A component for rolling a character stat set using 4d6 and drop the lowest
const RollStatSet = () => {
    const [minStatAllowed, setMinStatAllowed] = useState<number>(3);
    const [minStatSum, setMinStatSum] = useState<number>(18);
    const [atLeastOneStatIs, setAtLeastOneStatIs] = useState<number>(3);
    const [statSet, setStatSet] = useState<number[]>([]);

    const handleMinStatAllowedChange = (event: SelectChangeEvent) => {
        setMinStatAllowed(parseInt(event.target.value));
    };

    const handleMinStatSumChange = (event: SelectChangeEvent) => {
        setMinStatSum(parseInt(event.target.value));
    };

    const handleAtLeastOneStatIsChange = (event: SelectChangeEvent) => {
        setAtLeastOneStatIs(parseInt(event.target.value));
    };

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
            <Typography variant="h5">Roll Character Stat Set</Typography>
            <Typography variant="body2" sx={{ textAlign: "left" }}>
                Roll 4d6 and drop the lowest. Repeat 6 times to generate a stat
                set.
            </Typography>
            <FormControl>
                <div className="row-wrap-center-center sm-margin-top">
                    <label htmlFor="minStatAllowed" className="sm-margin-right">
                        Min Stat Allowed:
                    </label>
                    <input
                        type="number"
                        id="minStatAllowed"
                        defaultValue={3}
                        min="3"
                        max="10"
                        onChange={handleMinStatAllowedChange}
                    />
                </div>
            </FormControl>

            <FormControl>
                <div className="row-wrap-center-center sm-margin-top">
                    <label htmlFor="minStatSum" className="sm-margin-right">
                        Min Stat Sum:
                    </label>
                    <input
                        type="number"
                        id="minStatSum"
                        defaultValue={18}
                        min="18"
                        max="85"
                        onChange={handleMinStatSumChange}
                    />
                </div>
            </FormControl>

            <FormControl>
                <div className="row-wrap-center-center sm-margin-top">
                    <label htmlFor="atLeastOneStat" className="sm-margin-right">
                        At Least One Stat Equal To Or Greater Than:
                    </label>
                    <input
                        type="number"
                        id="atLeastOneStat"
                        defaultValue={3}
                        min="3"
                        max="18"
                        onChange={handleAtLeastOneStatIsChange}
                    />
                </div>
            </FormControl>

            <div className="row-wrap-center-center sm-margin-top">
                <Button
                    sx={{ marginBottom: 1, width: 200 }}
                    variant="outlined"
                    color="primary"
                    size="large"
                    onClick={handleRollStatSetClick}
                >
                    Roll Stat Set
                </Button>
            </div>

            <Typography sx={{ textAlign: "center", width: "100%" }}>
                {statSet.length > 0 ? statSet.join(", ") : ""}
            </Typography>
        </div>
    );
};
export default RollStatSet;
