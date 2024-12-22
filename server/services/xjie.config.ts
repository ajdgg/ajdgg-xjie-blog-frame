/*
 * @coding: UTF-8
 * @Author: AwAjie
 * @Date: 2024-12-06 23:12:04
 */
import type {XjieConfigType}  from '~/types/xjie.configType'
import path from 'node:path'
import fs from 'node:fs/promises'
import yaml from 'js-yaml'

let cachedConfig: XjieConfigType | null = null;
export default async function severConfig() {
    if (cachedConfig) {
        return cachedConfig;
    }
    const a = path.join(process.cwd(), 'xjie.config.yml')
    const c = await fs.readFile(a, 'utf8')
    const config: XjieConfigType = yaml.load(c) as XjieConfigType
    return config
}
