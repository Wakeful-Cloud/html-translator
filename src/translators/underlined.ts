/**
 * @fileoverview Underlined text element translator
 */

//Imports
import {Translator} from '../types';

//Export
export default {
  inline: true,
  tags: [
    'INS',
    'U'
  ],
  translate: element => ({
    markdown: `__${element.structuredText}__`
  })
} as Translator;