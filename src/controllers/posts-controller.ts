import { Request, Response } from "express";
import Post from "../models/posts";

class PostController {
    async fetchAllPosts(_: Request, res: Response) {
        const posts = await Post.fetchAllPosts();
        res.json(posts).status(200);
    }

    async createPost(req: Request, res: Response) {
        const { userId, title, body } = req.body;
        let errors = [];

        if (!userId) {
            errors.push("userId is required");
        }
        if (!title) {
            errors.push("title is required");
        }
        if (!body) {
            errors.push("body is required");
        }

        if (errors.length > 0) {
            // 400 Bad Request（クライアント側のリクエストに誤りがある）
            return res.status(400).send({ error: errors.join(", ") });
        }

        // 201 Created（POSTリクエストが成功）
        // 成功した投稿内容を返却
        try {
            await Post.createPost(userId, title, body);
            res.status(201).send({ message: "Post created successfully!" });
        } catch (error) {
            if (isError(error)) {
                res.status(500).send({ error: error.message });
            }
        }
    }
}

// カスタム型ガード
// todo: 別APIでも使用するためutilに移動させる
function isError(err: any): err is Error {
    return err instanceof Error;
}

export default new PostController();
