import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";

import ItemRaritySelect from "../../src/components/findMagicItems/ItemRaritySelect";

describe("ItemRaritySelect", () => {
    it("renders a select box with options", () => {
        render(<ItemRaritySelect setItemRarity={jest.fn()} />);

        const itemRaritySelect = screen.getByLabelText("Item Rarity:");
        expect(itemRaritySelect).toBeInTheDocument();

        const itemRarityOptions =
            within(itemRaritySelect).getAllByRole("option");
        expect(itemRarityOptions).toHaveLength(5);
        expect(itemRarityOptions[0]).toHaveTextContent("Common");
        expect(itemRarityOptions[1]).toHaveTextContent("Uncommon");
        expect(itemRarityOptions[2]).toHaveTextContent("Rare");
        expect(itemRarityOptions[3]).toHaveTextContent("Very Rare");
        expect(itemRarityOptions[4]).toHaveTextContent("Legendary");
    });

    it("calls the setItemRarity function when an option is selected", () => {
        const setItemRarity = jest.fn();
        render(<ItemRaritySelect setItemRarity={setItemRarity} />);

        const itemRaritySelect = screen.getByLabelText("Item Rarity:");
        fireEvent.change(itemRaritySelect, { target: { value: "Rare" } });

        expect(setItemRarity).toHaveBeenCalledTimes(1);
        expect(setItemRarity).toHaveBeenCalledWith("Rare");
    });
});
