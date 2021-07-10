/**
 * @fileoverview Inline-style italicized element translator
 */

//Imports
import {Translator} from '../types';

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
  translate: element => ({
    markdown: `*${element.structuredText}*`
  })
} as Translator;