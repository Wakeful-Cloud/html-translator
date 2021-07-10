/**
 * @fileoverview Block-style bold element translator
 */

//Imports
import {Translator} from '../types';

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
  translate: element => ({
    markdown: `**${element.structuredText}**`
  })
} as Translator;