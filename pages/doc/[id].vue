<script lang="ts" setup>
const route = useRoute()
</script>
<template>
<main class="xj-doc-main">
    {{ route.params.id  }}
</main>
</template>

<style lang="scss" scoped>
.xj-doc-main {
    margin-top: 5rem;
}
</style>