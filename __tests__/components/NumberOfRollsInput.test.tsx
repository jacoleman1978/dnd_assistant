import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";

import CharacterLevelInput from "../../src/components/CharacterLevelInput";

describe("CharacterLevelSelect", () => {
    test("renders with the default value and enforces min/max", () => {
        render(<CharacterLevelInput setGroupInputs={jest.fn()} />);
        const input = screen.getByRole("spinbutton");
        expect(input).toHaveValue(5);
        expect(input).toHaveAttribute("min", "1");
        expect(input).toHaveAttribute("max", "20");
    });

    test("should change the value when the number is changed", () => {
        const setGroupInputs = jest.fn();
        render(<CharacterLevelInput setGroupInputs={setGroupInputs} />);

        expect(screen.getByDisplayValue("5")).toBeInTheDocument();

        const input = screen.getByRole("spinbutton");
        fireEvent.change(input, { target: { value: "10" } });

        expect(screen.queryByDisplayValue("5")).not.toBeInTheDocument();
        expect(screen.getByDisplayValue("10")).toBeInTheDocument();
    });
});