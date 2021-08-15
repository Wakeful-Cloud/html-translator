/**
 * @fileoverview Underlined text element translator
 */

//Imports
import {Translator} from '../types';
import translate from '../translate';

//Export
export default {
  inline: true,
  tags: [
    'INS',
    'U'
  ],
  translate: element =>
  {
    //Translate children
    const {markdown, images} = translate(element, true);

    return {
      markdown: `__${markdown}__`,
      images
    };
  }
} as Translator;