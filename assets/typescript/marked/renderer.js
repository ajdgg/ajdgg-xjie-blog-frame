/*
 * @coding: UTF-8
 * @Author: AwAjie
 * @Date: 2024-08-30 10:47:52
 */
// renderer.js
import { marked } from 'marked';
import hljs from 'highlight.js';

class CustomRenderer extends marked.Renderer {
  heading(headingObj, level) {
    const { text, depth } = headingObj;
    const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
    if (depth === 1) {
      return `<h${depth} id="${text}" class="hr" directory>${text}</h${depth}>`;
    } else if (depth === 2) {
      return `<h${depth} id="${text}"  directory-2>${text}</h${depth}>`;
    } else {
      return `<h${depth} id="${text}">${text}</h${depth}>`;
    }
  }

  image(dataObj) {
    return `<img src="${dataObj.href}" alt="${dataObj.alt || ''}" title="${dataObj.title || ''}" class="img-content">`;
  }

  table(dataObj) {
    const { header, align, rows } = dataObj;

    const theadContent = header.map((cell, index) => {
      const style = align[index] ? `style="text-align: ${align[index]};"` : '';
      return `<th ${style}>${cell.text}</th>`;
    }).join('');

    const tbodyContent = rows.map(row => {
      return `<tr>${row.map((cell, index) => {
        const style = align[index] ? `style="text-align: ${align[index]};"` : '';
        return `<td ${style}>${cell.text}</td>`;
      }).join('')}</tr>`;
    }).join('');

    return `<div class="md-table"><table class="custom-table">  
              <thead>  
                  <tr>${theadContent}</tr>  
              </thead>  
              <tbody>  
                  ${tbodyContent}  
              </tbody>  
              </table>
            </div>`;
  }
  code(dataObj) {
    let text = dataObj.text
    let languageSubset = [];
    languageSubset[0] = dataObj.lang || 'text';
    return `<div><pre class="666">${dataObj.lang != '' ? hljs.highlightAuto(text, languageSubset).value : hljs.highlightAuto(text).value}</pre></div>`;  
  }
  checkbox(dataObj) {
    return `<label class="cont_list_item i-flex flex-jc-center"><input type="checkbox"  class="item-checkbox" ${dataObj.checked ? 'checked' : ''} disabled /><i class="item_check_icon"></i></label>`;
  }
}

export default CustomRenderer;
