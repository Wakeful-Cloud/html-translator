/**
 * @fileoverview Ordered list element translator
 */

//Imports
import {NodeType} from 'node-html-parser';
import {Translator} from '../types';

//Export
export default {
  inline: false,
  tags: [
    'OL'
  ],
  translate: element =>
  {
    //Generate markdown
    let markdown = '';

    //Iterate over children
    let index = 1;
    for (const child of element.childNodes)
    {
      //Only translate element nodes
      if (child.nodeType == NodeType.ELEMENT_NODE)
      {
        //Add the child
        markdown += `${index}. ${child.text}\n`;

        //Advance the index
        index++;
      }
    }

    //Remove trailing whitespace
    markdown = markdown.trimRight();

    return {
      markdown
    };
  }
} as Translator;