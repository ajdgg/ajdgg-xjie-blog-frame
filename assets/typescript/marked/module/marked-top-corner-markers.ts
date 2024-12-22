/*
 * @coding: UTF-8
 * @Author: AwAjie
 * @Date: 2024-11-05 18:47:59
 */
const TopCornerMarkers = {  
    name: 'TopCornerMarkers',  
    level: 'inline',
    start(src: string) {
      return src.match(/:[^:\n]/)?.index;  
    },  
    tokenizer(src: string, tokens: any[]) {  
      const rule = /(?<!\\)\^[^\n\\^]*\^/g;  
      const match = rule.exec(src);
      
      if (match) {
        const endIndex = src.indexOf(`^`, match.index) + `^`.length;
  
        if (endIndex === -1) {
          throw new Error(`Unclosed block`);
        }

        const token = {
          type: 'TopCornerMarkers',
          raw: match.input,
          text: match[0].slice(1, -1).trim(),
          tokens: []
        };

        src = src.slice(endIndex);

        return token;
      }
    },   
    renderer(token: any) {
        return `${token.raw.replace(/(?<!\\)\^[^\n\\^]*\^/, `<sup>${token.text}</sup>`).replace(/\\\^([^\n]*)\^/g, '^$1^').replace(/\n/g, '<br>')}`;
    }
  };

export default TopCornerMarkers