import { Request, Response } from "express";
import Post from "../models/posts";

class PostController {
    async fetchAllPosts(_: Request, res: Response) {
        const posts = await Post.fetchAllPosts();
        res.status(200).json(posts);
    }

    async fetchPostById(req: Request, res: Response) {
        const postId = req.params.id;
        if (!postId) {
            return res.status(400).send({ error: "idが指定されていません" });
        }
        try {
            const post = await Post.fetchPostById(postId);
            console.log(post);
            res.status(200).json(post);
        } catch (error) {
            if (isError(error)) {
                res.status(500).send({ error: error.message });
            }
        }
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

    async updatePostById(req: Request, res: Response) {
        const postId = req.params.id;
        const { title, body } = req.body;
        let errors = [];

        if (!postId) {
            errors.push("idが指定されていません");
        }
        if (!title) {
            errors.push("titleが指定されていません");
        }
        if (!body) {
            errors.push("bodyが指定されていません");
        }

        if (errors.length > 0) {
            // 400 Bad Request（クライアント側のリクエストに誤りがある）
            return res.status(400).send({ error: errors.join(", ") });
        }

        try {
            await Post.updatePostById(title, body, postId);
            res.status(200).send({ message: "Post update successfully!" });
        } catch (error) {
            if (isError(error)) {
                res.status(500).send({ error: error.message });
            }
        }
    }

    async deletePost(req: Request, res: Response) {
        const postId = req.params.id;
        if (!postId) {
            return res.status(400).send({ error: "idが指定されていません" });
        }

        try {
            await Post.deletePost(postId);
            res.status(200).send({ message: "Post deleted successfully!" });
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
