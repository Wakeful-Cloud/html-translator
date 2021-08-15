/**
 * @fileoverview Block-style bold element translator
 */

//Imports
import {Translator} from '../types';
import translate from '../translate';

//Export
export default {
  inline: false,
  tags: [
    'H1',
    'H2',
    'H3',
    'H4',
    'H5',
    'H6'
  ],
  translate: element => {
    //Translate children
    const {markdown, images} = translate(element, true);

    return {
      markdown: `**${markdown}**`,
      images
    };
  }
} as Translator;