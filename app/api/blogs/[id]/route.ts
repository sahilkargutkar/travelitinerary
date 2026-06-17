import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Blog from "@/models/Blog";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectToDatabase();
    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json(blog);
  } catch (error: any) {
    console.error("GET /api/blogs/[id] error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch blog" },
      { status: 500 }
    );
  }
}
