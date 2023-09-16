import app from "./app";
const PORT = 3000;

// サーバを起動
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
