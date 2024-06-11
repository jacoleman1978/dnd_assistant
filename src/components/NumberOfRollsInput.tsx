import { FormControl } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

import { GroupRollInputs } from "../staticData/interfaces";

interface NumberOfRollsInputProps {
    setGroupInputs: React.Dispatch<React.SetStateAction<GroupRollInputs>>;
}

const NumberOfRollsInput = ({ setGroupInputs }: NumberOfRollsInputProps) => {
    const handleNumberOfRollsChange = (event: SelectChangeEvent) => {
        setGroupInputs((prev) => ({
            ...prev,
            numberOfRolls: parseInt(event.target.value),
        }));
    };
    return (
        <FormControl>
            <div className="row-wrap-center-center">
                <label htmlFor="number-of-rolls" className="sm-margin-right">
                    Number of Rolls:
                </label>
                <input
                    type="number"
                    id="number-of-rolls"
                    defaultValue={5}
                    min="1"
                    max="50"
                    onChange={handleNumberOfRollsChange}
                />
            </div>
        </FormControl>
    );
};
export default NumberOfRollsInput;
