import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Blog from "@/models/Blog";

const SEED_ARTICLES = [
  {
    title: "The Art of Slow Travel: A Week Floating Through Kerala's Quiet Backwaters",
    desc: "Unplug from the modern pace and discover the therapeutic magic of traditional kettuvallam houseboats, local spice trails, and Ayurvedic wellness rituals.",
    image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=1000&q=80",
    category: "Culture & Wellness",
    readTime: "6 min read",
    author: "Evelyn Thorne",
    featured: true,
  },
  {
    title: "Secret El Nido: Navigating Palawan's Hidden Marine Lagoons",
    desc: "A senior explorer's guide to dodging the tourist crowds and discovering untouched turquoise sinkholes in the Philippines.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    category: "Adventure Guides",
    readTime: "8 min read",
    author: "Marcus Sterling",
    featured: false,
  },
  {
    title: "Seoul's Midnight Kitchens: Street Food in Gwangjang Market",
    desc: "From hand-cut noodle stalls to sweet hotteok griddles, we catalog the absolute best local culinary spots open past midnight.",
    image: "https://unsplash.com/photos/aerial-view-of-buildings-during-daytime-W6tV_fU76Gk",
    category: "Gastronomy",
    readTime: "5 min read",
    author: "Ji-Yeon Park",
    featured: false,
  },
];

// GET: Fetch all blogs (seeds database if empty) sorted by updatedAt descending
export async function GET() {
  try {
    await connectToDatabase();

    let blogs = await Blog.find().sort({ updatedAt: -1 });

    // Seed initial blogs if database is empty
    if (blogs.length === 0) {
      await Blog.insertMany(SEED_ARTICLES);
      blogs = await Blog.find().sort({ updatedAt: -1 });
    }

    return NextResponse.json(blogs);
  } catch (error: any) {
    console.error("GET /api/blogs error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch blogs" }, { status: 500 });
  }
}

// POST: Create a new blog
export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const { title, desc, image, category, readTime, author, featured } = body;

    if (!title || !desc || !image || !category || !readTime || !author) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // If this post is set to featured, unset featured on all other posts
    if (featured === true) {
      await Blog.updateMany({}, { $set: { featured: false } });
    }

    const newBlog = await Blog.create({
      title,
      desc,
      image,
      category,
      readTime,
      author,
      featured: !!featured,
    });

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/blogs error:", error);
    return NextResponse.json({ error: error.message || "Failed to create blog" }, { status: 500 });
  }
}

// PUT: Update an existing blog
export async function PUT(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { _id, title, desc, image, category, readTime, author, featured } = body;

    if (!_id) {
      return NextResponse.json({ error: "Missing blog ID" }, { status: 400 });
    }

    if (!title || !desc || !image || !category || !readTime || !author) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // If updating this post to featured, unset featured on all other posts
    if (featured === true) {
      await Blog.updateMany({}, { $set: { featured: false } });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      _id,
      {
        title,
        desc,
        image,
        category,
        readTime,
        author,
        featured: !!featured,
      },
      { new: true }
    );

    if (!updatedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(updatedBlog);
  } catch (error: any) {
    console.error("PUT /api/blogs error:", error);
    return NextResponse.json({ error: error.message || "Failed to update blog" }, { status: 500 });
  }
}

// DELETE: Delete a blog post
export async function DELETE(req: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing blog ID parameter" }, { status: 400 });
    }

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Blog deleted successfully" });
  } catch (error: any) {
    console.error("DELETE /api/blogs error:", error);
    return NextResponse.json({ error: error.message || "Failed to delete blog" }, { status: 500 });
  }
}
