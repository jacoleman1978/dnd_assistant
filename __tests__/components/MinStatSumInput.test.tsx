import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";

import MinStatSumInput from "../../src/components/rollStatSet/MinStatSumInput";

describe("MinStatSumInput", () => {
    it("renders a label and input field", () => {
        render(<MinStatSumInput setMinStatSum={() => {}} />);
        expect(screen.getByLabelText(/Min Stat Sum:/)).toBeInTheDocument();
        expect(screen.getByRole("spinbutton")).toBeInTheDocument();
        const input = screen.getByRole("spinbutton");
        expect(input).toHaveValue(18);
        expect(input).toHaveAttribute("min", "18");
        expect(input).toHaveAttribute("max", "85");
    });

    it("updates the state when the input value changes", () => {
        const setMinStatSum = jest.fn();
        render(<MinStatSumInput setMinStatSum={setMinStatSum} />);
        const input = screen.getByRole("spinbutton");
        fireEvent.change(input, { target: { value: "20" } });
        expect(setMinStatSum).toHaveBeenCalledWith(20);
    });
});
