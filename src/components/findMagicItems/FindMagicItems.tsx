import { useState, useEffect } from "react";

import ItemRaritySelect from "./ItemRaritySelect";
import FindPercentModifierInput from "./FindPercentModifierInput";
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

    useEffect(() => {
        setFindResult("");
    }, [findModifier]);

    const handleFindItemClick = () => {
        setFindResult(
            findItemByRarity(
                itemRarity,
                findModifier - defaultRarityMap[itemRarity]
            )
        );
    };

    return (
        <section>
            <section className="card">
                <h1>Find Magic Items</h1>

                <ItemRaritySelect setItemRarity={setItemRarity} />

                <FindPercentModifierInput
                    findModifier={findModifier}
                    setFindModifier={setFindModifier}
                />

                <Button
                    label="Find Item"
                    className="submit-button"
                    handleClick={handleFindItemClick}
                />

                <p className="message-align-left-top-margin">
                    {findResult.slice(0, findResult.indexOf("."))}
                </p>
                <p className="message-align-left-top-margin">
                    {findResult.slice(findResult.indexOf(".") + 1)}
                </p>
            </section>
            <section className="card">
                <section>
                    <p className="source sm-margin-bottom">
                        The equations used are from page 126 of{" "}
                        <em>Xanathar's Guide to Everything</em>, using item
                        rarity to determine the cost of a magic item. Consumable
                        items have half the cost of those shown.
                    </p>
                    <p className="source med-margin-top">Equations used:</p>
                    <ul className="column-align-start sm-margin-left">
                        <li className="source">Common: </li>
                        <ul>
                            <li className="subbullet">Cost = 10 * (1d6 + 1)</li>
                            <li className="subbullet">
                                Price Range: 20 to 70 gp
                            </li>
                        </ul>
                        <li className="source">Uncommon:</li>
                        <ul>
                            <li className="subbullet">Cost = 100 * (1d6)</li>
                            <li className="subbullet">
                                Price Range: 100 to 600 gp
                            </li>
                        </ul>
                        <li className="source">Rare:</li>
                        <ul>
                            <li className="subbullet">Cost = 1,000 * (2d10)</li>
                            <li className="subbullet">
                                Price Range: 2,000 to 20,000 gp
                            </li>
                        </ul>
                        <li className="source">Very Rare:</li>
                        <ul>
                            <li className="subbullet">
                                Cost = 10,000 * (1d4 + 1)
                            </li>
                            <li className="subbullet">
                                Price Range: 20,000 to 50,000 gp
                            </li>
                        </ul>
                        <li className="source">Legendary:</li>
                        <ul>
                            <li className="subbullet">Cost = 25,000 * (2d6)</li>
                            <li className="subbullet">
                                Price Range: 50,000 to 300,000 gp
                            </li>
                        </ul>
                    </ul>
                </section>

                <section className="sm-margin-top">
                    <p className="source">
                        Default percentages to find magic items of each rarity:
                    </p>
                    <ul className="column-align-start sm-margin-left">
                        <li className="source">Common: 50%</li>
                        <li className="source">Uncommon: 30%</li>
                        <li className="source">Rare: 15%</li>
                        <li className="source">Very rare: 10%</li>
                        <li className="source">Legendary: 1%</li>
                    </ul>
                </section>
            </section>
        </section>
    );
};
export default FindMagicItems;
