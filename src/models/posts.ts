import { db } from "../models/db";

const Post = {
    fetchAllPosts: async () => {
        const sql = `SELECT * FROM posts`;
        const posts = await db.all(sql);
        console.log(posts);
        return posts;
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
};

export default Post;
