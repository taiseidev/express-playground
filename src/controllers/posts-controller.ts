import { Request, Response } from "express";
import Post from "../models/posts";

class PostController {
    async fetchAllPosts(_: Request, res: Response) {
        const posts = await Post.fetchAllPosts();
        res.json(posts).status(200);
    }
}

export default new PostController();
