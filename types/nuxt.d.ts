import { Emitter } from 'mitt';

declare module '#app' {
    interface NuxtApp {
        $mitt: Emitter;
    }
}