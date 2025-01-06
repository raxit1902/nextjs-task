import { render, screen } from "@testing-library/react";
import PostPageWrapper from "./page"; // Import the page.tsx file
import "@testing-library/jest-dom";

global.fetch = jest.fn();

describe("PostPageWrapper Component", () => {
    beforeEach(() => {
        jest.resetAllMocks(); // Reset all mocks before each test
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

        const params = { id: "1" };
        const { container } = render(await PostPageWrapper({ params }));

        const title = await screen.findByText("Sample Post");
        const body = await screen.findByText("This is a sample post body.");
        expect(title).toBeInTheDocument();
        expect(body).toBeInTheDocument();

        expect(global.fetch).toHaveBeenCalledWith(
            `https://jsonplaceholder.typicode.com/posts/1`
        );
        expect(container).toMatchSnapshot(); // Optional: Snapshot testing for the rendered component
    });

    test("throws an error when API call fails", async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
        });

        const params = { id: "1" };

        await expect(PostPageWrapper({ params })).rejects.toThrow("Failed to fetch post");

        expect(global.fetch).toHaveBeenCalledWith(
            `https://jsonplaceholder.typicode.com/posts/1`
        );
    });

    test("throws an error if fetch response is malformed", async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({}), // Empty object to simulate malformed response
        });

        const params = { id: "1" };

        await expect(PostPageWrapper({ params })).rejects.toThrow("Malformed response");

        expect(global.fetch).toHaveBeenCalledWith(
            `https://jsonplaceholder.typicode.com/posts/1`
        );
    });

});
