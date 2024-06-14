import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";

import AtLeastOneStatInput from "../../src/components/AtLeastOneStatInput";

describe("AtLeastOneStatInput", () => {
    test("renders with the default value and enforces min/max", () => {
        render(<AtLeastOneStatInput setAtLeastOneStatIs={jest.fn()} />);
        const input = screen.getByRole("spinbutton");
        expect(input).toHaveValue(3);
        expect(input).toHaveAttribute("min", "3");
        expect(input).toHaveAttribute("max", "18");
    });

    test("should change the value when the number is changed", () => {
        const setAtLeastOneStatIs = jest.fn();
        render(
            <AtLeastOneStatInput setAtLeastOneStatIs={setAtLeastOneStatIs} />
        );

        expect(screen.getByDisplayValue("3")).toBeInTheDocument();

        const input = screen.getByRole("spinbutton");
        fireEvent.change(input, { target: { value: "5" } });

        expect(screen.queryByDisplayValue("3")).not.toBeInTheDocument();
        expect(screen.getByDisplayValue("5")).toBeInTheDocument();
    });
});
