/**
 * @fileoverview Description list element translator
 */

//Imports
import {HTMLElement, NodeType} from 'node-html-parser';
import {Image, Translator} from '../types';
import translate from '../translate';

//Export
export default {
  inline: false,
  tags: [
    'DL'
  ],
  translate: element =>
  {
    //Generate content
    let markdown = '';
    const images = [] as Image[];

    //Iterate over children
    for (const child of element.childNodes)
    {
      //Only translate element nodes
      if (child.nodeType == NodeType.ELEMENT_NODE)
      {
        //Translate the child
        const {markdown: childMarkdown, images: childImages} = translate(child as HTMLElement, true);

        //Term
        if ((child as HTMLElement).tagName == 'DT')
        {
          //Add the term
          markdown += `**${childMarkdown}**\n`;
        }
        //Details
        else
        {
          //Add the term
          markdown += `> ${childMarkdown}\n`;
        }

        //Add images
        images.push(...childImages);
      }
    }

    //Remove trailing whitespace
    markdown = markdown.trimRight();

    return {
      markdown,
      images
    };
  }
} as Translator;