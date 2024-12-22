/*
 * @coding: UTF-8
 * @Author: AwAjie
 * @Date: 2024-12-14 22:32:26
 */
import {LRUCache} from 'lru-cache';

const options = {
    max: 1000,
    maxAge: 1000 * 60 * 60
};

const cache = new LRUCache(options);

export default cache;