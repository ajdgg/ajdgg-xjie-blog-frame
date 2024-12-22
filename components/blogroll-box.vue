<!--
 * @coding: UTF-8
 * @Author: AwAjie
 * @Date: 2024-12-12 21:19:31
-->
<script setup>
const { $xjieConfig } = useNuxtApp();
// const xjieConfig = $xjieConfig;
</script>

<template>
    <div class="xjie-personal-card" id="xjiePersonalCard">
        <img class="xjie-personal-card-icon" :src="$xjieConfig.infoBox.icon" alt="头像" />
        <div class="xjie-content-title">{{ $xjieConfig.infoBox.title }}</div>
        <div class="xjie-content">{{ $xjieConfig.infoBox.content }}</div>
        <div class="index-icon-set">
            <ClientOnly>
                <a href="https://github.com/ajdgg" aria-label="GitHub" data-balloon-pos="up">
                    <font-awesome-icon style="font-size: 18px; width: 18px;" icon="fa-brands fa-github" />
                </a>
                <a href="https://space.bilibili.com/3493108528449750?spm_id_from=333.1007.0.0" aria-label="Biliili"
                    data-balloon-pos="up">
                    <font-awesome-icon style="font-size: 18px; width: 18px;" icon="fa-brands   fa-bilibili" />
                </a>
                <a href="mailto:awesomeajie@qq.com" aria-label="e-mail" data-balloon-pos="up">
                    <font-awesome-icon style="font-size: 18px; width: 18px;" icon="fa-solid fa-envelope" />
                </a>
            </ClientOnly>
        </div>
    </div>
</template>

<style scoped lang="scss">
.xjie-personal-card {
    display: flex;
    position: initial;
    flex-direction: column;
    text-align: center;
    border-radius: 6px;
    transition: all 0.3s;
    width: 100%;
    max-width: 240px;
    background-color: var(--xj-blogroll-bgcolor);
    .xjie-personal-card-icon {
        display: block;
        border-radius: 50%;
        width: 5rem;
        height: 5rem;
        margin: 2rem auto 0;

        @media screen and (max-width: 1200px) {
            width: 4rem;
            height: 4rem;
        }
    }
    .xjie-content-title {
        font-size: 1.5rem;
        font-weight: bold;
        margin: .2rem 0;
    }
    .xjie-content {
        margin: .2rem 0;
    }
    .index-icon-set {
        margin: 10px 0;
        a {
            margin: 3px;
        }
    }
    @media screen and (min-width: 1200px) {
        background-color: var(--xj-blogroll-bgcolor);
    }

    @media screen and (max-width: 1199px) {
        position: fixed;
        top: 60px;
        right: -100%;
        width: 100%;
        max-width: 500px;
        // background-color: getTheme(blogger-info-bgcolor);
    }
}
// .index-main-content {
//     padding: 10px;
//     border-radius: 6px;
//     overflow: auto;
//     flex: 1;
// }

// .xjie-personal-card-f {
//     position: sticky;
//     top: 70px;
//     width: 300px;
//     margin-left: 12px;
//     height: fit-content;
//     max-height: calc(100vh - 110px);

//     .xjie-content-name {
//         margin: 10px 0;
//     }

//     @media (max-width: 1200px) {
//         position: fixed;
//         width: 0;
//     }
// }

// .xjie-personal-card.active-right {
//     right: 0;
// }
</style>