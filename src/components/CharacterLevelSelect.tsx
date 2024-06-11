import {FormControl, Select, MenuItem} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

import { Level } from "../staticData/types";
import { GroupRollInputs } from "../staticData/interfaces";

interface CharacterLevelProps {
    charLevel: Level;
    setGroupInputs: React.Dispatch<React.SetStateAction<GroupRollInputs>>;
}

const CharacterLevelSelect = ({charLevel, setGroupInputs}: CharacterLevelProps) => {
    const handleCharLevelChange = (event: SelectChangeEvent) => {
        setGroupInputs((prev) => ({
            ...prev,
            charLevel: Number(event.target.value) as Level,
        }));
    };
    return (
        <FormControl>
            <div className="row-wrap-center-center sm-margin-vertical">
                <label>Character Level:</label>
                <Select
                    sx={{ minWidth: 150 }}
                    name="char-level"
                    id="char-level"
                    className="sm-margin-left"
                    defaultValue="5"
                    labelId="char-level"
                    value={charLevel.toString()}
                    label="Character Level"
                    onChange={handleCharLevelChange}
                >
                    <MenuItem value={"1"}>1</MenuItem>
                    <MenuItem value={"2"}>2</MenuItem>
                    <MenuItem value={"3"}>3</MenuItem>
                    <MenuItem value={"4"}>4</MenuItem>
                    <MenuItem value={"5"}>5</MenuItem>
                    <MenuItem value={"6"}>6</MenuItem>
                    <MenuItem value={"7"}>7</MenuItem>
                    <MenuItem value={"8"}>8</MenuItem>
                    <MenuItem value={"9"}>9</MenuItem>
                    <MenuItem value={"10"}>10</MenuItem>
                    <MenuItem value={"11"}>11</MenuItem>
                    <MenuItem value={"12"}>12</MenuItem>
                    <MenuItem value={"13"}>13</MenuItem>
                    <MenuItem value={"14"}>14</MenuItem>
                    <MenuItem value={"15"}>15</MenuItem>
                    <MenuItem value={"16"}>16</MenuItem>
                    <MenuItem value={"17"}>17</MenuItem>
                    <MenuItem value={"18"}>18</MenuItem>
                    <MenuItem value={"19"}>19</MenuItem>
                    <MenuItem value={"20"}>20</MenuItem>
                </Select>
            </div>
        </FormControl>
    );
};
export default CharacterLevelSelect;
