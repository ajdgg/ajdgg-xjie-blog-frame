/*
 * @coding: UTF-8
 * @Author: AwAjie
 * @Date: 2024-12-17 09:08:02
 */
import path from 'node:path'
import fs from 'node:fs/promises'
import Database from 'better-sqlite3'
// import {db } from 'better-sqlite3';
import yaml from 'js-yaml'


// ------------------------------------------------------
// DB1: 保存文章
// DB2: 保存分类
// DB3: 时间轴
// ------------------------------------------------------
const dbNameObj = {
    index: `CREATE TABLE IF NOT EXISTS Xindex (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        x_id TEXT,
        date TEXT DEFAULT CURRENT_TIMESTAMP,
        title TEXT NOT NULL,
        CreationTime TEXT DEFAULT CURRENT_TIMESTAMP,
        ModifyTime TEXT DEFAULT CURRENT_TIMESTAMP,
        introduce TEXT,
        classify TEXT,
        tags TEXT,
        TopMounted
    )`,
    content: `CREATE TABLE IF NOT EXISTS content (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        X_id TEXT,
        content TEXT
    )`
}

async function createDbFiles() {
    const pathDev = path.join(process.cwd(), '.output/db', '%s.db');
    const dirPath = path.join(process.cwd(), '.output/db');
    const filePath = pathDev.replace('%s', 'index');
    try {
        await fs.mkdir(dirPath, { recursive: true });
        const fd = await fs.open(filePath, 'w');
        console.log(`文件已成功创建: ${filePath}`);
        await fd.close();
    } catch (err) {
        console.error(err);
        return 0
    }
    for (const key in dbNameObj) {
        if (!dbNameObj.hasOwnProperty(key)) continue
        try {
            const rdb = new Database(filePath);
            rdb.pragma('journal_mode = WAL');
            await new Promise((resolve, reject) => {
                try {
                    rdb.exec(dbNameObj[key]);
                    resolve();
                } catch (error) {
                    reject(error);
                }
                
            });
            rdb.close();
        } catch (err) {
            console.error(`错误: ${filePath}`, err);
            break;
        }
    }
}

let x_id = 0;
const x_id_A = ()=> {
    x_id = x_id + 1;
    return (Array(10).join("0") + x_id).slice(-10);
}


async function listFilesFlat(dirPath) {
    const indexDB = new Database(path.join(process.cwd(), '.output/db', 'index.db'));
    try {
        
        const stmt = indexDB.prepare(`INSERT INTO Xindex (x_id, title, CreationTime, ModifyTime, introduce, classify, tags, TopMounted) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
        const classifyStmt = indexDB.prepare(`INSERT INTO content (x_id, content) VALUES (?, ?)`);
        if (!dirPath) {
            throw new Error('Directory path is undefined or empty');
        }
        const entries = await fs.readdir(dirPath, { withFileTypes: true });
        async function recursiveRead(currentPath, entries) {
            for (let entry of entries) {
                const fullPath = path.join(currentPath, entry.name);
                if (entry.isFile()) {
                    console.log(fullPath);
                    const content = await fs.readFile(fullPath, 'utf-8');
                    const contentPreview = content.slice(0, 500);
                    const headObjMatch = contentPreview.match(/(?<=^\s*---\s*$)([\s\S]*?)(?=\s*---\s*$)/m);
                    const headObj = headObjMatch ? yaml.load(headObjMatch[1]) : {};
                    const introduce = contentPreview.replace(/^(\s*---\s*[\s\S]*?\s*---\s*)$/m, '') || null;
                    const dbContent = content.replace(/^(\s*---\s*[\s\S]*?\s*---\s*)$/m, '') || null;
                    const dbx_id = x_id_A();
                    const title = String(headObj.title || entry.name.replace('.md', '') || null);
                    const creationTime = String(headObj.CreationTime || null);
                    const modifyTime = String(headObj.ModifyTime || null);
                    const dbClassify = JSON.stringify(headObj.classify) || null;
                    const dbTags = JSON.stringify(headObj.tags) || null;
                    const topMounted = headObj.Topm ? 1 : 0;
        
                    stmt.run(
                        dbx_id,
                        title,
                        creationTime,
                        modifyTime,
                        introduce,
                        dbClassify,
                        dbTags,
                        topMounted,
                    );
        
                    classifyStmt.run(
                        dbx_id,
                        dbContent,
                    );
                } else if (entry.isDirectory()) {
                    const subEntries = await fs.readdir(fullPath, { withFileTypes: true });
                    await recursiveRead(fullPath, subEntries);
                }
            }
        }
        await recursiveRead(dirPath, entries);
    } catch (err) {
        console.error(`Error reading directory ${dirPath}:`, err);
        throw err;
    } finally {
        if (indexDB) {
            indexDB.close();
        }
    }
}

try {
    await createDbFiles();
    await listFilesFlat(path.join(process.cwd(), 'doc'));
    console.log('数据库写入完成')

} catch (err) {
    console.error(`错误:`, err);
}

