<!--
 * @coding: UTF-8
 * @Author: AwAjie
 * @Date: 2024-12-07 20:49:21
-->
<script lang="ts" setup>
const { $xjieConfig } = useNuxtApp();
const { $mitt } = useNuxtApp();
// const xjieConfig: XjieConfigType = $xjieConfig as XjieConfigType;
// -----------------------------------------------------------------
// 设置l或d的icon
// -----------------------------------------------------------------
let themeIcon = ref<string>();
($mitt as any).on('theme-switched', () => {
    setTimeout(()=>{
        if ($xjieConfig?.header?.icon) {
            themeIcon.value = document.documentElement.dataset.theme === 'light' ? 
            $xjieConfig.header.icon || '' : 
            $xjieConfig.header.iconDark || $xjieConfig.header.icon;
        }
    },0)
})
</script>
<template>
    <header class="xj-header">
        <nav class="xj-header-nav">
            <div>
                <NuxtLink to="/" class="xj-header-navs-i-t">
                    <img v-if="$xjieConfig?.header?.icon" :src="themeIcon" alt="icon" title="icon">
                    <div title="icon-name">{{ $xjieConfig?.header?.text }}</div>
                </NuxtLink>
            </div>
            <div class="xj-header-nav-t-btn">
                <theme-handover-button></theme-handover-button>
            </div>
            <div class="xj-hamburger">
                <span  class="bar"></span>
                <span  class="bar"></span>
                <span  class="bar"></span>
            </div>
        </nav>
    </header>
</template>

<style lang="scss" scoped>
.xj-header {
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    right: 0;
    background: var(--xj-header-bgcolor);
    .xj-header-nav {
        display: flex;
        max-width: 1700px;
        min-height: var(--xj-nav-minheight);
        align-items: center;
        margin: .5rem auto;
        .xj-header-navs-i-t {
            display: flex;
            margin-left: 50px;
            text-decoration: none;
            &:link {
                color: slategray;
            }
            &:visited {
                color: slategray;
            }
            &:hover {
                color:  var(--xjie-theme-color);
            }
            &:active {
                color:  var(--xjie-theme-color);
            }
            img {
                width: 2.5rem;
                height: 2.5rem;
            }
            div[title="icon-name"] {
                margin: 0 .3rem;
                font-size: 2rem;
                font-weight: bold;
            }
            // &:active {
            //     color: slategray;
            // }
            // &:visited {
            //     color: slategray;
            // }
        }
        .xj-header-nav-t-btn {
            margin-left: auto;
            margin-right: 60px;
        }
        .xj-hamburger {
            display: none;
            .bar {
                display: block;
                width: 16px;
                height: 2px;
                margin: 2px 0;
                transition: all 0.3s ease-in-out;
                background-color: var(--xj-navbar-icon-bgcolor);
            }
            @media screen and (max-width: 1199px) {
                & {
                    cursor: pointer;
                    width: 25px;
                    height: 25px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }
            }
        }
    }
}
</style>