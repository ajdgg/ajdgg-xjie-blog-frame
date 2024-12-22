/*
 * @coding: UTF-8
 * @Author: AwAjie
 * @Date: 2024-09-20 10:49:00const rule = /\[!([^\[\]]*)\]/;  
 */
// 自定义 NOTE 扩展
import { marked } from 'marked';

const typeMapping: TypeMapping = {
  注意: 'NOTE',
  错误: 'ERROR',
  警告: 'WARNING',
  信息: 'INFO',
  提示: 'TIP',
};

interface TypeMapping {
  注意: string;
  错误: string;
  警告: string;
  信息: string;
  提示: string;
  [key: string]: string;
}

const alert = {
  info: "alert-info",
  note: "alert-primary",
  error: "alert-danger",
  warning: "alert-warning",
  tip: "alert-success",
}

const noteExtension = {
  name: 'note',
  level: 'block',
  start(src: string) {
    return src.match(/^\[!(NOTE|ERROR|WARNING|INFO|TIP|注意|错误|警告|信息|提示)\]\s*$/i)?.index || null;
  },
  tokenizer(src: string, tokens: any[]) {
    const rule = /^\[!(NOTE|ERROR|WARNING|INFO|TIP|注意|错误|警告|信息|提示)\]\s*([\s\S]*?)(?=\n\[!\/\1\]\n|\n{2,}|$)/i;
    const match = rule.exec(src);

    if (match) {
      const type = match[1].toUpperCase();
      const endIndex = src.indexOf(`\n[!/${type}]\n`, match.index) + `\n[!/${type}]\n`.length;

      if (endIndex === -1) {
        throw new Error(`Unclosed ${type} block`);
      }

      const content = match[2].trim().replace(/\[!\/[^\]]*\]/g, '');

      const token = {
        type: 'note',
        raw: `[!${type}]\n${content}\n[!/${type}]`,
        text: content,
        tokens: [],
        subtype: type
      };

      // 移除已处理的部分
      src = src.slice(endIndex);

      return token;
    }

    return null;
  },
  renderer(token: any) {
    const classes = [];
    if (token.subtype) {
      const subtype = token.subtype.toLowerCase();
      // 使用映射表将中文类型映射到英文类型
      const mappedType = typeMapping[subtype as keyof TypeMapping];
      if (mappedType) {
        classes.push(mappedType.toLowerCase());
      } else {
        classes.push(subtype);
      }
    } else {
      classes.push('note');
    }
    const className: string = classes.join(' ') as string;
    const alertClass = alert[className as keyof typeof alert] || alert['note'];

    return `<aside class="alert ${alertClass}">${marked.parseInline(token.text)}</aside>`;
  }
};

export default noteExtension;
