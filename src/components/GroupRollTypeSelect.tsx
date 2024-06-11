import {
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

import { GroupRollType } from "../staticData/types";

interface GroupRollTypeSelectProps {
    groupRollType: GroupRollType;
    setGroupRollType: React.Dispatch<React.SetStateAction<GroupRollType>>;
}

/**
 * A radio group for selecting the type of group roll: attacks or saves.
 * @param groupRollType The current group roll type
 * @param setGroupRollType A function to update the group roll type
 */
const GroupRollTypeSelect = ({
    groupRollType,
    setGroupRollType,
}: GroupRollTypeSelectProps) => {
    const handleGroupRollTypeChange = (event: SelectChangeEvent) => {
        setGroupRollType(event.target.value as GroupRollType);
    };
    return (
        <FormControl>
            <div className="row-wrap-center-center">
                <label className="row-wrap-center-center">
                    Group Roll Type:
                    <RadioGroup
                        sx={{ marginLeft: 1 }}
                        row
                        id="group-roll-type"
                        aria-labelledby="group-roll-type"
                        value={groupRollType}
                        onChange={handleGroupRollTypeChange}
                    >
                        <FormControlLabel
                            value="Attacks"
                            control={<Radio />}
                            label="Attacks"
                        />
                        <FormControlLabel
                            value="Saves"
                            control={<Radio />}
                            label="Saves"
                        />
                    </RadioGroup>
                </label>
            </div>
        </FormControl>
    );
};
export default GroupRollTypeSelect;
