import React from "react";

import { render, screen, fireEvent } from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";

import RollStatSet from "../../src/components/rollStatSet/RollStatSet";

describe("RollStatSet", () => {
    test("should have header and all input labels present", () => {
        render(<RollStatSet />);

        const header = screen.getByText("Roll Character Stat Set");
        const minStatAllowedLabel = screen.getAllByText("Min Stat Allowed:")[0];
        const minStatSumLabel = screen.getAllByText("Min Stat Sum:")[0];
        const atLeastOneStatLabel = screen.getAllByText("At Least One Stat Is:")[0];
        const buttonLabel = screen.getByText("Roll Stat Set");

        expect(header).toBeInTheDocument();
        expect(minStatAllowedLabel).toBeInTheDocument();
        expect(minStatSumLabel).toBeInTheDocument();
        expect(atLeastOneStatLabel).toBeInTheDocument();
        expect(buttonLabel).toBeInTheDocument();
    });

    test("should be able to change the min stat allowed value", () => {
        render(<RollStatSet />);

        const input = screen.getByRole("spinbutton", { name: /min stat allowed/i });
        expect(input).toHaveAttribute("min", "3");
        expect(input).toHaveAttribute("max", "10");
        expect(input).toHaveValue(3);

        fireEvent.change(input, { target: { value: 4 } });

        expect(input).toHaveValue(4);
    });

    test("should be able to change the min stat sum value", () => {
        render(<RollStatSet />);

        const input = screen.getByRole("spinbutton", { name: /min stat sum/i });
        expect(input).toHaveAttribute("min", "18");
        expect(input).toHaveAttribute("max", "85");
        expect(input).toHaveValue(18);

        fireEvent.change(input, { target: { value: 20 } });

        expect(input).toHaveValue(20);
    });

    test("should be able to change the at least one stat is value", () => {
        render(<RollStatSet />);

        const input = screen.getByRole("spinbutton", { name: /at least one stat is/i });
        expect(input).toHaveAttribute("min", "3");
        expect(input).toHaveAttribute("max", "18");
        expect(input).toHaveValue(3);

        fireEvent.change(input, { target: { value: 4 } });

        expect(input).toHaveValue(4);
    });

    test("should display the stat set after clicking the button", () => {
        render(<RollStatSet />);

        const button = screen.getByRole("button", { name: /roll stat set/i });

        const pElement = screen.getAllByRole("paragraph")[0];
        expect(pElement).toHaveTextContent("");

        fireEvent.click(button);

        expect(pElement.textContent).toMatch(/\d+, \d+, \d+, \d+, \d+, \d+/);
    });

    test("should have stat set that meets the requirements", () => {
        render(<RollStatSet />);

        const minStatAllowed = screen.getByRole("spinbutton", { name: /min stat allowed/i });
        fireEvent.change(minStatAllowed, { target: { value: 10 } });

        const minStatSum = screen.getByRole("spinbutton", { name: /min stat sum/i });
        fireEvent.change(minStatSum, { target: { value: 85} });

        const atLeastOneStat = screen.getByRole("spinbutton", { name: /at least one stat is/i });
        fireEvent.change(atLeastOneStat, { target: { value: 18 } });

        const button = screen.getByRole("button", { name: /roll stat set/i });

        const pElement = screen.getAllByRole("paragraph")[0];
        expect(pElement).toHaveTextContent("");

        fireEvent.click(button);

        const statSet = pElement.textContent ? pElement.textContent.split(", ") : [];
        const statSetNumbers = statSet.map((stat) => parseInt(stat));

        statSetNumbers.forEach((stat) => {
            expect(stat).toBeGreaterThanOrEqual(10);
        });

        const sum = statSetNumbers.reduce((acc, curr) => acc + curr, 0);
        expect(sum).toBeGreaterThanOrEqual(85);

        const hasAtLeastOneStat = statSetNumbers.some((stat) => stat >= 18);
        expect(hasAtLeastOneStat).toBe(true);
    });
});