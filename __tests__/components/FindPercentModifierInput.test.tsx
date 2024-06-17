import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";

import FindPercentModifierInput from "../../src/components/findMagicItems/FindPercentModifierInput";

describe("FindPercentModifierInput", () => {
    test("renders a number input for setting the find modifier percentage", () => {
        render(
            <FindPercentModifierInput
                findModifier={50}
                setFindModifier={() => {}}
            />
        );

        const label = screen.getByText("Find Modifier:");
        const input = screen.getByRole("spinbutton");

        expect(label).toBeInTheDocument();
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute("min", "1");
        expect(input).toHaveAttribute("max", "99");
        expect(input).toHaveValue(50);
    });

    test("calls setFindModifier when the input value changes", () => {
        const setFindModifier = jest.fn();

        render(
            <FindPercentModifierInput
                findModifier={50}
                setFindModifier={setFindModifier}
            />
        );

        const input = screen.getByRole("spinbutton");

        fireEvent.change(input, { target: { value: "75" } });

        expect(setFindModifier).toHaveBeenCalledTimes(1);
        expect(setFindModifier).toHaveBeenCalledWith(75);
    });
});
