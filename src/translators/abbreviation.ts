/**
 * @fileoverview Abbreviation element translator
 */

//Imports
import {Translator} from '../types';
import translate from '../translate';

//Export
export default {
  inline: true,
  tags: [
    'ABBR'
  ],
  translate: element =>
  {
    //Translate children
    let {markdown, images} = translate(element, true);

    //Add title
    if (element.hasAttribute('title'))
    {
      markdown = `${markdown} (${element.getAttribute('title')})`;
    }

    return {
      markdown,
      images
    };
  }
} as Translator;