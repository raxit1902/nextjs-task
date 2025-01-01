import { editPostServer } from "./serverActions";
import { store } from "../../../redux/store";
import { editPostSuccess } from "../../../redux/slices/postsSlice";

jest.mock("../../../redux/store", () => ({
    store: {
        dispatch: jest.fn(),
    },
}));

global.fetch = jest.fn();

describe("editPostServer", () => {
    const mockFormData = (data: Record<string, string>): FormData => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => formData.append(key, value));
        return formData;
    };

    beforeEach(() => {
        jest.resetAllMocks();
    });

    test("throws an error if title or body is missing", async () => {
        const formData = mockFormData({ title: "", body: "" });

        await expect(editPostServer(formData, 1)).rejects.toThrow(
            "Title and Body are required fields."
        );
    });

    test("makes a PUT request with correct data", async () => {
        const formData = mockFormData({ title: "Updated Title", body: "Updated Body" });
        const mockResponse = { id: 1, title: "Updated Title", body: "Updated Body" };

        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        });

        const result = await editPostServer(formData, 1);

        expect(global.fetch).toHaveBeenCalledWith(
            "https://jsonplaceholder.typicode.com/posts/1",
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: 1, title: "Updated Title", body: "Updated Body" }),
            }
        );

        expect(result).toEqual(mockResponse);

        expect(store.dispatch).toHaveBeenCalledWith(editPostSuccess(mockResponse));
    });

    test("throws an error if the API call fails", async () => {
        const formData = mockFormData({ title: "Updated Title", body: "Updated Body" });

        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
        });

        await expect(editPostServer(formData, 1)).rejects.toThrow("Failed to create post");

        expect(store.dispatch).not.toHaveBeenCalled();
    });
});
