/*
 * @coding: UTF-8
 * @Author: AwAjie
 * @Date: 2024-12-13 13:17:38
 */
import path from 'node:path'
import severConfig from '~/server/services/xjie.config';
import indexDB from '~/server/services/db-connect'
import cache from '~/server/services/lru-cache'
import listFilesFlat from '~/server/services/dev/index-list.dev'



export default defineEventHandler( async (event) => {
    const xjieConfig = await severConfig();
    const query = getQuery(event)
    const len = query.len

    if (process.env.NODE_ENV === 'development') {
        const a = path.join(process.cwd(), 'docs')
        const d = await listFilesFlat(a)
        const length = len !== undefined ? Math.floor(Number(len)) : Math.floor(xjieConfig?.server?.indexPX ?? 10);
        return {
            k: a,
            data: d.slice(0, length),
        }
    }

    // const UrlPathName = event.node.req.url
    // if (!UrlPathName) return {
    //     code: 500,
    //     error: 'UrlPathName is required'
    // }

    // 缓存
    // if (cache.has(UrlPathName)) {
    //     return {
    //         code: 200,
    //         data: cache.get(UrlPathName)
    //     }
    // }

    const queryStmt = indexDB.prepare("SELECT * FROM 'Xindex' LIMIT 0,?")
    const result = queryStmt.all(len ? len : xjieConfig?.server?.indexPX || 10);
    // cache.set(UrlPathName, result)
    return {
        q: query,
        // k: UrlPathName,
        data: result,
    }
})
