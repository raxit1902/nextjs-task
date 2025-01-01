import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RootLayout from "./layout";
import { store } from "./redux/store";
import { Provider } from "react-redux";

describe("RootLayout Component", () => {
    test("renders child components correctly", () => {
        render(
            <RootLayout>
                <div>Test Child</div>
            </RootLayout>
        );

        const childElement = screen.getByText("Test Child");
        expect(childElement).toBeInTheDocument();
    });

    test("wraps content with Provider from react-redux", () => {
        const providerSpy = jest.spyOn(Provider.prototype, "render");

        render(
            <RootLayout>
                <div>Redux Child</div>
            </RootLayout>
        );

        expect(providerSpy).toHaveBeenCalled();
        expect(providerSpy.mock.calls[0][0]).toHaveProperty("store", store);
    });

    test("applies font classes to the body tag", () => {
        render(
            <RootLayout>
                <div>Styled Child</div>
            </RootLayout>
        );

        const body = document.body;
        expect(body).toHaveClass("antialiased");
        expect(body).toHaveClass("--font-geist-sans");
        expect(body).toHaveClass("--font-geist-mono");
    });
});
