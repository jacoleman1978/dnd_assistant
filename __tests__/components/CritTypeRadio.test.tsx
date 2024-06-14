import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";

import CritTypeRadio from "../../src/components/criticalRolls/CritTypeRadio";

describe("CritTypeRadio", () => {
    test("renders with the default value", () => {
        const setCritType = jest.fn();
        render(<CritTypeRadio setCritType={setCritType} />);
        const hitRadio = screen.getByLabelText("Hit");
        const missRadio = screen.getByLabelText("Miss");
        expect(hitRadio).toBeChecked();
        expect(missRadio).not.toBeChecked();
    });

    test("should change the value when a radio button is clicked", () => {
        const setCritType = jest.fn();
        render(<CritTypeRadio setCritType={setCritType} />);

        const missRadio = screen.getByLabelText("Miss");
        fireEvent.click(missRadio);

        expect(setCritType).toHaveBeenCalledWith("Miss");
    });
});
