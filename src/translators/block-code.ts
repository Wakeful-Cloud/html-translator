/**
 * @fileoverview Block-style code element translator
 */

//Imports
import parse, {HTMLElement, NodeType} from "node-html-parser";
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
    let code = element.text;
    let language = '';

    //Update language with parent lang
    if (element.hasAttribute('lang'))
    {
      language = element.getAttribute('lang')!;
    }

    //Re-parse to catch nested code elements
    const html = parse(element.text);

    //Nested code
    for (const child of html.childNodes)
    {
      if (child.nodeType == NodeType.ELEMENT_NODE &&
        (child as HTMLElement).tagName == 'CODE'
      )
      {
        //Update code
        code = child.text;

        //Update language with child lang
        if ((child as HTMLElement).hasAttribute('lang'))
        {
          language = (child as HTMLElement).getAttribute('lang')!;
        }
      }
    }

    //Trim code
    code = code.trim();

    return {
      markdown: `\`\`\`${language}\n${code}\n\`\`\``
    };
  }
} as Translator;