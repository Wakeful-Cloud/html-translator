/**
 * @fileoverview Inline-style quote element translator
 */

//Imports
import {Translator} from '../types';
import translate from '../translate';

//Export
export default {
  inline: true,
  tags: [
    'Q'
  ],
  translate: element =>
  {
    //Translate children
    let {markdown, images} = translate(element, true);

    //Wrap in inline code
    markdown = `\`${markdown}\``;

    //Add citation
    if (element.hasAttribute('cite'))
    {
      markdown += ` ([Source](${element.getAttribute('cite')}))`;
    }

    //Trim whitespace
    markdown = markdown.trim();

    return {
      markdown,
      images
    };
  }
} as Translator;