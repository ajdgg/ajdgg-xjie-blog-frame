/*
 * @coding: UTF-8
 * @Author: AwAjie
 * @Date: 2024-12-07 00:01:37
 */
export interface XjieConfigType {
    title: string | null;
    docsPath: string | null;
    icon?: string | null;
    themeColors: string | null;
    index: {
        name: string | null;
        bgimage: string | null;
        bgFixed: boolean | null;
        titleColor: string | null;
        MainTitle: string | null;
        subheading: string | null;
        waterfall: boolean | null;
    } | null;
    header: {
        icon: string | null;
        iconDark: string | null;
        text: string | null;
    } | null;
    infoBox: {
        left: boolean | null;
        title: string | null;
        content: string | null;
        icon: string | null;
    } | null;
    server: {
        indexPX: number | null;
    } | null;
}