import sqlite3 from "sqlite3";
import { open } from "sqlite";

let db: any;

async function addPost(
    userId: number,
    title: string,
    body: string
): Promise<void> {
    return new Promise((resolve, reject) => {
        const insertSQL = `
                            INSERT INTO posts (userId, title, body) VALUES (?, ?, ?);
                        `;

        db.run(insertSQL, [userId, title, body], (err: any) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

async function initializeDatabase() {
    db = await open({
        filename: "../../express-playground.sqlite3",
        driver: sqlite3.Database,
    });

    return db;
}

async function closeDatabase() {
    if (db) {
        await db.close();
    }
}

export { initializeDatabase, closeDatabase, db };
