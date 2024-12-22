<!--
 * @coding: UTF-8
 * @Author: AwAjie
 * @Date: 2024-12-06 21:53:30
-->
<script lang="ts" setup>
import type { XjieConfigType } from '~/types/xjie.configType';
const { $xjieConfig } = useNuxtApp();
const xjieConfig: XjieConfigType = $xjieConfig as XjieConfigType;

let w = ref<boolean>(false);
useSeoMeta({
    title: xjieConfig?.title || '',
    ogTitle: '小杰和珩屿的网站',
    description: '欢迎来到小杰和珩屿的网站，愿这个网站能帮助到你，Welcome to my website',
    ogDescription: '欢迎来到小杰和珩屿的网站，愿这个网站能帮助到你，Welcome to my website',
    keywords: "小杰 珩屿 小杰和珩屿 小杰和珩屿的网站 小杰珩屿 小杰和珩屿的博客 awajie awesomeajie 顶呱呱的阿杰",
})

interface Article {
    code: number;
    data: [] | null;
}
let wData = ref<Article>({
    code: 0,
    data: null
})
const { data: a } = await useFetch('/api/getArticleList', {
    method: 'GET',
})
wData.value = a.value as unknown as Article;


onMounted(async() => {
    w.value = true;
})
</script>

<template>
    <div>
        <div class="xj-h" :style="{color: xjieConfig?.index?.titleColor || '#000'}">
            <div class="bgimage" :class=" {'bgimage-absolute': !xjieConfig?.index?.bgFixed, 'bgimage-fixed': xjieConfig?.index?.bgFixed}">
                <img :src="xjieConfig?.index?.bgimage || ''" alt="">
            </div>
            <h1>{{ xjieConfig?.index?.MainTitle }}</h1>
            <h2>{{ xjieConfig?.index?.subheading }}</h2>
        </div>
        <div class="xj-body">
            <!-- <div style="flex: 1; height: 100vh;">1</div> -->
            <div class="xj-body-waterfall">
                <xjie-waterfall v-if="w" :data="wData.data || []">
                    <template #default="{ dataK }">
                        <div class="articleCard">
                            <div class="articleCard-title">
                                <NuxtLink :to="'doc/' + dataK.x_id">{{ dataK.title }}</NuxtLink>
                            </div>
                            <div>{{ dataK.introduce }}</div>
                        </div>
                    </template>
                </xjie-waterfall>
            </div>
            <blogroll-box></blogroll-box>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.xj-h {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100dvh;
    position: relative;
    h1 {
        font-size: 3rem;
        text-align: center;
    }
    h1,
    h2 {
        margin: .2rem;
    }
}
.xj-body {
    display: flex;
    flex-direction: row;
    max-width: 1200px;
    margin: 0 auto;
    align-items: flex-start;
    .xj-body-waterfall {
        flex: 1;
        min-width: 0;
        margin: 0 1rem;
    }
    .articleCard {
        width: 100%;
        min-width: 0;
        padding: 1rem;
        // margin: 0 1rem 1rem;
        border-radius: .5rem;
        background-color: var(--xj-articleCard-bgcolor);
        word-wrap: break-word;
        a {
            text-decoration: none;
        }
        a:link {
            color: var(--a-color);
        }
        a:visited {
            color: var(--a-color);
        }
        a:hover {
            color:  var(--xjie-theme-color);
        }
        a:active {
            color:  var(--xjie-theme-color);
        }
        @media screen and (max-width: 640px) {
            margin-bottom: 1rem;
        }
        .articleCard-title {
            font-size: 1.5rem;
            font-weight: bold;
            margin-bottom: .2rem;
        }
    }
}
.bgimage {
    width: 100%;
    height: 100%;
    z-index: -1;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
.bgimage-fixed {
    position: fixed;
    top: 0;
    left: 0;
}
.bgimage-absolute {
    position: absolute;
    inset: 0;
}
</style>