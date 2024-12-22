/*
 * @coding: UTF-8
 * @Author: AwAjie
 * @Date: 2024-12-06 23:12:04
 */
import type {XjieConfigType} from '~/types/xjie.configType'
import XjieConfigYml from '~/xjie.config.yml'

const xjieConfig: XjieConfigType = XjieConfigYml as unknown as XjieConfigType
export default defineNuxtPlugin(() => {
    return {
        provide: {
            xjieConfig: xjieConfig
        }
    }
});