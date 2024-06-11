import {
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

import { CritType } from "../staticData/types";
import { GroupRollInputs } from "../staticData/interfaces";

interface CritTypeSelectProps {
    setCritType: React.Dispatch<React.SetStateAction<CritType>>;
}

const CritTypeSelect = ({ setCritType }: CritTypeSelectProps) => {
    const handleCritTypeChange = (event: SelectChangeEvent) => {
        setCritType(event.target.value as CritType);
    };
    return (
        <FormControl>
            <div className="row-wrap-center-center">
                <label className="sm-margin-right">Crit Type:</label>
                <RadioGroup
                    row
                    id="critType"
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
            </div>
        </FormControl>
    );
};
export default CritTypeSelect;
