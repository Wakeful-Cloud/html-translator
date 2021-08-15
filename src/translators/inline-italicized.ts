/**
 * @fileoverview Inline-style italicized element translator
 */

//Imports
import {Translator} from '../types';
import translate from '../translate';

//Export
export default {
  inline: true,
  tags: [
    'CITE',
    'DFN',
    'EM',
    'I',
    'SMALL'
  ],
  translate: element =>
  {
    //Translate children
    const {markdown, images} = translate(element, true);

    return {
      markdown: `*${markdown}*`,
      images
    };
  }
} as Translator;