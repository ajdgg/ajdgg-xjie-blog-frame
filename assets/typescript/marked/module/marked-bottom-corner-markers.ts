/*
 * @coding: UTF-8
 * @Author: AwAjie
 * @Date: 2024-11-05 18:47:59
 */

const BottomCornerMarkers = {  
    name: 'BottomCornerMarkers',  
    level: 'inline',
    start(src: string) {
      return src.match(/:[&:\n]/)?.index;  
    },  
    tokenizer(src: string, tokens: any[]) {  
      const rule =/(?<!\\)&.*?&/g;
      const match = rule.exec(src);
      
      if (match) {
        const endIndex = src.indexOf(`&`, match.index) + `&`.length;
  
        if (endIndex === -1) {
          throw new Error(`Unclosed block`);
        }

        const token = {
          type: 'BottomCornerMarkers',
          raw: match.input,
          text: match[0].slice(1, -1).trim(),
          tokens: []
        };

        src = src.slice(endIndex);

        return token;
      }
    },   
    renderer(token: any) {
      return `${token.raw.replace(/(?<!\\)&.*?&/, `<sub>${token.text}</sub>`).replace(/(?<!\\)&.*?&/, `<sub>${token.text}</sub>`).replace(/b\\&2&/g, 'b&2&').replace(/\n/g, '<br>')}`;
    }
  };

export default BottomCornerMarkers