/*
 * @coding: UTF-8
 * @Author: AwAjie
 * @Date: 2024-12-07 20:47:56
 */
import { library, config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import {
  faBold,
  faItalic,
  faUnderline,
  faStrikethrough
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faBilibili } from "@fortawesome/free-brands-svg-icons";

config.autoAddCss = false;

export default defineNuxtPlugin((nuxtApp: any) => {

  library.add(
    faBold,
    faItalic,
    faUnderline,
    faStrikethrough,
    faGithub,
    faBilibili,
  );

  nuxtApp.vueApp.component("font-awesome-icon", FontAwesomeIcon);
});
