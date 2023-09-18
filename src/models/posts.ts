import { db } from "../models/db";

const Post = {
    fetchAllPosts: async () => {
        const sql = `SELECT * FROM posts`;
        const posts = await db.all(sql);
        console.log(posts);
        return posts;
    },

    fetchPostById: async (postId: string) => {
        const sql = `SELECT * FROM posts WHERE id = ?;`;
        try {
            const post = await db.get(sql, [postId]);
            return post;
        } catch (error) {
            console.error("Database error:", error);
            throw new Error(`Failed to fetch post（id: ${postId}）`);
        }
    },

    createPost: async (userId: number, title: string, body: string) => {
        // パラメータ化されたクエリを使用
        const sql = `INSERT INTO posts (userId, title, body) VALUES (?, ?, ?)`;
        try {
            await db.run(sql, [userId, title, body]);
        } catch (error: unknown) {
            console.error("Database error:", error);
            throw new Error("Failed to create post.");
        }
    },

    deletePost: async (postId: string) => {
        const sql = `DELETE FROM posts WHERE id = ?`;
        try {
            await db.run(sql, [postId]);
        } catch (error) {
            console.error("Database error:", error);
            throw new Error("Failed to delete post");
        }
    },
};

export default Post;
