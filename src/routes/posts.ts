import express from "express";
const router = express.Router();

import postsController from "../controllers/posts-controller";

router.get("/", postsController.getAllPosts);

module.exports = router;
