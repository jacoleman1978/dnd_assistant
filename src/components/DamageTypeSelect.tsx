import { FormControl, MenuItem, Select } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

import { DamageType } from "../staticData/types";
import { GroupRollInputs } from "../staticData/interfaces";

interface DamageTypeProps {
    damageType: DamageType;
    setGroupInputs: React.Dispatch<React.SetStateAction<GroupRollInputs>>;
}

/**
 * A dropdown select input for choosing the damage type for a group roll.
 * @param damageType The current damage type for the group roll
 * @param setGroupInputs A function to update the group roll inputs
 */
const DamageTypeSelect = ({ damageType, setGroupInputs }: DamageTypeProps) => {
    const handleDamageTypeChange = (event: SelectChangeEvent) => {
        setGroupInputs((prev) => ({
            ...prev,
            damageType: event.target.value as DamageType,
        }));
    };

    return (
        <FormControl>
            <div className="row-wrap-center-center sm-margin-vertical">
                <label>
                    Damage type:
                    <Select
                        sx={{ minWidth: 150 }}
                        name="damage-type"
                        className="sm-margin-left"
                        defaultValue="Slashing"
                        labelId="damage-type"
                        id="damage-type"
                        value={damageType}
                        label="Damage Type"
                        onChange={handleDamageTypeChange}
                    >
                        <MenuItem value={"Slashing"}>Slashing</MenuItem>
                        <MenuItem value={"Bludgeoning"}>Bludgeoning</MenuItem>
                        <MenuItem value={"Piercing"}>Piercing</MenuItem>
                        <MenuItem value={"Magic"}>Magic</MenuItem>
                    </Select>
                </label>
            </div>
        </FormControl>
    );
};
export default DamageTypeSelect;
