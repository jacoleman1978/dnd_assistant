import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import FindMagicItems from "../../src/components/findMagicItems/FindMagicItems";

describe("FindMagicItems", () => {
    it("renders without error", () => {
        render(<FindMagicItems />);
    });

    test("should update item rarity and find modifier on select change", () => {
        render(<FindMagicItems />);
        expect(screen.getByText("Find Magic Items")).toBeInTheDocument();
        expect(screen.getByText("Item Rarity:")).toBeInTheDocument();
        expect(screen.getByText("Find Modifier:")).toBeInTheDocument();

        const raritySelect = screen.getByRole("combobox", {
            name: "Item Rarity:",
        });
        const modifierInput = screen.getByRole("spinbutton", {
            name: "Find Modifier:",
        });

        expect(raritySelect).toHaveValue("Common");
        expect(modifierInput).toHaveValue(50);

        fireEvent.change(raritySelect, { target: { value: "Uncommon" } });
        expect(raritySelect).toHaveValue("Uncommon");
        expect(modifierInput).toHaveValue(30);

        fireEvent.change(raritySelect, { target: { value: "Rare" } });
        expect(raritySelect).toHaveValue("Rare");
        expect(modifierInput).toHaveValue(15);

        fireEvent.change(raritySelect, { target: { value: "Very rare" } });
        expect(raritySelect).toHaveValue("Very rare");
        expect(modifierInput).toHaveValue(10);

        fireEvent.change(raritySelect, { target: { value: "Legendary" } });
        expect(raritySelect).toHaveValue("Legendary");
        expect(modifierInput).toHaveValue(1);
    });

    test("should be able to change find modifier manually", () => {
        render(<FindMagicItems />);

        const modifierInput = screen.getByRole("spinbutton", {
            name: "Find Modifier:",
        });

        expect(modifierInput).toHaveValue(50);

        fireEvent.change(modifierInput, { target: { value: 25 } });
        expect(modifierInput).toHaveValue(25);
    });

    test("should display whether the item was found or not after clicking the button", () => {
        render(<FindMagicItems />);

        const button = screen.getByRole("button", { name: "Find Item" });
        
        const pElements = screen.getAllByRole("paragraph");
        expect(pElements[0]).toHaveTextContent("");
        expect(pElements[1]).toHaveTextContent("");

        fireEvent.click(button);

        expect(pElements[0].textContent).toMatch(/Common has a 50% find percentage and you rolled a \d+%/);
        expect(pElements[1].textContent).toMatch(/(The common magic item was found for \d+ gold!|No common magic item was found. Please check back another day.)/);
    });
});
