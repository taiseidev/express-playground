import express from "express";
const router = express.Router();

import postsController from "../controllers/posts-controller";

// 全ての投稿を取得
router.get("/", postsController.fetchAllPosts);
// 特定の投稿を取得
router.get("/:id", postsController.fetchPostById);

// 新規投稿を作成する
router.post("/", postsController.createPost);

// 指定したidの投稿を削除
router.delete("/:id", postsController.deletePost);
module.exports = router;
