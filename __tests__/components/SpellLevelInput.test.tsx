import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";

import SpellLevelInput from "../../src/components/criticalRolls/SpellLevelInput";

describe("SpellLevelSelect", () => {
    test("renders a label and input field", () => {
        render(<SpellLevelInput setGroupInputs={() => {}} />);
        const label = screen.getByText(/spell level/i);
        const input = screen.getByRole("spinbutton");

        expect(label).toBeInTheDocument();
        expect(input).toBeInTheDocument();
    });

    test("should have a defaultValue of 0", () => {
        render(<SpellLevelInput setGroupInputs={() => {}} />);
        const input = screen.getByRole("spinbutton");

        expect(input).toHaveValue(0);
    });

    test("should have a min of 0 and a max of 9", () => {
        render(<SpellLevelInput setGroupInputs={() => {}} />);
        const input = screen.getByRole("spinbutton");

        expect(input).toHaveAttribute("min", "0");
        expect(input).toHaveAttribute("max", "9");
    });

    test("calls setGroupInputs when the input field changes", () => {
        const setGroupInputs = jest.fn();
        render(<SpellLevelInput setGroupInputs={setGroupInputs} />);
        const input = screen.getByRole("spinbutton");

        fireEvent.change(input, { target: { value: 1 } });

        expect(setGroupInputs).toHaveBeenCalledTimes(1);
    });
});
