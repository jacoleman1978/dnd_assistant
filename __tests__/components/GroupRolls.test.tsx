import React from "react";

import { render, screen, fireEvent } from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";

import GroupRolls from "../../src/components/groupRolls/GroupRolls";

describe("GroupRolls", () => {
    test("should have header and all input labels present when Roll Type is 'Attacks'", () => {
        render(<GroupRolls />);

        const header = screen.getByRole("heading", { name: "Group Rolls" });
        const rollTypeLabel = screen.getByText("Roll Type:");
        const numRollsLabel = screen.getByText("Number of Rolls:");
        const targetACLabel = screen.getByText("Target AC:");
        const targetDCLabel = screen.queryByText("Target DC:");
        const modifierLabel = screen.getByText("To Hit Modifier:");
        const savesModifierLabel = screen.queryByText("Save Modifier:");
        const advantageLabel = screen.getByText("Advantage Type:");
        const charLevelLabel = screen.getByText("Character Level:");
        const damageTypeLabel = screen.getByText("Damage Type:");
        let spellLevelLabel = screen.queryByText("Spell Level:");
        const buttonLabel = screen.getByRole("button", { name: "Group Rolls" });

        expect(header).toBeInTheDocument();
        expect(rollTypeLabel).toBeInTheDocument();
        expect(numRollsLabel).toBeInTheDocument();
        expect(targetACLabel).toBeInTheDocument();
        expect(targetDCLabel).not.toBeInTheDocument();
        expect(modifierLabel).toBeInTheDocument();
        expect(savesModifierLabel).not.toBeInTheDocument();
        expect(advantageLabel).toBeInTheDocument();
        expect(charLevelLabel).toBeInTheDocument();
        expect(damageTypeLabel).toBeInTheDocument();
        expect(spellLevelLabel).not.toBeInTheDocument();
        expect(buttonLabel).toBeInTheDocument();

        const damageTypeSelect = screen.getByRole("combobox", { name: "Damage Type:" });
        fireEvent.change(damageTypeSelect, { target: { value: "Magic" } });

        spellLevelLabel = screen.getByText("Spell Level:");
        expect(spellLevelLabel).toBeInTheDocument();
    });

    test("should have header and all input labels present when Roll Type is 'Saves'", () => {
        render(<GroupRolls />);

        const header = screen.getByRole("heading", { name: "Group Rolls" });
        const rollTypeLabel = screen.getByText("Roll Type:");

        const savesRadio = screen.getByLabelText("Saves");
        fireEvent.click(savesRadio);

        const numRollsLabel = screen.getByText("Number of Rolls:");
        const targetACLabel = screen.queryByText("Target AC:");
        const targetDCLabel = screen.getByText("Target DC:");
        const modifierLabel = screen.queryByText("To Hit Modifier:");
        const savesModifierLabel = screen.getByText("Save Modifier:");
        const advantageLabel = screen.queryByText("Advantage Type:");
        const charLevelLabel = screen.queryByText("Character Level:");
        const damageTypeLabel = screen.queryByText("Damage Type:");
        const spellLevelLabel = screen.queryByText("Spell Level:");
        const buttonLabel = screen.getByRole("button", { name: "Group Rolls" });

        expect(header).toBeInTheDocument();
        expect(rollTypeLabel).toBeInTheDocument();
        expect(numRollsLabel).toBeInTheDocument();
        expect(targetACLabel).not.toBeInTheDocument();
        expect(targetDCLabel).toBeInTheDocument();
        expect(modifierLabel).not.toBeInTheDocument();
        expect(savesModifierLabel).toBeInTheDocument();
        expect(advantageLabel).toBeInTheDocument();
        expect(charLevelLabel).not.toBeInTheDocument();
        expect(damageTypeLabel).not.toBeInTheDocument();
        expect(spellLevelLabel).not.toBeInTheDocument();
        expect(buttonLabel).toBeInTheDocument();
    });

    test("should be able to change the number of rolls", () => {
        render(<GroupRolls />);

        const input = screen.getByRole("spinbutton", { name: "Number of Rolls:" });
        expect(input).toHaveAttribute("min", "1");
        expect(input).toHaveAttribute("max", "50");
        expect(input).toHaveValue(5);

        fireEvent.change(input, { target: { value: 4 } });

        expect(input).toHaveValue(4);
    });

    test("should be able to change the target AC", () => {
        render(<GroupRolls />);

        const input = screen.getByRole("spinbutton", { name: "Target AC:" });
        expect(input).toHaveAttribute("min", "1");
        expect(input).toHaveAttribute("max", "35");
        expect(input).toHaveValue(15);

        fireEvent.change(input, { target: { value: 23 } });

        expect(input).toHaveValue(23);
    });

    test("should be able to change the target DC", () => {
        render(<GroupRolls />);

        const savesRadio = screen.getByLabelText("Saves");
        fireEvent.click(savesRadio);

        const input = screen.getByRole("spinbutton", { name: "Target DC:" });
        expect(input).toHaveAttribute("min", "1");
        expect(input).toHaveAttribute("max", "35");
        expect(input).toHaveValue(15);

        fireEvent.change(input, { target: { value: 17 } });

        expect(input).toHaveValue(17);
    });

    test("should be able to change the to hit modifier", () => {
        render(<GroupRolls />);

        const input = screen.getByRole("spinbutton", { name: "To Hit Modifier:" });
        expect(input).toHaveAttribute("min", "-5");
        expect(input).toHaveAttribute("max", "30");
        expect(input).toHaveValue(3);

        fireEvent.change(input, { target: { value: 5 } });

        expect(input).toHaveValue(5);
    });

    test("should be able to change the save modifier", () => {
        render(<GroupRolls />);

        const savesRadio = screen.getByLabelText("Saves");
        fireEvent.click(savesRadio);

        const input = screen.getByRole("spinbutton", { name: "Save Modifier:" });
        expect(input).toHaveAttribute("min", "-5");
        expect(input).toHaveAttribute("max", "30");
        expect(input).toHaveValue(3);

        fireEvent.change(input, { target: { value: 5 } });

        expect(input).toHaveValue(5);
    });

    test("should be able to change the advantage type", () => {
        render(<GroupRolls />);

        const input = screen.getByRole("combobox", { name: "Advantage Type:" });
        expect(input).toHaveValue("Normal");

        fireEvent.change(input, { target: { value: "Advantage" } });
        expect(input).toHaveValue("Advantage");

        fireEvent.change(input, { target: { value: "Disadvantage" } });
        expect(input).toHaveValue("Disadvantage");
    });

    test("should be able to change the character level for Attacks", () => {
        render(<GroupRolls />);

        const input = screen.getByRole("spinbutton", { name: "Character Level:" });
        expect(input).toHaveAttribute("min", "1");
        expect(input).toHaveAttribute("max", "20");
        expect(input).toHaveValue(5);

        fireEvent.change(input, { target: { value: 10 } });

        expect(input).toHaveValue(10);
    });

    test("should be able to change the damage type for Attacks", () => {
        render(<GroupRolls />);

        const damageTypeSelect = screen.getByRole("combobox", { name: "Damage Type:" });
        expect(damageTypeSelect).toHaveValue("Slashing");

        fireEvent.change(damageTypeSelect, { target: { value: "Piercing" } });
        expect(damageTypeSelect).toHaveValue("Piercing");

        fireEvent.change(damageTypeSelect, { target: { value: "Bludgeoning" } });
        expect(damageTypeSelect).toHaveValue("Bludgeoning");

        fireEvent.change(damageTypeSelect, { target: { value: "Magic" } });
        expect(damageTypeSelect).toHaveValue("Magic");
    });

    test("should be able to change the spell level for Attacks when damage type is Magic", () => {
        render(<GroupRolls />);

        const damageTypeSelect = screen.getByRole("combobox", { name: "Damage Type:" });
        fireEvent.change(damageTypeSelect, { target: { value: "Magic" } });

        const input = screen.getByRole("spinbutton", { name: "Spell Level:" });
        expect(input).toHaveAttribute("min", "0");
        expect(input).toHaveAttribute("max", "9");
        expect(input).toHaveValue(0);

        fireEvent.change(input, { target: { value: 5 } });

        expect(input).toHaveValue(5);
    });

    test("should display the results after clicking the button for Attacks", () => {
        render(<GroupRolls />);

        const numberInput = screen.getByRole("spinbutton", { name: "Number of Rolls:" });
        fireEvent.change(numberInput, { target: { value: 50 } });
        const button = screen.getByRole("button", { name: "Group Rolls" });

        fireEvent.click(button);
        const whoHit = screen.getByText(/who hit:/i);
        const whoMissed = screen.getByText(/who missed:/i);

        expect(whoHit).toBeInTheDocument();
        expect(whoMissed).toBeInTheDocument();

        const numOfWhoHit = whoHit.textContent ? whoHit.textContent.split(", ").length : 0;
        const numOfWhoMissed = whoMissed.textContent ? whoMissed.textContent.split(", ").length : 0;

        expect(numOfWhoHit + numOfWhoMissed).toBe(50);
    });

    test("should display the results after clicking the button for Saves", () => {
        render(<GroupRolls />);

        const savesRadio = screen.getByLabelText("Saves");
        fireEvent.click(savesRadio);

        const numberInput = screen.getByRole("spinbutton", { name: "Number of Rolls:" });
        fireEvent.change(numberInput, { target: { value: 50 } });
        const button = screen.getByRole("button", { name: "Group Rolls" });

        fireEvent.click(button);
        const whoSucceeded = screen.getByText(/who passed:/i);
        const whoFailed = screen.getByText(/who failed:/i);

        expect(whoSucceeded).toBeInTheDocument();
        expect(whoFailed).toBeInTheDocument();

        const numOfWhoSucceeded = whoSucceeded.textContent ? whoSucceeded.textContent.split(", ").length : 0;
        const numOfWhoFailed = whoFailed.textContent ? whoFailed.textContent.split(", ").length : 0;

        expect(numOfWhoSucceeded + numOfWhoFailed).toBe(50);
    });
});