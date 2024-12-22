/*
 * @coding: UTF-8
 * @Author: AwAjie
 * @Date: 2024-10-20 19:55:56
 */
import * as yaml from 'js-yaml';  
  
function mdHeaderSeo(inputString: string): [any, string] | [null, string] {  
    const regex = /---([\s\S]*?)---/;  
    const match = inputString.match(regex);  
  
    if (match) {  
        const yamlText = match[1].trim();  
        const remainingText = inputString.replace(match[0], '').trim();  
  
        try {  
            const parsedYaml = yaml.load(yamlText) as any;  
            return [parsedYaml, remainingText];  
        } catch (e) {  
            // Handle YAML parsing errors  
            console.error('Error parsing YAML:', e);  
            return [null, inputString];  
        }  
    } else {  
        return [null, inputString];  
    }  
}  
  
export default mdHeaderSeo;