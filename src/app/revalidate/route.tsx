import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
    try {
        const { path } = await req.json();
        console.log("console_pate", path);

        if (!path) {
            return NextResponse.json({ message: "Path is required" }, { status: 400 });
        }

        await revalidatePath(path);

        return NextResponse.json({ message: `Successfully revalidated ${path}` });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json(
            { message: `Failed to revalidate path`, error: errorMessage },
            { status: 500 }
        );
    }
}