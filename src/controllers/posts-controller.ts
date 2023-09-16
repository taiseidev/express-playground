import { Request, Response } from "express";
import Post from "../models/posts";

class PostController {
    async getAllPosts(_: Request, res: Response) {
        const posts = await Post.findAll();
        res.json(posts).status(200);
    }
}

export default new PostController();
