/*
 * @coding: UTF-8
 * @Author: AwAjie
 * @Date: 2024-12-16 21:29:33
 */
import yaml from 'js-yaml'
import path from 'node:path'
import fs from 'node:fs/promises'

interface FileSystemEntry {
    x_id: string;
    title: string;
    CreationTime?: string;
    ModifyTime?: string;
    introduce?: string;
    classify?: any[];
    tags?: any[];
    _path: string;
    type: 'directory' | 'file';
    children?: FileSystemEntry[];
    contentPreview?: string; // 新增字段用于存储文件内容的前500个字符
}

let x_id = 0;
const x_id_A = ()=> {
    x_id = x_id + 1;
    return (Array(10).join("0") + x_id).slice(-10);
}

export default async function listFilesFlat(dirPath: string): Promise<FileSystemEntry[]> {
    try {
        // 验证 dirPath 是否有效
        if (!dirPath) {
            throw new Error('Directory path is undefined or empty');
        }

        const result: FileSystemEntry[] = [];

        async function recursiveRead(currentDirPath: string): Promise<FileSystemEntry[]> {
            const subResult: FileSystemEntry[] = [];
            const entries = await fs.readdir(currentDirPath, { withFileTypes: true }); // 每次递归时重新读取当前目录内容

            for (let entry of entries) {
                const fullPath = path.join(currentDirPath, entry.name);
                if (entry.isFile()) {
                    const id = x_id_A();
                    const content = await fs.readFile(fullPath, 'utf-8');
                    const contentPreview = content.slice(0, 500);
                    const headObjMatch = contentPreview.match(/(?<=^\s*---\s*$)([\s\S]*?)(?=\s*---\s*$)/m);
                    const headObj = headObjMatch ? yaml.load(headObjMatch[1]) : {} as any;
                    const introduce = contentPreview.replace(/^(\s*---\s*[\s\S]*?\s*---\s*)$/m, '') || null;

                    const fileSystemEntry: FileSystemEntry = {
                        x_id: id,
                        title: String((headObj as any).title || entry.name.replace('.md', '') || null),
                        introduce: introduce || '',
                        CreationTime: headObj.CreationTime,
                        ModifyTime: headObj.ModifyTime,
                        classify: headObj.classify || null,
                        tags: headObj.tags || null,
                        _path: fullPath,
                        type: 'file',
                        contentPreview: contentPreview
                    };

                    subResult.push(fileSystemEntry);
                } else if (entry.isDirectory()) {
                    // 递归调用以获取子目录中的文件
                    const subEntries = await recursiveRead(fullPath);
                    subResult.push(...subEntries);
                }
            }
            return subResult;
        }

        result.push(...await recursiveRead(dirPath));
        return result;
    } catch (err) {
        console.error(`Error reading directory ${dirPath}:`, err);
        throw err; // 重新抛出错误，以便调用者可以处理它
    } finally {
        x_id = 0;
    }
}