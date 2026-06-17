import mongoose, { Schema, model, models } from "mongoose";

export interface IBlog {
  _id: string;
  title: string;
  desc: string;
  image: string;
  category: string;
  readTime: string;
  author: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    readTime: { type: String, required: true },
    author: { type: String, required: true },
    featured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// Prevent compiling model query helper compile issues in hot reloading
const Blog = models.Blog || model<IBlog>("Blog", BlogSchema);

export default Blog;
