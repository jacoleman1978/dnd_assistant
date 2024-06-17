import React from "react";

import { render, screen, fireEvent } from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";

import CritHitsAndMisses from "../../src/components/criticalRolls/CritHitsAndMisses";

describe("CritHitsAndMisses", () => {
    test("renders the heading text", () => {
        render(<CritHitsAndMisses />);

        const heading = screen.getByText("Critical Hits and Misses");

        expect(heading).toBeInTheDocument();
    });

    test("renders the crit type radio buttons", () => {
        render(<CritHitsAndMisses />);

        const hitRadio = screen.getByLabelText("Hit");
        const missRadio = screen.getByLabelText("Miss");

        expect(hitRadio).toBeInTheDocument();
        expect(missRadio).toBeInTheDocument();
    });

    test("should change the value when a radio button is clicked", () => {
        render(<CritHitsAndMisses />);

        const missRadio = screen.getByLabelText("Miss");
        const hitRadio = screen.getByLabelText("Hit");

        expect(hitRadio).toBeChecked();
        expect(missRadio).not.toBeChecked();

        fireEvent.click(missRadio);

        expect(hitRadio).not.toBeChecked();
        expect(missRadio).toBeChecked();
    });

    test("renders the character level input", () => {
        render(<CritHitsAndMisses />);

        const label = screen.getByText("Character Level:");
        const input = screen.getByRole("spinbutton");

        expect(label).toBeInTheDocument();
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute("min", "1");
        expect(input).toHaveAttribute("max", "20");
        expect(input).toHaveValue(5);
    });

    test("should change the value when the number is changed", () => {
        render(<CritHitsAndMisses />);

        const input = screen.getByRole("spinbutton");

        expect(screen.getByDisplayValue("5")).toBeInTheDocument();

        fireEvent.change(input, { target: { value: "15" } });

        expect(screen.queryByDisplayValue("5")).not.toBeInTheDocument();
        expect(screen.getByDisplayValue("15")).toBeInTheDocument();
    });

    test("renders the damage type select", () => {
        render(<CritHitsAndMisses />);

        const label = screen.getByText("Damage Type:");
        const select = screen.getByRole("combobox");

        expect(label).toBeInTheDocument();
        expect(select).toBeInTheDocument();
        expect(select).toHaveValue("Slashing");
    });

    test("should change the value when different option is selected", () => {
        render(<CritHitsAndMisses />);

        const select = screen.getByRole("combobox");

        expect(screen.getByDisplayValue("Slashing")).toBeInTheDocument();
        expect(
            screen.queryByDisplayValue("Bludgeoning")
        ).not.toBeInTheDocument();
        expect(screen.queryByDisplayValue("Piercing")).not.toBeInTheDocument();
        expect(screen.queryByDisplayValue("Magic")).not.toBeInTheDocument();

        fireEvent.change(select, { target: { value: "Bludgeoning" } });

        expect(screen.queryByDisplayValue("Slashing")).not.toBeInTheDocument();
        expect(screen.getByDisplayValue("Bludgeoning")).toBeInTheDocument();
        expect(screen.queryByDisplayValue("Piercing")).not.toBeInTheDocument();
        expect(screen.queryByDisplayValue("Magic")).not.toBeInTheDocument();

        fireEvent.change(select, { target: { value: "Piercing" } });
        expect(screen.queryByDisplayValue("Slashing")).not.toBeInTheDocument();
        expect(
            screen.queryByDisplayValue("Bludgeoning")
        ).not.toBeInTheDocument();
        expect(screen.getByDisplayValue("Piercing")).toBeInTheDocument();
        expect(screen.queryByDisplayValue("Magic")).not.toBeInTheDocument();

        fireEvent.change(select, { target: { value: "Magic" } });
        expect(screen.queryByDisplayValue("Slashing")).not.toBeInTheDocument();
        expect(
            screen.queryByDisplayValue("Bludgeoning")
        ).not.toBeInTheDocument();
        expect(screen.queryByDisplayValue("Piercing")).not.toBeInTheDocument();
        expect(screen.getByDisplayValue("Magic")).toBeInTheDocument();
    });

    test("renders the spell level input when the damage type is 'Magic'", () => {
        render(<CritHitsAndMisses />);

        const select = screen.getByRole("combobox");

        fireEvent.change(select, { target: { value: "Magic" } });

        const label = screen.getByText("Spell Level:");
        const input = screen.getAllByRole("spinbutton");

        expect(label).toBeInTheDocument();
        expect(input).toHaveLength(2);
        expect(input[1]).toHaveAttribute("min", "0");
        expect(input[1]).toHaveAttribute("max", "9");
        expect(input[1]).toHaveValue(0);
    });

    test("should change the value when the number is changed", () => {
        render(<CritHitsAndMisses />);

        const select = screen.getByRole("combobox");

        fireEvent.change(select, { target: { value: "Magic" } });

        const input = screen.getAllByRole("spinbutton")[1];

        expect(screen.getByDisplayValue("0")).toBeInTheDocument();

        fireEvent.change(input, { target: { value: "5" } });

        expect(screen.queryByDisplayValue("0")).not.toBeInTheDocument();
        expect(screen.getAllByDisplayValue("5")[1]).toBeInTheDocument();
    });

    test("renders the roll button", () => {
        render(<CritHitsAndMisses />);

        const button = screen.getByRole("button");

        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent("Roll Critical");
    });

    test("Text is displayed when the roll button is clicked", () => {
        render(<CritHitsAndMisses />);

        const button = screen.getByRole("button");

        fireEvent.click(button);

        const messageContainer = screen.getByTestId("crit-message-single");
        const pElement = messageContainer.querySelector("p");

        expect(pElement?.textContent).toMatch(
            /(A \d+% is (just a normal critical hit\. Better luck next time!|a critical hit!)|(You rolled \d+%\. You are safe from further self-inflicted mishaps\.\.\.for now\.\.\.\.)|(Uh oh\.\.\. you rolled \d+%. It is a critical miss!))/
        );
    });
});
