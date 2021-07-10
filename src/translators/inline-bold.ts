/**
 * @fileoverview Inline-style bold element translator
 */

//Imports
import {Translator} from '../types';

//Export
export default {
  inline: true,
  tags: [
    'B',
    'DT',
    'MARK',
    'STRONG'
  ],
  translate: element => ({
    markdown: `**${element.structuredText}**`
  })
} as Translator;