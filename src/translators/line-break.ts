/**
 * @fileoverview Line break element translator
 */

//Imports
import {Translator} from '../types';

//Export
export default {
  inline: true,
  tags: [
    'BR',
    'HR'
  ],
  translate: _ => ({
    markdown: '\n'
  })
} as Translator;