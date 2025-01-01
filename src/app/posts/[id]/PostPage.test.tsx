import { render, screen } from "@testing-library/react";
import PostPage from "./page";
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";

// Mock the global fetch API
global.fetch = jest.fn();

describe("PostPage Component", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    test("renders the 'Go Back' link", async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                id: 1,
                title: "Sample Post",
                body: "This is a sample post body.",
            }),
        });

        await act(async () => {
            render(<PostPage params={{ id: "1" }} />);
        });

        const goBackLink = screen.getByText("Go Back");
        expect(goBackLink).toBeInTheDocument();
        expect(goBackLink).toHaveAttribute("href", "/");
    });

    test("renders post details correctly", async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                id: 1,
                title: "Sample Post",
                body: "This is a sample post body.",
            }),
        });

        await act(async () => {
            render(<PostPage params={{ id: "1" }} />);
        });

        const title = screen.getByText("Sample Post");
        const body = screen.getByText("This is a sample post body.");
        expect(title).toBeInTheDocument();
        expect(body).toBeInTheDocument();
    });

    test("handles API errors gracefully", async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
        });

        await expect(
            act(async () => {
                await render(<PostPage params={{ id: "1" }} />);
            })
        ).rejects.toThrow("Failed to fetch post");
    });
});
