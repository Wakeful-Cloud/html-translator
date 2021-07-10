/**
 * @fileoverview Inline-style code element translator
 */

//Imports
import {Translator} from '../types';

//Export
export default {
  inline: true,
  tags: [
    'CODE',
    'KBD',
    'SAMP',
    'VAR'
  ],
  translate: element => ({
    markdown: `\`${element.structuredText}\``
  })
} as Translator;