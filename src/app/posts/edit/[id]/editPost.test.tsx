import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { useRouter, useParams } from "next/navigation";
import configureStore from "redux-mock-store";
import "@testing-library/jest-dom";
import Page from "./page";
import { fetchPostByIdRequest, editPostRequest } from "../../../redux/slices/postsSlice";

jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
    useParams: jest.fn(),
}));

const mockStore = configureStore([]);

describe("Edit Post Page Component", () => {
    let store: any;
    let mockRouter: { back: jest.Mock };

    beforeEach(() => {
        store = mockStore({
            posts: {
                currentPost: { id: "1", title: "Test Title", body: "Test Body" },
                loading: false,
                error: null,
                success: null,
            },
        });

        mockRouter = { back: jest.fn() };
        (useRouter as jest.Mock).mockReturnValue(mockRouter);
        (useParams as jest.Mock).mockReturnValue({ id: "1" });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("renders form elements with pre-filled post details", () => {
        render(
            <Provider store={store}>
                <Page />
            </Provider>
        );

        const titleInput = screen.getByPlaceholderText("Title") as HTMLInputElement;
        const bodyTextarea = screen.getByPlaceholderText("Body") as HTMLTextAreaElement;

        expect(titleInput.value).toBe("Test Title");
        expect(bodyTextarea.value).toBe("Test Body");
        expect(screen.getByText("Cancel")).toBeInTheDocument();
        expect(screen.getByText("Submit")).toBeInTheDocument();
    });

    test("updates input fields on user input", () => {
        render(
            <Provider store={store}>
                <Page />
            </Provider>
        );

        const titleInput = screen.getByPlaceholderText("Title") as HTMLInputElement;
        const bodyTextarea = screen.getByPlaceholderText("Body") as HTMLTextAreaElement;

        fireEvent.change(titleInput, { target: { value: "Updated Title" } });
        fireEvent.change(bodyTextarea, { target: { value: "Updated Body" } });

        expect(titleInput.value).toBe("Updated Title");
        expect(bodyTextarea.value).toBe("Updated Body");
    });

    test("dispatches editPostRequest on form submission", () => {
        render(
            <Provider store={store}>
                <Page />
            </Provider>
        );

        const titleInput = screen.getByPlaceholderText("Title");
        const bodyTextarea = screen.getByPlaceholderText("Body");
        const submitButton = screen.getByText("Submit");

        fireEvent.change(titleInput, { target: { value: "Updated Title" } });
        fireEvent.change(bodyTextarea, { target: { value: "Updated Body" } });

        fireEvent.click(submitButton);

        const actions = store.getActions();
        expect(actions).toContainEqual(
            editPostRequest({ id: "1", title: "Updated Title", body: "Updated Body" })
        );
    });

    test("shows validation errors for empty title and body", () => {
        render(
            <Provider store={store}>
                <Page />
            </Provider>
        );

        const titleInput = screen.getByPlaceholderText("Title");
        const bodyTextarea = screen.getByPlaceholderText("Body");
        const submitButton = screen.getByText("Submit");

        fireEvent.change(titleInput, { target: { value: "" } });
        fireEvent.change(bodyTextarea, { target: { value: "" } });

        fireEvent.click(submitButton);

        expect(screen.getByText("Title is required!")).toBeInTheDocument();
        expect(screen.getByText("Body is required!")).toBeInTheDocument();
    });

    test("navigates back on cancel button click", () => {
        render(
            <Provider store={store}>
                <Page />
            </Provider>
        );

        const cancelButton = screen.getByText("Cancel");

        fireEvent.click(cancelButton);

        expect(mockRouter.back).toHaveBeenCalled();
    });

    test("shows loading state when loading is true", () => {
        store = mockStore({
            posts: {
                currentPost: null,
                loading: true,
                error: null,
                success: null,
            },
        });

        render(
            <Provider store={store}>
                <Page />
            </Provider>
        );

        const submitButton = screen.getByTestId("submit-button");
        expect(submitButton).toHaveTextContent("Submitting...");
    });
});
