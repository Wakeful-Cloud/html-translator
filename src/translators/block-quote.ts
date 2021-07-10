/**
 * @fileoverview Block-style quote element translator
 */

//Imports
import {Translator} from '../types';

//Export
export default {
  inline: false,
  tags: [
    'BLOCKQUOTE'
  ],
  translate: element =>
  {
    //Generate markdown
    let markdown = element.text;

    //Prepend each line with "> "
    markdown = markdown.split(/[\r\n]{1,2}/)
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .map(line => `> ${line}`)
    .join('\n');

    //Add citation
    if (element.hasAttribute('cite'))
    {
      markdown += `\n[Source](${element.getAttribute('cite')})`;
    }

    return {
      markdown
    };
  }
} as Translator;