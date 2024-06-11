import {
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

import { CritType } from "../staticData/types";

interface CritTypeSelectProps {
    setCritType: React.Dispatch<React.SetStateAction<CritType>>;
}

/**
 * A radio group for selecting the type of critical roll: hit or miss.
 * @param setCritType A function to update the crit type
 */
const CritTypeSelect = ({ setCritType }: CritTypeSelectProps) => {
    const handleCritTypeChange = (event: SelectChangeEvent) => {
        setCritType(event.target.value as CritType);
    };
    return (
        <FormControl>
            <div className="row-wrap-center-center">
                <label className="sm-margin-right row-wrap-center-center">
                    Crit Type:
                    <RadioGroup
                        row
                        id="critType"
                        className="sm-margin-left"
                        aria-label="critType"
                        name="critType"
                        defaultValue="Hit"
                        onChange={handleCritTypeChange}
                    >
                        <FormControlLabel
                            value="Hit"
                            control={<Radio />}
                            label="Hit"
                        />
                        <FormControlLabel
                            value="Miss"
                            control={<Radio />}
                            label="Miss"
                        />
                    </RadioGroup>
                </label>
            </div>
        </FormControl>
    );
};
export default CritTypeSelect;
