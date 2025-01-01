import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { useRouter, useParams } from "next/navigation";
import "@testing-library/jest-dom";
import Page from "./page";
import configureStore from "redux-mock-store";
import { fetchPostByIdRequest, editPostRequest } from "../../../redux/slices/postsSlice";

jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
    useParams: jest.fn(),
}));

const mockStore = configureStore([]);

describe("EditPost Component", () => {
    let store: any;
    let mockRouter: { push: jest.Mock; back: jest.Mock };

    beforeEach(() => {
        store = mockStore({
            posts: {
                currentPost: { id: "1", title: "Test Title", body: "Test Body" },
                loading: false,
                error: null,
            },
        });

        mockRouter = { push: jest.fn(), back: jest.fn() };
        (useRouter as jest.Mock).mockReturnValue(mockRouter);
        (useParams as jest.Mock).mockReturnValue({ id: "1" });
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

        expect(mockRouter.back).toHaveBeenCalled();
    });

    test("navigates to home on cancel button click", () => {
        render(
            <Provider store={store}>
                <Page />
            </Provider>
        );

        const cancelButton = screen.getByText("Cancel");

        fireEvent.click(cancelButton);

        expect(mockRouter.push).toHaveBeenCalledWith("/");
    });

    test("displays loading state when loading is true", () => {
        store = mockStore({
            posts: {
                currentPost: null,
                loading: true,
                error: null,
            },
        });

        render(
            <Provider store={store}>
                <Page />
            </Provider>
        );

        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    test("displays error message when there is an error", () => {
        store = mockStore({
            posts: {
                currentPost: null,
                loading: false,
                error: "An error occurred",
            },
        });

        render(
            <Provider store={store}>
                <Page />
            </Provider>
        );

        expect(screen.getByText("Error: An error occurred")).toBeInTheDocument();
    });
});
