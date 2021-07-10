/**
 * @fileoverview Inline-style quote element translator
 */

//Imports
import {Translator} from '../types';

//Export
export default {
  inline: true,
  tags: [
    'Q'
  ],
  translate: element =>
  {
    //Generate markdown
    let markdown = element.structuredText;

    //Trim whitespace
    markdown = markdown.trim();

    //Wrap in inline code
    markdown = `\`${markdown}\``;

    //Add citation
    if (element.hasAttribute('cite'))
    {
      markdown += ` ([Source](${element.getAttribute('cite')}))`;
    }

    return {
      markdown
    };
  }
} as Translator;