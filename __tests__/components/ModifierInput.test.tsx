import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";

import ModifierInput from "../../src/components/ModifierInput";

describe("ModifierInput", () => {
    test("renders with the default value and enforces min/max", () => {
        const setGroupInputs = jest.fn();
        render(
            <ModifierInput
                groupRollType="Attacks"
                setGroupInputs={setGroupInputs}
            />
        );
        const input = screen.getByRole("spinbutton");
        expect(input).toHaveValue(3);
        expect(input).toHaveAttribute("min", "-5");
        expect(input).toHaveAttribute("max", "30");
    });

    test("should change the value when the number is changed", () => {
        const setGroupInputs = jest.fn();
        render(
            <ModifierInput
                groupRollType="Attacks"
                setGroupInputs={setGroupInputs}
            />
        );

        expect(screen.getByDisplayValue("3")).toBeInTheDocument();

        const input = screen.getByRole("spinbutton");
        fireEvent.change(input, { target: { value: "10" } });

        expect(screen.queryByDisplayValue("3")).not.toBeInTheDocument();
        expect(screen.getByDisplayValue("10")).toBeInTheDocument();
    });
});