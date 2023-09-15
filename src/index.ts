import express from "express";
const app = express();
const PORT = 3000;

// サンプルのルートエンドポイントを追加
app.get("/", (_: any, res: { json: (arg0: { message: string }) => void }) => {
    res.json({ message: "テスト" });
});

// サーバを起動
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
