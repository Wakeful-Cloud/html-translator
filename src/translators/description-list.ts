/**
 * @fileoverview Description list element translator
 */

//Imports
import {HTMLElement, NodeType} from 'node-html-parser';
import {Translator} from '../types';

//Export
export default {
  inline: false,
  tags: [
    'DL'
  ],
  translate: element =>
  {
    //Generate markdown
    let markdown = '';

    //Iterate over children
    for (const child of element.childNodes)
    {
      //Only translate element nodes
      if (child.nodeType == NodeType.ELEMENT_NODE)
      {
        //Term
        if ((child as HTMLElement).tagName == 'DT')
        {
          //Add the term
          markdown += `**${child.text}**\n`;
        }
        //Details
        else
        {
          //Add the term
          markdown += `> ${child.text}\n`;
        }
      }
    }

    //Remove trailing whitespace
    markdown = markdown.trimRight();

    return {
      markdown
    };
  }
} as Translator;