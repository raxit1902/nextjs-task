import { POST } from "./route"; // Adjust the path to your file
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

jest.mock("next/cache", () => ({
    revalidatePath: jest.fn(),
}));

jest.mock("next/server", () => ({
    NextResponse: {
        json: jest.fn((data, init) => ({
            json: data,
            ...init,
        })),
    },
}));

describe("POST API Route", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("revalidates the given path successfully", async () => {
        const mockRequest = {
            json: jest.fn().mockResolvedValueOnce({ path: "/test-path" }),
        };

        const response = await POST(mockRequest as any);

        expect(revalidatePath).toHaveBeenCalledWith("/test-path");
        expect(NextResponse.json).toHaveBeenCalledWith(
            { message: "Successfully revalidated /test-path" },
            undefined
        );
    });

    test("returns 400 if path is missing", async () => {
        const mockRequest = {
            json: jest.fn().mockResolvedValueOnce({}),
        };

        const response = await POST(mockRequest as any);

        expect(revalidatePath).not.toHaveBeenCalled();
        expect(NextResponse.json).toHaveBeenCalledWith(
            { message: "Path is required" },
            { status: 400 }
        );
    });

    test("returns 500 if revalidation fails", async () => {
        const mockRequest = {
            json: jest.fn().mockResolvedValueOnce({ path: "/test-path" }),
        };

        (revalidatePath as jest.Mock).mockImplementationOnce(() => {
            throw new Error("Revalidation error");
        });

        const response = await POST(mockRequest as any);

        expect(revalidatePath).toHaveBeenCalledWith("/test-path");
        expect(NextResponse.json).toHaveBeenCalledWith(
            {
                message: "Failed to revalidate path",
                error: "Revalidation error",
            },
            { status: 500 }
        );
    });
});
