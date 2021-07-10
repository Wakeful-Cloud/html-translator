/**
 * @fileoverview Deleted text element translator
 */

//Imports
import {Translator} from '../types';

//Export
export default {
  inline: true,
  tags: [
    'DEL'
  ],
  translate: element => ({
    markdown: `~~${element.structuredText}~~`
  })
} as Translator;