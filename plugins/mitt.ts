/*
 * @coding: UTF-8
 * @Author: AwAjie
 * @Date: 2024-08-30 13:04:40
 */
import mitt from 'mitt';
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      mitt: mitt()
    }
  }
})
