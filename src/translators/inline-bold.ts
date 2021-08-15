/**
 * @fileoverview Inline-style bold element translator
 */

//Imports
import {Translator} from '../types';
import translate from '../translate';

//Export
export default {
  inline: true,
  tags: [
    'B',
    'DT',
    'MARK',
    'STRONG'
  ],
  translate: element =>
  {
    //Translate children
    const {markdown, images} = translate(element, true);

    return {
      markdown: `**${markdown}**`,
      images
    };
  }
} as Translator;