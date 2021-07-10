/**
 * @fileoverview Abbreviation element translator
 */

//Imports
import {Translator} from '../types';

//Export
export default {
  inline: true,
  tags: [
    'ABBR'
  ],
  translate: element =>
  {
    //Generate markdown
    let markdown = element.structuredText;

    //Add title
    if (element.hasAttribute('title'))
    {
      markdown += ` (${element.getAttribute('title')})`;
    }

    return {
      markdown
    };
  }
} as Translator;