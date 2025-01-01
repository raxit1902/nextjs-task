import { render, screen } from "@testing-library/react";
import Page from "./page"; // Import the page.tsx file
import "@testing-library/jest-dom";

global.fetch = jest.fn();

describe("Page Component (Server-Side Wrapper)", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    test("renders post details correctly when API call is successful", async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                id: "1",
                title: "Sample Post",
                body: "This is a sample post body.",
            }),
        });

        render(await Page({ params: { id: "1" } }));

        const title = await screen.findByText("Sample Post");
        const body = await screen.findByText("This is a sample post body.");
        const goBackLink = screen.getByTestId("go-back");

        expect(title).toBeInTheDocument();
        expect(body).toBeInTheDocument();
        expect(goBackLink).toHaveAttribute("href", "/");
    });

    test("renders error message when API call fails", async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
        });

        await expect(Page({ params: { id: "1" } })).rejects.toThrow("Failed to fetch post");
    });
});
