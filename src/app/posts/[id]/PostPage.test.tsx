import { render, screen } from "@testing-library/react";
import PostPage from "./PostPage";
import "@testing-library/jest-dom";

describe("PostPage Component", () => {
    const mockPost = {
        id: "1",
        title: "Sample Post",
        body: "This is a sample post body.",
    };

    test("renders the 'Go Back' link", async () => {
        render(<PostPage post={mockPost} />);
        const goBackLink = screen.getByTestId("go-back");
        expect(goBackLink).toBeInTheDocument();
        expect(goBackLink).toHaveAttribute("href", "/");
    });

    test("renders post details correctly", async () => {
        render(<PostPage post={mockPost} />);
        const title = screen.getByText("Sample Post");
        const body = screen.getByText("This is a sample post body.");
        expect(title).toBeInTheDocument();
        expect(body).toBeInTheDocument();
    });
});
