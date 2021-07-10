/**
 * @fileoverview Inline-style plain text element translator
 */

//Imports
import {Translator} from '../types';

//Export
export default {
  inline: true,
  tags: [
    'SPAN'
  ],
  translate: element =>
  {
    //Generate markdown
    let markdown = element.structuredText;
    
    //Trim whitespace
    markdown = markdown.trim();

    return {
      markdown
    };
  }
} as Translator;