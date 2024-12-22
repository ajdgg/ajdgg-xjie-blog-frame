<!--
 * @coding: UTF-8
 * @Author: AwAjie
 * @Date: 2024-12-06 21:40:49
-->
<script lang="ts" setup>
import type { XjieConfigType } from '~/types/xjie.configType';
const { $xjieConfig } = useNuxtApp();
// const xjieConfig: XjieConfigType = $xjieConfig as XjieConfigType;
useHead({
  link: [
    {
      rel: 'icon',
      href: $xjieConfig.icon || "/favicon.ico",
    },
  ]
})

onMounted(() => {
  document.documentElement.style.setProperty('--xjie-theme-color', $xjieConfig.themeColors || '#409eff')
})
</script>

<template>
  <div>
    <XjieHeader />
    <NuxtPage />
  </div>
</template>

<style lang="scss" scoped>
</style>
