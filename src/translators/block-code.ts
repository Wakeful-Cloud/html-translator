/**
 * @fileoverview Block-style code element translator
 */

//Imports
import {HTMLElement, NodeType} from 'node-html-parser';
import {Translator} from '../types';

//Export
export default {
  inline: false,
  tags: [
    'PRE'
  ],
  translate: element =>
  {
    //Data
    const code = element.text;
    let language = '';

    //Update language with parent lang
    if (element.hasAttribute('lang'))
    {
      language = element.getAttribute('lang')!;
    }

    //Nested code
    for (const child of element.childNodes)
    {
      if (child.nodeType == NodeType.ELEMENT_NODE && (child as HTMLElement).tagName == 'CODE')
      {
        //Update language with child lang
        if ((child as HTMLElement).hasAttribute('lang'))
        {
          language = (child as HTMLElement).getAttribute('lang')!;
        }
      }
    }

    return {
      markdown: `\`\`\`${language}\n${code.trim()}\n\`\`\``
    };
  }
} as Translator;