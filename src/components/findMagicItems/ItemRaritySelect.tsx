import React, { ChangeEvent, Dispatch, SetStateAction } from "react";

import { ItemRarity } from "../../staticData/types";

interface ItemRaritySelectProps {
    setItemRarity: Dispatch<SetStateAction<ItemRarity>>;
}

/**
 * A dropdown select input for choosing the rarity of a magic item.
 * @param setItemRarity A function to update the item rarity
 */
const ItemRaritySelect = ({ setItemRarity }: ItemRaritySelectProps) => {
    const handleItemRarityChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setItemRarity(event.target.value as ItemRarity);
    };
    return (
        <section className="row-wrap-center-center sm-margin-vertical sm-entry-box sm-screen-margin-right">
            <label htmlFor="item-rarity">Item Rarity:</label>
            <select
                id="item-rarity"
                className="select-box"
                name="item-rarity"
                defaultValue={"Common"}
                onChange={handleItemRarityChange}
            >
                <option value="Common">Common</option>
                <option value="Uncommon">Uncommon</option>
                <option value="Rare">Rare</option>
                <option value="Very rare">Very Rare</option>
                <option value="Legendary">Legendary</option>
            </select>
        </section>
    );
};
export default ItemRaritySelect;
