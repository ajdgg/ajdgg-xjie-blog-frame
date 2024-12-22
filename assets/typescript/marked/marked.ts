import { marked } from 'marked';
import noteExtension from '~/assets/typescript/marked/module/marked-extend-o';
import mdHeaderSeo from '~/assets/typescript/marked/module/marked-header-seo';
import TopCornerMarkers from '~/assets/typescript/marked/module/marked-top-corner-markers';
import BottomCornerMarkers from '~/assets/typescript/marked/module/marked-bottom-corner-markers';

marked.use({ extensions: [noteExtension] });
marked.use({ extensions: [TopCornerMarkers] });
marked.use({ extensions: [BottomCornerMarkers] });

export default marked;