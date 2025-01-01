import { render, screen } from "@testing-library/react";
import HomePage from "./page";
import "@testing-library/jest-dom";

describe("HomePage Component", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    test("renders the header and 'Create New Post' link", async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve([]),
            } as Response)
        );

        const { findByText } = await render(await HomePage());

        expect(await findByText("Post List")).toBeInTheDocument();
        const createLink = await findByText("Create New Post");
        expect(createLink).toBeInTheDocument();
        expect(createLink).toHaveAttribute("href", "/create");
    });

    test("renders posts fetched from the API", async () => {
        const mockPosts = [
            { id: 1, title: "Post 1", body: "This is the first post" },
            { id: 2, title: "Post 2", body: "This is the second post" },
        ];

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockPosts),
            } as Response)
        );

        const { findByText } = await render(await HomePage());

        expect(await findByText("Post 1")).toBeInTheDocument();
        expect(await findByText("Post 2")).toBeInTheDocument();
    });

    test("handles API errors gracefully", async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                statusText: "Internal Server Error",
            } as Response)
        );

        await expect(HomePage()).rejects.toThrow("Failed to fetch posts");
    });
});
