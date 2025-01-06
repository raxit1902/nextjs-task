import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RootLayout from "./layout";
import ReduxProvider from "./ReduxProvider";

jest.mock("./ReduxProvider", () => {
    return jest.fn(({ children }: { children: React.ReactNode }) => <>{children}</>);
});

describe("RootLayout Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders child components correctly", () => {
        render(
            <RootLayout>
                <div>Test Child</div>
            </RootLayout>
        );

        const childElement = screen.getByText("Test Child");
        expect(childElement).toBeInTheDocument();
    });

    test("wraps content with ReduxProvider", () => {
        render(
            <RootLayout>
                <div>Redux Child</div>
            </RootLayout>
        );

        expect(ReduxProvider).toHaveBeenCalled();
    });

    test("renders the header with correct content", () => {
        render(
            <RootLayout>
                <div>Header Test Child</div>
            </RootLayout>
        );

        const header = screen.getByRole("banner");
        const title = screen.getByText("POSTSTACK");

        expect(header).toBeInTheDocument();
        expect(title).toBeInTheDocument();
    });

    test("renders the footer with correct content", () => {
        render(
            <RootLayout>
                <div>Footer Test Child</div>
            </RootLayout>
        );

        const footer = screen.getByText("© Copyright 2025 Poststack | All Rights Reserved.");
        expect(footer).toBeInTheDocument();
    });

    test("applies font classes to the body tag", () => {
        render(
            <RootLayout>
                <div>Styled Child</div>
            </RootLayout>
        );

        const body = document.body;
        expect(body).toHaveClass("antialiased");
    });
});
