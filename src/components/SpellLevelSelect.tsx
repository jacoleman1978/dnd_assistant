import { FormControl, MenuItem, Select } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

import { GroupRollInputs } from "../staticData/interfaces";
import { SpellLevel } from "../staticData/types";

interface SpellLevelSelectProps {
    spellLevel: number;
    setGroupInputs: React.Dispatch<React.SetStateAction<GroupRollInputs>>;
}

const SpellLevelSelect = ({spellLevel, setGroupInputs}: SpellLevelSelectProps) => {
    const handleSpellLevelChange = (event: SelectChangeEvent) => {
        setGroupInputs((prev) => ({
            ...prev,
            spellLevel: Number(event.target.value) as SpellLevel,
        }));
    };
    
    return (
        <FormControl>
            <div className="row-wrap-center-center sm-margin-vertical">
                <label>Spell Level:</label>
                <Select
                    sx={{ minWidth: 150 }}
                    name="spell-level"
                    className="sm-margin-left"
                    defaultValue="5"
                    labelId="spell-level"
                    id="spell-level"
                    value={spellLevel.toString()}
                    label="Spell Level"
                    onChange={handleSpellLevelChange}
                >
                    <MenuItem value={"0"}>0</MenuItem>
                    <MenuItem value={"1"}>1</MenuItem>
                    <MenuItem value={"2"}>2</MenuItem>
                    <MenuItem value={"3"}>3</MenuItem>
                    <MenuItem value={"4"}>4</MenuItem>
                    <MenuItem value={"5"}>5</MenuItem>
                    <MenuItem value={"6"}>6</MenuItem>
                    <MenuItem value={"7"}>7</MenuItem>
                    <MenuItem value={"8"}>8</MenuItem>
                    <MenuItem value={"9"}>9</MenuItem>
                </Select>
            </div>
        </FormControl>
    );
};
export default SpellLevelSelect;
