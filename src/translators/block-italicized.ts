/**
 * @fileoverview Block-style italicized element translator
 */

//Imports
import {Translator} from '../types';

//Export
export default {
  inline: true,
  tags: [
    'ADDRESS',
    'FIGCAPTION'
  ],
  translate: element => ({
    markdown: `*${element.structuredText}*`
  })
} as Translator;