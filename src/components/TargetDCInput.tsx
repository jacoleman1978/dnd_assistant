import { FormControl } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

import { GroupRollType } from "../staticData/types";
import { GroupRollInputs } from "../staticData/interfaces";

interface TargetDCInputProps {
    groupRollType: GroupRollType;
    setGroupInputs: React.Dispatch<React.SetStateAction<GroupRollInputs>>;
}

const TargetDCInput = ({
    groupRollType,
    setGroupInputs,
}: TargetDCInputProps) => {
    const handleTargetDCChange = (event: SelectChangeEvent) => {
        setGroupInputs((prev) => ({
            ...prev,
            targetDC: parseInt(event.target.value),
        }));
    };
    return (
        <FormControl>
            <div className="row-wrap-center-center sm-margin-top">
                <label htmlFor="target-dc" className="sm-margin-right">
                    {`Target ${groupRollType === "Attacks" ? "AC" : "DC"}:`}
                </label>
                <input
                    type="number"
                    id="target-dc"
                    defaultValue={15}
                    min="1"
                    max="35"
                    onChange={handleTargetDCChange}
                />
            </div>
        </FormControl>
    );
};
export default TargetDCInput;
