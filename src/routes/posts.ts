import express from "express";
const router = express.Router();

import postsController from "../controllers/posts-controller";

// 全ての投稿を取得
router.get("/", postsController.fetchAllPosts);

// 新規投稿を作成する
router.post("/", postsController.fetchAllPosts);
module.exports = router;
