import express from "express";
const app = express();

import { initializeDatabase, closeDatabase } from "./models/db";

// DBの初期化
initializeDatabase()
    .then(() => {
        console.log("Database initialized.");
    })
    .catch((error) => {
        console.error("Failed to initialize the database.", error);
    });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
