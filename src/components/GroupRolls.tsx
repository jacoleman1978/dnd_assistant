import { useState } from "react";
import {
    Typography,
    MenuItem,
    FormControl,
    Select,
    Button,
    RadioGroup,
    FormControlLabel,
    Radio,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

import { getGroupRollResults } from "../helperFunctions/rollForGroups";
import {
    DamageType,
    Level,
    SpellLevel,
    GroupRollType,
    AdvantageType,
    Modifier,
} from "../staticData/types";
import { GroupRollInputs, GroupRollStats } from "../staticData/interfaces";

const GroupRolls = () => {
    const [groupRollInputs, setGroupRollInputs] = useState<GroupRollInputs>({
        numberOfRolls: 5,
        advantageType: "Normal",
        targetDC: 10,
        modifier: 0,
        damageType: "Bludgeoning",
        charLevel: 5,
        spellLevel: 0,
    });
    const [groupRollType, setGroupRollType] =
        useState<GroupRollType>("Attacks");
    const [groupRollStats, setGroupRollStats] = useState<GroupRollStats>({
        whoSucceeded: [],
        whoFailed: [],
        whoHasNormalCriticalHit: [],
        whoHasTableCriticalHit: [],
        whoHasNormalCriticalMiss: [],
        whoHasTableCriticalMiss: [],
    });

    const resetGroupRollStats = () => {
        return {
            whoSucceeded: [],
            whoFailed: [],
            whoHasNormalCriticalHit: [],
            whoHasTableCriticalHit: [],
            whoHasNormalCriticalMiss: [],
            whoHasTableCriticalMiss: [],
        };
        }

    const handleGroupRollTypeChange = (event: SelectChangeEvent) => {
        setGroupRollType(event.target.value as GroupRollType);
        setGroupRollInputs({
            ...groupRollInputs,
            damageType: "Bludgeoning",
            charLevel: 5,
            spellLevel: 0,
        });
        setGroupRollStats(resetGroupRollStats());
    };

    const handleNumberOfRollsChange = (event: SelectChangeEvent) => {
        const numberOfRolls = Number(event.target.value);
        if (
            Number.isInteger(numberOfRolls) ||
            (numberOfRolls > 0 && numberOfRolls <= 50)
        ) {
            setGroupRollInputs({
                ...groupRollInputs,
                numberOfRolls: Number(event.target.value),
            });
        }
        setGroupRollStats(resetGroupRollStats());
    };

    const handleTargetDCChange = (event: SelectChangeEvent) => {
        const targetDC = Number(event.target.value);
        if (Number.isInteger(targetDC) || (targetDC >= 1 && targetDC <= 35)) {
            setGroupRollInputs({
                ...groupRollInputs,
                targetDC: Number(event.target.value),
            });
        } 
        setGroupRollStats(resetGroupRollStats());
    };

    const handleModifierChange = (event: SelectChangeEvent) => {
        const modifier = Number(event.target.value);
        if (Number.isInteger(modifier) || (modifier >= -5 && modifier <= 30)) {
            setGroupRollInputs({
                ...groupRollInputs,
                modifier: Number(event.target.value) as Modifier,
            });
        }
        setGroupRollStats(resetGroupRollStats());
    };

    const handleCharLevelChange = (event: SelectChangeEvent) => {
        setGroupRollInputs({
            ...groupRollInputs,
            charLevel: Number(event.target.value) as Level,
        });
        setGroupRollStats(resetGroupRollStats());
    };

    const handleDamageTypeChange = (event: SelectChangeEvent) => {
        setGroupRollInputs({
            ...groupRollInputs,
            damageType: event.target.value as DamageType,
        });
        setGroupRollStats(resetGroupRollStats());
    };

    const handleSpellLevelChange = (event: SelectChangeEvent) => {
        setGroupRollInputs({
            ...groupRollInputs,
            spellLevel: Number(event.target.value) as SpellLevel,
        });
        setGroupRollStats(resetGroupRollStats());
    };

    const handleGroupRoll = () => {
        const results = getGroupRollResults(groupRollInputs);
        results.whoSucceeded = results.whoSucceeded.sort((a, b) => a - b);
        results.whoFailed = results.whoFailed.sort((a, b) => a - b);
        results.whoHasNormalCriticalHit = results.whoHasNormalCriticalHit.sort((a, b) => a - b);
        results.whoHasTableCriticalHit = results.whoHasTableCriticalHit.sort((a, b) => a.identity - b.identity);
        results.whoHasNormalCriticalMiss = results.whoHasNormalCriticalMiss.sort((a, b) => a - b);
        results.whoHasTableCriticalMiss = results.whoHasTableCriticalMiss.sort((a, b) => a.identity - b.identity);
        setGroupRollStats(results);
    };

    return (
        <div className="card">
            <FormControl>
                <Typography variant="h5">Group Rolls</Typography>
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

            <FormControl>
                <div className="row-wrap-center-center">
                    <label
                        htmlFor="number-of-rolls"
                        className="sm-margin-right"
                    >
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
            <FormControl>
                <div className="row-wrap-center-center sm-margin-top">
                    <label htmlFor="modifier" className="sm-margin-right">
                        {`${
                            groupRollType === "Attacks" ? "To Hit" : "Save"
                        } Bonus:`}
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
                            value={groupRollInputs.advantageType}
                            label="Advantage Type"
                            onChange={(event) =>
                                setGroupRollInputs({
                                    ...groupRollInputs,
                                    advantageType: event.target
                                        .value as AdvantageType,
                                })
                            }
                        >
                            <MenuItem value={"Normal"}>Normal</MenuItem>
                            <MenuItem value={"Advantage"}>Advantage</MenuItem>
                            <MenuItem value={"Disadvantage"}>
                                Disadvantage
                            </MenuItem>
                        </Select>
                    </label>
                </div>
            </FormControl>
            {groupRollType === "Attacks" ? (
                <>
                    <FormControl>
                        <div className="row-wrap-center-center sm-margin-vertical">
                            <label>
                                Character Level:
                                <Select
                                    sx={{ minWidth: 150 }}
                                    name="char-level"
                                    id="char-level"
                                    className="sm-margin-left"
                                    defaultValue="5"
                                    value={groupRollInputs.charLevel.toString()}
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
                            </label>
                        </div>
                    </FormControl>
                    <FormControl>
                        <div className="row-wrap-center-center sm-margin-vertical">
                            <label>
                                Damage type:
                                <Select
                                    sx={{ minWidth: 150 }}
                                    name="damage-type"
                                    className="sm-margin-left"
                                    defaultValue="Slashing"
                                    id="damage-type"
                                    value={groupRollInputs.damageType}
                                    label="Damage Type"
                                    onChange={handleDamageTypeChange}
                                >
                                    <MenuItem value={"Slashing"}>
                                        Slashing
                                    </MenuItem>
                                    <MenuItem value={"Bludgeoning"}>
                                        Bludgeoning
                                    </MenuItem>
                                    <MenuItem value={"Piercing"}>
                                        Piercing
                                    </MenuItem>
                                    <MenuItem value={"Magic"}>Magic</MenuItem>
                                </Select>
                            </label>
                        </div>
                    </FormControl>
                    {groupRollInputs.damageType === "Magic" ? (
                        <FormControl>
                            <div className="row-wrap-center-center sm-margin-vertical">
                                <label>Spell Level:</label>
                                <Select
                                    sx={{ minWidth: 150 }}
                                    className="sm-margin-left"
                                    defaultValue="5"
                                    id="spell-level"
                                    value={groupRollInputs.spellLevel.toString()}
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
                    ) : null}
                </>
            ) : null}
            <div className="row-wrap-center-center">
                <Button
                    sx={{ marginBottom: 1, width: 200 }}
                    variant="outlined"
                    color="primary"
                    size="large"
                    onClick={handleGroupRoll}
                >
                    Roll Critical
                </Button>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    width: "100%",
                }}
            >
                {groupRollStats.whoSucceeded.length > 0 ? <Typography
                    sx={{ textAlign: "left", width: "100%", marginTop: 2 }}
                >
                    {`Who ${groupRollType === "Attacks" ? "Hit" : "Passed"}: ${groupRollStats.whoSucceeded.join(", ")}`}
                </Typography> : null}

                {groupRollType === 'Attacks' && groupRollStats.whoHasNormalCriticalHit.length > 0 ? <Typography
                    sx={{ textAlign: "left", width: "100%", marginTop: 2 }}
                >
                    {`Who Had Normal Critical Hit: ${groupRollStats.whoHasNormalCriticalHit.join(", ")}`}
                </Typography> : null}

                {groupRollType === 'Attacks' && groupRollStats.whoHasTableCriticalHit.length > 0 ? <>
                <Typography
                    sx={{ textAlign: "left", width: "100%", marginTop: 2 }}
                > Who Had A Table Critical Hit:</Typography>
                {groupRollStats.whoHasTableCriticalHit.map((crit, index) =>  {
                    return (
                        <Typography
                            sx={{ textAlign: "left", width: "100%", marginTop: index > 0 ? 2 : 0, marginLeft: 2 }}
                            key={crit.identity}
                        >
                            {`${crit.identity}: ${crit.critMessage}`}
                        </Typography>
                    );
                })}</> : null}

                {groupRollStats.whoFailed.length > 0 ? <Typography
                    sx={{ textAlign: "left", width: "100%", marginTop: 2 }}
                >
                    {`Who ${groupRollType === "Attacks" ? "Missed" : "Failed"}: ${groupRollStats.whoFailed.join(", ")}`}
                </Typography> : null}

                {groupRollType === 'Attacks' && groupRollStats.whoHasNormalCriticalMiss.length > 0 ? <Typography
                    sx={{ textAlign: "left", width: "100%", marginTop: 2 }}
                >
                    {`Who Had Normal Critical Miss: ${groupRollStats.whoHasNormalCriticalMiss.join(", ")}`}
                </Typography> : null}

                {groupRollType === 'Attacks' && groupRollStats.whoHasTableCriticalMiss.length > 0 ? <>
                    <Typography
                        sx={{ textAlign: "left", width: "100%", marginTop: 2 }}
                    > Who Had A Table Critical Miss:</Typography>
                {groupRollType === 'Attacks' && groupRollStats.whoHasTableCriticalMiss.map((crit, index) =>  {
                    return (
                        <Typography
                            sx={{ textAlign: "left", width: "100%", marginTop: index > 0 ? 2 : 0, marginLeft: 2}}
                            key={crit.identity}
                        >
                            {`${crit.identity}: ${crit.critMessage}`}
                        </Typography>
                    );
                })}</> : null}
            </div>
        </div>
    );
};
export default GroupRolls;
