import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";

import TargetDCInput from "../../src/components/groupRolls/TargetDCInput";

describe("TargetDCInput", () => {
    test("renders with the default value and enforces min/max", () => {
        render(
            <TargetDCInput groupRollType="Attacks" setGroupInputs={jest.fn()} />
        );
        const input = screen.getByRole("spinbutton");
        expect(input).toHaveValue(15);
        expect(input).toHaveAttribute("min", "1");
        expect(input).toHaveAttribute("max", "35");
    });

    test("should change the value when the number is changed", () => {
        const setGroupInputs = jest.fn();
        render(
            <TargetDCInput
                groupRollType="Attacks"
                setGroupInputs={setGroupInputs}
            />
        );

        expect(screen.getByDisplayValue("15")).toBeInTheDocument();

        const input = screen.getByRole("spinbutton");
        fireEvent.change(input, { target: { value: "10" } });

        expect(screen.queryByDisplayValue("15")).not.toBeInTheDocument();
        expect(screen.getByDisplayValue("10")).toBeInTheDocument();
    });
});
