import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";

import GroupRollTypeRadio from "../../src/components/GroupRollTypeRadio";

describe("GroupRollTypeRadio", () => {
    test("renders with the default value", () => {
        const setGroupRollType = jest.fn();
        render(<GroupRollTypeRadio setGroupRollType={setGroupRollType} />);
        const attacksRadio = screen.getByLabelText("Attacks");
        const savesRadio = screen.getByLabelText("Saves");
        expect(attacksRadio).toBeChecked();
        expect(savesRadio).not.toBeChecked();
    });

    test("should change the value when a radio button is clicked", () => {
        const setGroupRollType = jest.fn();
        render(<GroupRollTypeRadio setGroupRollType={setGroupRollType} />);

        const savesRadio = screen.getByLabelText("Saves");
        fireEvent.click(savesRadio);

        expect(setGroupRollType).toHaveBeenCalledWith("Saves");
    });
});
