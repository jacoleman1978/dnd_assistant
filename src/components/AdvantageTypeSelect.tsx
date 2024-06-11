import { FormControl, MenuItem, Select } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

import { AdvantageType } from "../staticData/types";
import { GroupRollInputs } from "../staticData/interfaces";

interface AdvantageTypeSelectProps {
    advantageType: AdvantageType;
    setGroupInputs: React.Dispatch<React.SetStateAction<GroupRollInputs>>;
}

/**
 * A dropdown select input for choosing the advantage type for a group roll.
 * @param advantageType The current advantage type for the group roll
 * @param setGroupInputs A function to update the group roll inputs
 */
const AdvantageTypeSelect = ({
    advantageType,
    setGroupInputs,
}: AdvantageTypeSelectProps) => {
    const handleAdvantageTypeChange = (event: SelectChangeEvent) => {
        setGroupInputs((prev) => ({
            ...prev,
            advantageType: event.target.value as AdvantageType,
        }));
    };
    return (
        <FormControl>
            <div className="row-wrap-center-center sm-margin-vertical">
                <label>
                    Advantage Type:
                    <Select
                        sx={{ minWidth: 150 }}
                        name="advantage-type"
                        className="sm-margin-left"
                        defaultValue="Normal"
                        id="advantage-type"
                        value={advantageType}
                        label="Advantage Type"
                        onChange={handleAdvantageTypeChange}
                    >
                        <MenuItem value={"Normal"}>Normal</MenuItem>
                        <MenuItem value={"Advantage"}>Advantage</MenuItem>
                        <MenuItem value={"Disadvantage"}>Disadvantage</MenuItem>
                    </Select>
                </label>
            </div>
        </FormControl>
    );
};
export default AdvantageTypeSelect;
