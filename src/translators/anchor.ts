/**
 * @fileoverview Anchor element translator
 */

//Imports
import {Translator} from '../types';

//Export
export default {
  inline: false,
  tags: [
    'A'
  ],
  translate: element =>
  {
    //Ensure the anchor has a hypertext reference
    if (!element.hasAttribute('href'))
    {
      throw new Error('Anchor element must provide a hypertext reference (href)!');
    }

    //Get href
    const href = element.getAttribute('href')!;

    //Get name
    const name = element.structuredText;

    //Generate markdown
    let markdown: string;

    //URL-only anchors
    if (name.length == 0)
    {
      markdown = `[${href}](${href})`;
    }
    //Named anchors
    else
    {
      markdown = `[${name}](${href})`;
    }

    return {
      markdown
    };
  }
} as Translator;