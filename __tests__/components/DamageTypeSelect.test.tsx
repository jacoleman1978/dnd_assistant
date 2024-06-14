import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";

import DamageTypeSelect from "../../src/components/DamageTypeSelect";

describe("DamageTypeSelect", () => {
    test("renders the correct options", () => {
        render(<DamageTypeSelect setGroupInputs={jest.fn()} />);
        const select = screen.getByRole("combobox");
        const options = within(select).getAllByRole("option");
        expect(options).toHaveLength(4);
        expect(options[0]).toHaveTextContent("Slashing");
        expect(options[1]).toHaveTextContent("Bludgeoning");
        expect(options[2]).toHaveTextContent("Piercing");
        expect(options[3]).toHaveTextContent("Magic");
    });

    test("should change the option when different option is selected", () => {
        const setGroupInputs = jest.fn();
        render(<DamageTypeSelect setGroupInputs={setGroupInputs} />);

        expect(screen.getByDisplayValue("Slashing")).toBeInTheDocument();
        expect(
            screen.queryByDisplayValue("Bludgeoning")
        ).not.toBeInTheDocument();
        expect(screen.queryByDisplayValue("Piercing")).not.toBeInTheDocument();
        expect(screen.queryByDisplayValue("Magic")).not.toBeInTheDocument();

        const select = screen.getByRole("combobox");
        fireEvent.change(select, { target: { value: "Bludgeoning" } });

        expect(screen.queryByDisplayValue("Slashing")).not.toBeInTheDocument();
        expect(screen.getByDisplayValue("Bludgeoning")).toBeInTheDocument();
        expect(screen.queryByDisplayValue("Piercing")).not.toBeInTheDocument();
        expect(screen.queryByDisplayValue("Magic")).not.toBeInTheDocument();

        fireEvent.change(select, { target: { value: "Piercing" } });
        expect(screen.queryByDisplayValue("Slashing")).not.toBeInTheDocument();
        expect(
            screen.queryByDisplayValue("Bludgeoning")
        ).not.toBeInTheDocument();
        expect(screen.getByDisplayValue("Piercing")).toBeInTheDocument();
        expect(screen.queryByDisplayValue("Magic")).not.toBeInTheDocument();

        fireEvent.change(select, { target: { value: "Magic" } });
        expect(screen.queryByDisplayValue("Slashing")).not.toBeInTheDocument();
        expect(
            screen.queryByDisplayValue("Bludgeoning")
        ).not.toBeInTheDocument();
        expect(screen.queryByDisplayValue("Piercing")).not.toBeInTheDocument();
        expect(screen.getByDisplayValue("Magic")).toBeInTheDocument();
    });
});
