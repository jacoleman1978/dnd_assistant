import { useState } from "react";
import {
    Typography,
    MenuItem,
    FormControl,
    Select,
    Button,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

import {
    defaultRarityMap,
    findItemByRarity,
} from "../helperFunctions/rollFindItem";
import { ItemRarity } from "../staticData/types";

// A component that determines if a magic item of a certain rarity is found and how much it would cost.
const FindMagicItems = () => {
    const [itemRarity, setItemRarity] = useState<ItemRarity>("Common");
    const [findModifier, setFindModifier] = useState<number>(
        defaultRarityMap["Common"]
    );
    const [findResult, setFindResult] = useState<string>("");

    const handleRarityChange = (event: SelectChangeEvent) => {
        setFindResult("");
        setFindModifier(defaultRarityMap[event.target.value as ItemRarity]);
        setItemRarity(event.target.value as ItemRarity);
    };

    const handleFindItemClick = () => {
        setFindResult(
            findItemByRarity(
                itemRarity,
                findModifier - defaultRarityMap[itemRarity]
            )
        );
    };

    const handleIncreaseFindModifier = () => {
        setFindResult("");
        if (findModifier === 100) {
            return;
        }
        setFindModifier((prev) => prev + 1);
    };

    const handleDecreaseFindModifier = () => {
        setFindResult("");
        if (findModifier === 0) {
            return;
        }
        setFindModifier((prev) => prev - 1);
    };

    return (
        <div className="card">
            <Typography variant="h5">Find Magic Items</Typography>

            <FormControl>
                <div className="row-wrap-center-center sm-margin-vertical">
                    <label>Item Rarity:</label>

                    <Select
                        sx={{ minWidth: 150 }}
                        name="item-rarity"
                        className="sm-margin-left"
                        defaultValue="Common"
                        labelId="item-rarity"
                        id="item-rarity"
                        value={itemRarity}
                        label="Item Rarity"
                        onChange={handleRarityChange}
                    >
                        <MenuItem value={"Common"}>Common</MenuItem>
                        <MenuItem value={"Uncommon"}>Uncommon</MenuItem>
                        <MenuItem value={"Rare"}>Rare</MenuItem>
                        <MenuItem value={"Very rare"}>Very rare</MenuItem>
                        <MenuItem value={"Legendary"}>Legendary</MenuItem>
                    </Select>
                </div>
            </FormControl>

            <div className="row-wrap-center-center sm-margin-bottom">
                <Typography>{`Find percentage for ${itemRarity.toLowerCase()}: ${
                    findModifier < 0 ? 0 : findModifier
                }%`}</Typography>
                <div>
                    <Button
                        sx={{ marginLeft: 1, marginRight: 1 }}
                        variant="outlined"
                        color="success"
                        onClick={handleIncreaseFindModifier}
                    >
                        +
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={handleDecreaseFindModifier}
                    >
                        -
                    </Button>
                </div>
            </div>

            <div className="row-wrap-center-center">
                <Button
                    sx={{ marginBottom: 1, width: 200 }}
                    variant="outlined"
                    color="primary"
                    size="large"
                    onClick={handleFindItemClick}
                >
                    Look for Item
                </Button>
            </div>

            <Typography sx={{ textAlign: "left", width: "100%" }}>
                {findResult}
            </Typography>
        </div>
    );
};
export default FindMagicItems;
