import { render, screen, fireEvent } from "@testing-library/react";
import CreatePost from "./page";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import "@testing-library/jest-dom";

jest.mock("react-redux", () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));

describe("CreatePost Component", () => {
    let mockDispatch: jest.Mock;
    let mockRouter: { push: jest.Mock; back: jest.Mock };

    beforeEach(() => {
        mockDispatch = jest.fn();
        (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);

        mockRouter = { push: jest.fn(), back: jest.fn() };
        (useRouter as jest.Mock).mockReturnValue(mockRouter);

        (useSelector as unknown as jest.Mock).mockImplementation((selectorFn) =>
            selectorFn({
                posts: {
                    loading: false,
                    error: null,
                    success: null,
                },
            })
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("renders form elements correctly", () => {
        render(<CreatePost />);

        expect(screen.getByPlaceholderText("Title")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Body")).toBeInTheDocument();
        expect(screen.getByText("Cancel")).toBeInTheDocument();
        expect(screen.getByText("Submit")).toBeInTheDocument();
    });

    test("updates input fields on user input", () => {
        render(<CreatePost />);

        const titleInput = screen.getByPlaceholderText("Title") as HTMLInputElement;
        const bodyTextarea = screen.getByPlaceholderText("Body") as HTMLTextAreaElement;

        fireEvent.change(titleInput, { target: { value: "Test Title" } });
        fireEvent.change(bodyTextarea, { target: { value: "Test Body" } });

        expect(titleInput.value).toBe("Test Title");
        expect(bodyTextarea.value).toBe("Test Body");
    });

    test("dispatches createPostRequest on form submission", () => {
        render(<CreatePost />);

        const titleInput = screen.getByPlaceholderText("Title");
        const bodyTextarea = screen.getByPlaceholderText("Body");
        const submitButton = screen.getByText("Submit");

        fireEvent.change(titleInput, { target: { value: "New Title" } });
        fireEvent.change(bodyTextarea, { target: { value: "New Body" } });

        fireEvent.click(submitButton);

        expect(mockDispatch).toHaveBeenCalledWith({
            type: "posts/createPostRequest",
            payload: { title: "New Title", body: "New Body" },
        });
    });

    test("navigates back on cancel", () => {
        render(<CreatePost />);

        const cancelButton = screen.getByText("Cancel");

        fireEvent.click(cancelButton);

        expect(mockRouter.back).toHaveBeenCalled();
    });

    test("shows error messages when submitting empty form fields", () => {
        render(<CreatePost />);

        const submitButton = screen.getByText("Submit");

        fireEvent.click(submitButton);

        expect(screen.getByText("Title is required!")).toBeInTheDocument();
        expect(screen.getByText("Body is required!")).toBeInTheDocument();
    });
});
