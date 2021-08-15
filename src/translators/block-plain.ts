/**
 * @fileoverview Block-style plain text element translator
 */

//Imports
import {Translator} from '../types';
import translate from '../translate';

//Export
export default {
  inline: false,
  tags: [
    'P'
  ],
  translate: element =>
  {
    //Translate children
    let {markdown, images} = translate(element, true);

    //Trim whitespace
    markdown = markdown.trim();

    return {
      markdown,
      images
    }
  }
} as Translator;