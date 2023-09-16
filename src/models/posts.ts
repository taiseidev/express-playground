import { db } from "../models/db";

const Post = {
    fetchAllPosts: async () => {
        const sql = `SELECT * FROM posts`;
        const posts = await db.all(sql);
        console.log(posts);
        return posts;
    },
};

export default Post;
