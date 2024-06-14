import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";

import SpellLevelSelect from "../../src/components/SpellLevelSelect";

describe("SpellLevelSelect", () => {
    test("renders the correct options", () => {
        render(<SpellLevelSelect setGroupInputs={jest.fn()} />);
        const select = screen.getByRole("combobox");
        const options = within(select).getAllByRole("option");
        expect(options).toHaveLength(10);
        expect(options[0]).toHaveTextContent("0");
        expect(options[1]).toHaveTextContent("1");
        expect(options[2]).toHaveTextContent("2");
        expect(options[3]).toHaveTextContent("3");
        expect(options[4]).toHaveTextContent("4");
        expect(options[5]).toHaveTextContent("5");
        expect(options[6]).toHaveTextContent("6");
        expect(options[7]).toHaveTextContent("7");
        expect(options[8]).toHaveTextContent("8");
        expect(options[9]).toHaveTextContent("9");
    });

    test("should change the option when different option is selected", () => {
        const setGroupInputs = jest.fn();
        render(<SpellLevelSelect setGroupInputs={setGroupInputs} />);

        expect(screen.getByDisplayValue("5")).toBeInTheDocument();
        expect(screen.queryByDisplayValue("0")).not.toBeInTheDocument();
        expect(screen.queryByDisplayValue("1")).not.toBeInTheDocument();
        expect(screen.queryByDisplayValue("2")).not.toBeInTheDocument();
        expect(screen.queryByDisplayValue("3")).not.toBeInTheDocument();
        expect(screen.queryByDisplayValue("4")).not.toBeInTheDocument();
        expect(screen.queryByDisplayValue("6")).not.toBeInTheDocument();
        expect(screen.queryByDisplayValue("7")).not.toBeInTheDocument();
        expect(screen.queryByDisplayValue("8")).not.toBeInTheDocument();
        expect(screen.queryByDisplayValue("9")).not.toBeInTheDocument();

        const select = screen.getByRole("combobox");
        fireEvent.change(select, { target: { value: "0" } });

        expect(screen.queryByDisplayValue("5")).not.toBeInTheDocument();
        expect(screen.getByDisplayValue("0")).toBeInTheDocument();
        expect(screen.queryByDisplayValue("1")).not.toBeInTheDocument();
        expect(screen.queryByDisplayValue("2")).not.toBeInTheDocument();
        expect(screen.queryByDisplayValue("3")).not.toBeInTheDocument();
        expect(screen.queryByDisplayValue("4")).not.toBeInTheDocument();
        expect(screen.queryByDisplayValue("6")).not.toBeInTheDocument();
        expect(screen.queryByDisplayValue("7")).not.toBeInTheDocument();
        expect(screen.queryByDisplayValue("8")).not.toBeInTheDocument();
        expect(screen.queryByDisplayValue("9")).not.toBeInTheDocument();

        fireEvent.change(select, { target: { value: "1" } });
        expect(screen.queryByDisplayValue("5")).not.toBeInTheDocument();
        expect(screen.queryByDisplayValue("0")).not.toBeInTheDocument();
        expect(screen.getByDisplayValue("1")).toBeInTheDocument();
        expect(screen.queryByDisplayValue("2")).not.toBeInTheDocument();
        expect(screen.queryByDisplayValue("3")).not.toBeInTheDocument();
        expect(screen.queryByDisplayValue("4")).not.toBeInTheDocument();
        expect(screen.queryByDisplayValue("6")).not.toBeInTheDocument();
        expect(screen.queryByDisplayValue("7")).not.toBeInTheDocument();
        expect(screen.queryByDisplayValue("8")).not.toBeInTheDocument();
        expect(screen.queryByDisplayValue("9")).not.toBeInTheDocument();

        fireEvent.change(select, { target: { value: "2" } });
        expect(screen.queryByDisplayValue("1")).not.toBeInTheDocument();
        expect(screen.queryByDisplayValue("2")).toBeInTheDocument();

        fireEvent.change(select, { target: { value: "3" } });
        expect(screen.queryByDisplayValue("2")).not.toBeInTheDocument();
        expect(screen.queryByDisplayValue("3")).toBeInTheDocument();

        fireEvent.change(select, { target: { value: "4" } });
        expect(screen.queryByDisplayValue("3")).not.toBeInTheDocument();
        expect(screen.queryByDisplayValue("4")).toBeInTheDocument();

        fireEvent.change(select, { target: { value: "5" } });
        expect(screen.queryByDisplayValue("4")).not.toBeInTheDocument();
        expect(screen.queryByDisplayValue("5")).toBeInTheDocument();

        fireEvent.change(select, { target: { value: "6" } });
        expect(screen.queryByDisplayValue("5")).not.toBeInTheDocument();
        expect(screen.queryByDisplayValue("6")).toBeInTheDocument();

        fireEvent.change(select, { target: { value: "7" } });
        expect(screen.queryByDisplayValue("6")).not.toBeInTheDocument();
        expect(screen.queryByDisplayValue("7")).toBeInTheDocument();

        fireEvent.change(select, { target: { value: "8" } });
        expect(screen.queryByDisplayValue("7")).not.toBeInTheDocument();
        expect(screen.queryByDisplayValue("8")).toBeInTheDocument();

        fireEvent.change(select, { target: { value: "9" } });
        expect(screen.queryByDisplayValue("8")).not.toBeInTheDocument();
        expect(screen.queryByDisplayValue("9")).toBeInTheDocument();
    });
});