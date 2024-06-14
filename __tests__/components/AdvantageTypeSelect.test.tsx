import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";

import AdvantageTypeSelect from "../../src/components/AdvantageTypeSelect";

describe("AdvantageTypeSelect", () => {
    test("renders the correct options", () => {
        render(<AdvantageTypeSelect setGroupInputs={jest.fn()} />);
        const select = screen.getByRole("combobox");
        const options = within(select).getAllByRole("option");
        expect(options).toHaveLength(3);
        expect(options[0]).toHaveTextContent("Normal");
        expect(options[1]).toHaveTextContent("Advantage");
        expect(options[2]).toHaveTextContent("Disadvantage");
    });

    test("should change the option when different option is selected", () => {
        const setGroupInputs = jest.fn();
        render(<AdvantageTypeSelect setGroupInputs={setGroupInputs} />);

        expect(screen.getByDisplayValue("Normal")).toBeInTheDocument();
        expect(screen.queryByDisplayValue("Advantage")).not.toBeInTheDocument();
        expect(
            screen.queryByDisplayValue("Disadvantage")
        ).not.toBeInTheDocument();

        const select = screen.getByRole("combobox");
        fireEvent.change(select, { target: { value: "Advantage" } });

        expect(screen.queryByDisplayValue("Normal")).not.toBeInTheDocument();
        expect(screen.getByDisplayValue("Advantage")).toBeInTheDocument();
        expect(
            screen.queryByDisplayValue("Disadvantage")
        ).not.toBeInTheDocument();

        fireEvent.change(select, { target: { value: "Disadvantage" } });
        expect(screen.queryByDisplayValue("Normal")).not.toBeInTheDocument();
        expect(screen.queryByDisplayValue("Advantage")).not.toBeInTheDocument();
        expect(screen.getByDisplayValue("Disadvantage")).toBeInTheDocument();
    });
});
