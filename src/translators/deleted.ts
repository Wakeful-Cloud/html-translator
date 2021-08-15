/**
 * @fileoverview Deleted text element translator
 */

//Imports
import translate from '../translate';
import {Translator} from '../types';

//Export
export default {
  inline: true,
  tags: [
    'DEL'
  ],
  translate: element =>
  {
    //Translate children
    const {markdown, images} = translate(element, true);

    return {
      markdown: `~~${markdown}~~`,
      images
    };
  }
} as Translator;