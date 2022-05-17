/**
 * @fileoverview Anchor element translator
 */

//Imports
import {Translator} from '../types';
import translate from '../translate';

//Export
export default {
  inline: true,
  tags: [
    'A'
  ],
  translate: element =>
  {
    //Translate children
    let {markdown, images} = translate(element, true);

    //Ensure the anchor has a hypertext reference
    if (!element.hasAttribute('href'))
    {
      throw new Error('Anchor element must provide a hypertext reference (href)!');
    }

    //Get href
    const href = element.getAttribute('href')!;

    //URL-only anchors
    if (markdown.length == 0)
    {
      markdown = `[${href}](${href})`;
    }
    //Named anchors
    else
    {
      markdown = `[${markdown}](${href})`;
    }

    return {
      markdown,
      images
    };
  }
} as Translator;