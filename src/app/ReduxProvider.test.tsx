import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ReduxProvider from "./ReduxProvider";

describe("ReduxProvider Component", () => {
    test("renders child components correctly", () => {
        render(
            <ReduxProvider>
                <div>Test Child</div>
            </ReduxProvider>
        );

        const childElement = screen.getByText("Test Child");
        expect(childElement).toBeInTheDocument();
    });

    test("provides Redux store to children", () => {
        const { container } = render(
            <ReduxProvider>
                <div>Redux Store Test</div>
            </ReduxProvider>
        );

        expect(container).toBeInTheDocument();
        expect(screen.getByText("Redux Store Test")).toBeInTheDocument();
    });
});
