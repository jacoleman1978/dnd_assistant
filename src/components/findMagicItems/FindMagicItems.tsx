import { useState, useEffect } from "react";

import ItemRaritySelect from "./ItemRaritySelect";
import Button from "../Button";

import {
    defaultRarityMap,
    findItemByRarity,
} from "../../helperFunctions/rollFindItem";
import { ItemRarity } from "../../staticData/types";

// A component that determines if a magic item of a certain rarity is found and how much it would cost.
const FindMagicItems = () => {
    const [itemRarity, setItemRarity] = useState<ItemRarity>("Common");
    const [findModifier, setFindModifier] = useState<number>(
        defaultRarityMap["Common"]
    );
    const [findResult, setFindResult] = useState<string>("");

    useEffect(() => {
        setFindResult("");
        setFindModifier(defaultRarityMap[itemRarity]);
    }, [itemRarity]);

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
            <h1>Find Magic Items</h1>

            <ItemRaritySelect setItemRarity={setItemRarity} />

            <div className="row-wrap-center-center sm-margin-bottom">
                <p>{`Find percentage for ${itemRarity.toLowerCase()}: ${
                    findModifier < 0 ? 0 : findModifier
                }%`}</p>

                <Button
                    label="+"
                    className="increment-button"
                    handleClick={handleIncreaseFindModifier}
                />
                <Button
                    label="-"
                    className="decrement-button"
                    handleClick={handleDecreaseFindModifier}
                />
            </div>

            <Button
                label="Find Item"
                className="submit-button"
                handleClick={handleFindItemClick}
            />

            <p style={{ textAlign: "left", width: "100%", marginTop: "10px" }}>
                {findResult.slice(0, findResult.indexOf("."))}
            </p>
            <p style={{ textAlign: "left", width: "100%", marginTop: "10px" }}>
                {findResult.slice(findResult.indexOf(".") + 1)}
            </p>
        </div>
    );
};
export default FindMagicItems;
