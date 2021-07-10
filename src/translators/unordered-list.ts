/**
 * @fileoverview Unordered list element translator
 */

//Imports
import {NodeType} from 'node-html-parser';
import {Translator} from '../types';

//Export
export default {
  inline: false,
  tags: [
    'UL'
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
        //Add the child
        markdown += `• ${child.text}\n`;
      }
    }

    //Remove trailing whitespace
    markdown = markdown.trimRight();

    return {
      markdown
    };
  }
} as Translator;