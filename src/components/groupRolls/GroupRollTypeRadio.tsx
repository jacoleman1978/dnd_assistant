import React, { ChangeEvent, Dispatch, SetStateAction } from "react";

import { GroupRollType } from "../../staticData/types";

interface GroupRollTypeRadioProps {
    setGroupRollType: Dispatch<SetStateAction<GroupRollType>>;
}

/**
 * A radio group for selecting the type of group roll: attacks or saves.
 * @param groupRollType The current group roll type
 * @param setGroupRollType A function to update the group roll type
 */
const GroupRollTypeRadio = ({ setGroupRollType }: GroupRollTypeRadioProps) => {
    const handleGroupRollTypeChange = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        setGroupRollType(event.target.value as GroupRollType);
    };
    return (
        <section className="row-wrap-center-center sm-margin-vertical sm-radio-group">
            <p className="sm-margin-right sm-screen-margin-right">Roll Type:</p>

            <fieldset className="radio-group">
                <legend className="hidden">Roll Type</legend>
                <div className="radio-button">
                    <input
                        type="radio"
                        name="groupRollType"
                        value="Attacks"
                        defaultChecked
                        id="groupRollAttacksRadio"
                        onChange={handleGroupRollTypeChange}
                    />
                    <label
                        htmlFor="groupRollAttacksRadio"
                        className="sm-margin-right radio-label"
                    >
                        Attacks
                    </label>
                </div>

                <div className="radio-button">
                    <input
                        type="radio"
                        name="groupRollType"
                        value="Saves"
                        id="groupRollSavesRadio"
                        onChange={handleGroupRollTypeChange}
                    />
                    <label
                        htmlFor="groupRollSavesRadio"
                        className="radio-label"
                    >
                        Saves
                    </label>
                </div>
            </fieldset>
        </section>
    );
};
export default GroupRollTypeRadio;
