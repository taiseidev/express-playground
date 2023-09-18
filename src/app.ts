import express from "express";
const app = express();

import { initializeDatabase, closeDatabase } from "./models/db";

// JSONボディの解析
app.use(express.json());

// URLエンコードされたボディの解析
app.use(express.urlencoded({ extended: true }));

// DBの初期化
initializeDatabase()
    .then(() => {
        console.log("Database initialized.");
    })
    .catch((error) => {
        console.error("Failed to initialize the database.", error);
    });

const postsRouter = require("./routes/posts");

app.use("/posts", postsRouter);

// アプリケーションの終了時の処理
process.on("exit", () => {
    closeDatabase()
        .then(() => {
            console.log("Database closed.");
        })
        .catch((error) => {
            console.error("Failed to close the database.", error);
        });
});

export default app;
