import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";

import MinStatAllowedInput from "../../src/components/rollStatSet/MinStatAllowedInput";

describe("MinStatAllowedInput", () => {
    test("renders with the default value and enforces min/max", () => {
        render(<MinStatAllowedInput setMinStatAllowed={jest.fn()} />);
        const input = screen.getByRole("spinbutton");
        expect(input).toHaveValue(3);
        expect(input).toHaveAttribute("min", "3");
        expect(input).toHaveAttribute("max", "10");
    });

    test("should change the value when the number is changed", () => {
        const setMinStatAllowed = jest.fn();
        render(<MinStatAllowedInput setMinStatAllowed={setMinStatAllowed} />);

        expect(screen.getByDisplayValue("3")).toBeInTheDocument();

        const input = screen.getByRole("spinbutton");
        fireEvent.change(input, { target: { value: "5" } });

        expect(screen.queryByDisplayValue("3")).not.toBeInTheDocument();
        expect(screen.getByDisplayValue("5")).toBeInTheDocument();
    });
});
