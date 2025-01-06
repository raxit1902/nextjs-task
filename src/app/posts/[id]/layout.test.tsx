import { render, screen } from "@testing-library/react";
import CreateLayout from "./layout";
import "@testing-library/jest-dom";

describe("CreateLayout Component", () => {
    test("renders children correctly", () => {
        render(
            <CreateLayout>
                <div data-testid="child-element">Test Child</div>
            </CreateLayout>
        );

        const childElement = screen.getByTestId("child-element");
        expect(childElement).toBeInTheDocument();
        expect(childElement).toHaveTextContent("Test Child");
    });
});
