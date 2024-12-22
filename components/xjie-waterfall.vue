<!--
 * @coding: UTF-8
 * @Author: AwAjie
 * @Date: 2024-12-19 20:28:33
-->
<script lang="ts" setup>
import { debounce } from "~/assets/typescript/debounce";
import { defineProps } from 'vue';

interface Item {
    x_id?: string;
    title?: string;
    _path?: string;
    introduce?: string;
    CreationTime?: string;
    ModifyTime?: string;
    classify?: any[];
    tags?: any[];
}
// interface WaterfallConfig {
//     // 瀑布流配置
//     column?: {
//         [key: string]: any;
//     };
//     gap?: number;
// }

const props = defineProps({
    data: {
        type: Array as () => Item[],
        default: () => []
    },
})

const columnCount = ref(1);
const columnWidth = ref(0);
const columnHeights = ref<number[]>([]);

function layout() {
    const windowWidth = window.innerWidth;
    const element = document.getElementById('xjie-waterfall');
    const Width = element?.offsetWidth;
    console.log(Width);
    const e = document.querySelector('.xjie-waterfall');
    const f = e?.querySelectorAll(':scope > *');
    if (!f || !Width) return;

    if (Width > 1200) {
        columnCount.value = 3;
    } else if (Width > 640 && Width <= 1200) {
        columnCount.value = 2;
    } else {
        columnCount.value = 1;
    }

    if (windowWidth >= 640) {
        element.style.opacity = '0';
        console.log('>640');
        console.log(columnCount.value);
        columnWidth.value = (Width + 20 * (columnCount.value - 1)) / columnCount.value;
        console.log(columnWidth.value);
        columnHeights.value = Array.from({ length: columnCount.value }, () => 0);

        f.forEach((child, index) => {
            const columnIndex = columnHeights.value.indexOf(Math.min(...columnHeights.value));
            const gap = 20;
            const columnSpacing = columnWidth.value;
            (child as HTMLElement).style.width = columnWidth.value - 50 + 'px';
            (child as HTMLElement).style.position = 'absolute';
            (child as HTMLElement).style.left = (columnIndex === 0 ? 0 : columnIndex * columnSpacing) + 'px';
            (child as HTMLElement).style.top = columnHeights.value[columnIndex] + 'px';

            columnHeights.value[columnIndex] += (child as HTMLElement).offsetHeight + gap;
        });

        element.style.position = 'relative';
        element.style.height = Math.max(...columnHeights.value) + 'px';
        element.style.opacity = '1';
    } else {
        console.log('No children found');
        f.forEach((child, index) => {
            (child as HTMLElement).style.width = "";
            (child as HTMLElement).style.position = "";
            (child as HTMLElement).style.left = "";
            (child as HTMLElement).style.top = "";
        });
        element.style.position = "";
        element.style.height = "auto";
    }
}

const debouncedLayout = debounce(layout, 100);

onMounted(() => {
    layout();
    window.addEventListener('resize', debouncedLayout);
});

onUnmounted(() => {
    window.removeEventListener('resize', debouncedLayout);
});
</script>

<template>
    <div id="xjie-waterfall" class="xjie-waterfall">
        <slot v-for="itme in data" :key="itme?.x_id" name="default" :dataK="itme"></slot>
    </div>
</template>

<style lang="scss" scoped>
.xjie-waterfall {
    display: flex;
    flex-wrap: wrap;
    align-items: self-start;
}
</style>