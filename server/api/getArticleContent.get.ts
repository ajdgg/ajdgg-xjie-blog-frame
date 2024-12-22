/*
 * @coding: UTF-8
 * @Author: AwAjie
 * @Date: 2024-12-19 15:27:21
 */
import path from 'node:path'
import fs from 'node:fs/promises'
import listFilesFlat from '~/server/services/dev/index-list.dev'


export default defineEventHandler( async (event) => {
    const query = getQuery(event)
    const id = query.id as string
    if (process.env.NODE_ENV === 'development') {
        const a = path.join(process.cwd(), 'docs')
        const x = await listFilesFlat(a)
        const y = x.find(obj => obj.x_id === id)
        if (!y || !y._path) return
        const fileData = await fs.readFile(y?._path, 'utf8')
        return {
            code: 200,
            d: fileData,
        }
    }
})