import { render, screen, fireEvent } from "@testing-library/react";
import PostPage from "./PostPage";
import "@testing-library/jest-dom";

describe("PostPage Component", () => {
    const mockPost = {
        id: "1",
        title: "Sample Post",
        body: "This is a sample post body.",
    };

    beforeEach(() => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ message: "Revalidated successfully!" }),
            })
        ) as jest.Mock;

        window.alert = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("renders the 'Go Back' link", () => {
        render(<PostPage post={mockPost} />);
        const goBackLink = screen.getByTestId("go-back");
        expect(goBackLink).toBeInTheDocument();
        expect(goBackLink).toHaveAttribute("href", "/");
    });

    test("renders post details correctly", () => {
        render(<PostPage post={mockPost} />);
        const title = screen.getByText("Sample Post");
        const body = screen.getByText("This is a sample post body.");
        expect(title).toBeInTheDocument();
        expect(body).toBeInTheDocument();
    });

    test("renders the 'Revalidate' button", () => {
        render(<PostPage post={mockPost} />);
        const revalidateButton = screen.getByRole("button");
        expect(revalidateButton).toBeInTheDocument();
    });

    test("clicking 'Revalidate' button triggers handleRevalidate function", async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ message: "Revalidated successfully!" }),
            })
        ) as jest.Mock;

        const alertMock = jest.spyOn(window, "alert").mockImplementation(() => { });

        render(<PostPage post={mockPost} />);

        const revalidateButton = screen.getByRole("button");

        fireEvent.click(revalidateButton);

        await screen.findByText("Sample Post");

        expect(global.fetch).toHaveBeenCalledWith(
            "/revalidate",
            expect.objectContaining({
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ path: `/posts/${mockPost.id}` }),
            })
        );
        expect(alertMock).toHaveBeenCalledWith("Cache for /posts/1 revalidated successfully!");

        alertMock.mockRestore();
    });


    test("renders the 'Edit Post' link", () => {
        render(<PostPage post={mockPost} />);
        const editPostLink = screen.getByTestId("edit-btn");
        expect(editPostLink).toBeInTheDocument();
        expect(editPostLink).toHaveAttribute("href", `/posts/edit/${mockPost.id}`);
    });
});
