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

import { rollCritical } from "../helperFunctions/rollCriticals";
import { CritType, DamageType, Level, SpellLevel } from "../staticData/types";

const CritHitsAndMisses = () => {
    const [critType, setCritType] = useState<CritType>("Hit");
    const [charLevel, setCharLevel] = useState<Level>(5);
    const [damageType, setDamageType] = useState<DamageType>("Slashing");

    const [spellLevel, setSpellLevel] = useState<SpellLevel>(0);
    const [critResult, setCritResult] = useState<string[]>([]);

    const handleCritTypeChange = (event: SelectChangeEvent) => {
        setCritResult([]);
        setCritType(event.target.value as CritType);
    };

    const handleCharLevelChange = (event: SelectChangeEvent) => {
        setCritResult([]);
        setCharLevel(Number(event.target.value) as Level);
    };

    const handleDamageTypeChange = (event: SelectChangeEvent) => {
        setSpellLevel(0);
        setCritResult([]);
        setDamageType(event.target.value as DamageType);
    };

    const handleSpellLevelChange = (event: SelectChangeEvent) => {
        setCritResult([]);
        setSpellLevel(Number(event.target.value) as SpellLevel);
    };

    const handleRollCrit = () => {
        const critResult = rollCritical(
            critType,
            damageType,
            charLevel,
            spellLevel
        );
        setCritResult(critResult.split("\n"));
    };

    return (
        <div className="card">
            <FormControl>
                <Typography variant="h5">Critical Hits and Misses</Typography>
                <div className="row-wrap-center-center">
                    <label id="critType" className="sm-margin-right">
                        Crit Type:
                    </label>
                    <RadioGroup
                        row
                        aria-label="critType"
                        name="critType"
                        defaultValue="Hit"
                        onChange={handleCritTypeChange}
                    >
                        <FormControlLabel
                            value="Hit"
                            control={<Radio />}
                            label="Hit"
                        />
                        <FormControlLabel
                            value="Miss"
                            control={<Radio />}
                            label="Miss"
                        />
                    </RadioGroup>
                </div>
            </FormControl>
            <FormControl>
                <div className="row-wrap-center-center sm-margin-vertical">
                    <label id="char-level">Character Level:</label>
                    <Select
                        sx={{ minWidth: 150 }}
                        className="sm-margin-left"
                        defaultValue="5"
                        labelId="char-level"
                        id="char-level-select"
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
            <FormControl>
                <div className="row-wrap-center-center sm-margin-vertical">
                    <label id="damage-type">Damage type:</label>
                    <Select
                        sx={{ minWidth: 150 }}
                        className="sm-margin-left"
                        defaultValue="Slashing"
                        labelId="damage-type"
                        id="damage-type-select"
                        value={damageType}
                        label="Damage Type"
                        onChange={handleDamageTypeChange}
                    >
                        <MenuItem value={"Slashing"}>Slashing</MenuItem>
                        <MenuItem value={"Bludgeoning"}>Bludgeoning</MenuItem>
                        <MenuItem value={"Piercing"}>Piercing</MenuItem>
                        <MenuItem value={"Magic"}>Magic</MenuItem>
                    </Select>
                </div>
            </FormControl>
            {damageType === "Magic" ? (
                <FormControl>
                    <div className="row-wrap-center-center sm-margin-vertical">
                        <label id="spell-level">Spell Level:</label>
                        <Select
                            sx={{ minWidth: 150 }}
                            className="sm-margin-left"
                            defaultValue="5"
                            labelId="spell-level"
                            id="spell-level-select"
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
            ) : null}
            <div className="row-wrap-center-center">
                <Button
                    sx={{ marginBottom: 1, width: 200 }}
                    variant="outlined"
                    color="primary"
                    size="large"
                    onClick={handleRollCrit}
                >
                    Roll Critical
                </Button>
            </div>
            <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start", width: "100%"}}>
                {critResult.map((result, index) => (
                    <Typography key={`crit-${index}`} sx={{textAlign: "left", marginLeft: [0,2,4].includes(index) ? 0 : 3}}>{result}</Typography>
                ))}
            </div>
        </div>
    );
};
export default CritHitsAndMisses;
