/*
 * @coding: UTF-8
 * @Author: AwAjie
 * @Date: 2024-12-23 19:11:59
 */
import { debounce } from '~/assets/typescript/debounce';

function isElementHalfOrFullyOutOfViewport(el: HTMLElement): boolean {
    const rect = el.getBoundingClientRect();
    const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
    const windowWidth = (window.innerWidth || document.documentElement.clientWidth);
    const isFullyOutOfViewport = (rect.bottom < 0 || rect.top > windowHeight) || (rect.right < 0 || rect.left > windowWidth);
    const isHalfOutOfViewport = (rect.bottom < windowHeight / 2 || rect.top > windowHeight / 2) || (rect.right < windowWidth / 2 || rect.left > windowWidth / 2);
    return isFullyOutOfViewport || isHalfOutOfViewport;
}

let observerMap = new WeakMap<HTMLDivElement, IntersectionObserver>();
// 首页背景模糊的监听函数 by awajie
export function esl(element: HTMLDivElement, callback: (whether: boolean) => void) {
    if (!element) return;
    if (observerMap.has(element)) {
        return;
    }
    if ('IntersectionObserver' in window &&
        'IntersectionObserverEntry' in window &&
        'intersectionRatio' in window.IntersectionObserverEntry.prototype) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                callback(entry.intersectionRatio < 0.5);
            });
        }, { threshold: [0.5] });
        observerMap.set(element, observer);
        observer.observe(element);
    } else {
        window.addEventListener('scroll', debounce(() => {
            callback(isElementHalfOrFullyOutOfViewport(element));
        }, 10));
    };
}

export function unobserveElement(element: HTMLDivElement) {
    const observer = observerMap.get(element);
    if (observer) {
        observer.unobserve(element);
        observerMap.delete(element);
    };
    window.removeEventListener('scroll', () => {});
};