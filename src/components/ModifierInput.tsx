import { FormControl } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

import { GroupRollType, Modifier } from "../staticData/types";
import { GroupRollInputs } from "../staticData/interfaces";

interface ModifierInputProps {
    groupRollType: GroupRollType;
    setGroupInputs: React.Dispatch<React.SetStateAction<GroupRollInputs>>;
}

const ModifierInput = ({groupRollType, setGroupInputs}: ModifierInputProps) => {
    const handleModifierChange = (event: SelectChangeEvent) => {
        setGroupInputs((prev) => ({
            ...prev,
            modifier: parseInt(event.target.value) as Modifier,
        }));

    };
  return (
    <FormControl>
                <div className="row-wrap-center-center sm-margin-top">
                    <label htmlFor="modifier" className="sm-margin-right">
                        {`${
                            groupRollType === "Attacks" ? "To Hit" : "Save"
                        } Modifier:`}
                    </label>
                    <input
                        type="number"
                        id="modifier"
                        defaultValue={3}
                        min="-5"
                        max="30"
                        onChange={handleModifierChange}
                    />
                </div>
            </FormControl>
  )
}
export default ModifierInput