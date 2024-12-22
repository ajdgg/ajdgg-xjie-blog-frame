/*
 * @coding: UTF-8
 * @Author: AwAjie
 * @Date: 2024-12-12 15:03:24
 */
import { ref, watchEffect, onMounted, onUnmounted } from 'vue'
type Theme = 'light' | 'dark' | 'system'
const LOCAL_STORAGE_KEY = 'theme'

function setTheme(theme: Theme) {
    document.documentElement.dataset.theme = theme === 'system' && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : theme
}

export function useTheme() {
    const theme = ref<Theme>('light')

    if (process.client) {
        const savedTheme = localStorage.getItem(LOCAL_STORAGE_KEY) as Theme | undefined
        if (savedTheme) {
            theme.value = savedTheme
        }

        const prefers = matchMedia('(prefers-color-scheme: dark)')
        setTheme(theme.value)

        watchEffect(() => {
            localStorage.setItem(LOCAL_STORAGE_KEY, theme.value)
            if (theme.value === 'system') {
                setTheme(theme.value)
                prefers.addEventListener('change', () => setTheme(theme.value))
            } else {
                setTheme(theme.value)
                prefers.removeEventListener('change', () => setTheme(theme.value))
            }
        })

        onMounted(() => {
            if (theme.value === 'system') {
                prefers.addEventListener('change', () => setTheme(theme.value))
            }
        })

        onUnmounted(() => {
            prefers.removeEventListener('change', () => setTheme(theme.value))
        })
    }

    const setThemeFunction = (newTheme: Theme) => {
        if (process.client) {
            localStorage.setItem(LOCAL_STORAGE_KEY, newTheme)
            theme.value = newTheme
            setTheme(newTheme)
        }
    }

    return { theme, setTheme: setThemeFunction }
}