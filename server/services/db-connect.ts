/*
 * @coding: UTF-8
 * @Author: AwAjie
 * @Date: 2024-12-19 15:01:05
 */
import path from 'node:path'
import Database from 'better-sqlite3'

const indexDB = new Database(path.join(process.cwd(), 'db', 'index.db'))

export default indexDB
