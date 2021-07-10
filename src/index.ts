/**
 * @fileoverview HTML translator
 */

//Imports
import {HTMLElement, NodeType, parse} from 'node-html-parser';
import {Image} from './types';

import abbreviation from './translators/abbreviation';
import anchor from './translators/anchor';
import blockBold from './translators/block-bold';
import blockCode from './translators/block-code';
import blockItalicized from './translators/block-italicized';
import blockPlain from './translators/block-plain';
import blockQuote from './translators/block-quote';
import deleted from './translators/deleted';
import descriptionList from './translators/description-list';
import image from './translators/image';
import inlineBold from './translators/inline-bold';
import inlineCode from './translators/inline-code';
import inlineItalicized from './translators/inline-italicized';
import inlinePlain from './translators/inline-plain';
import inlineQuote from './translators/inline-quote';
import lineBreak from './translators/line-break';
import orderedList from './translators/ordered-list';
import table from './translators/table';
import underlined from './translators/underlined';
import unorderedList from './translators/unordered-list';

//All translators
const translators = [
  abbreviation,
  anchor,
  blockBold,
  blockCode,
  blockItalicized,
  blockPlain,
  blockQuote,
  deleted,
  descriptionList,
  image,
  inlineBold,
  inlineCode,
  inlineItalicized,
  inlinePlain,
  inlineQuote,
  lineBreak,
  orderedList,
  table,
  underlined,
  unorderedList
];

//Regex to test if a string ends in a new line
const endNewline = /[\r\n]{1,2}?$/;

//Regex to test if a string ends in whitespace
const endWhitespace = /\s$/;

/**
 * Translate an HTML element to Discord flavored markdown
 * @param element HTML element
 * @returns Discord flavored markdown, images
 */
const translate = (element: HTMLElement): [string, Image[]] =>
{
  let markdown = '';
  const images: Image[] = [];

  //Iterate over children
  for (const node of element.childNodes)
  {
    //Translate element nodes
    if (node.nodeType == NodeType.ELEMENT_NODE)
    {
      //Cast
      const child = node as HTMLElement;

      //Find the correct translator
      const translator = translators.find(translator => translator.tags.includes(child.tagName));

      //Translate the element
      if (translator != null)
      {
        const result = translator.translate(child);

        //Add results
        if (result.markdown != null)
        {
          //Inline-style elements
          if (translator.inline)
          {
            //Add a leading space if the previous element didn't edit with whitespace
            if (!endWhitespace.test(markdown))
            {
              markdown += ' ';
            }

            markdown += result.markdown;
          }
          //Block-style elements
          else
          {
            //Add a leading new line if the previous element didn't end with one
            if (!endNewline.test(markdown))
            {
              markdown += '\n';
            }

            //Add markdown
            markdown += result.markdown;

            //Add a trailing new line if the element didn't end with one
            if (!endNewline.test(markdown))
            {
              markdown += '\n';
            }
          }
        }

        if (result.image != null)
        {
          images.push(result.image);
        }
      }
      else
      {
        //Recur
        const result = translate(child);

        //Add results
        markdown += result[0];
        images.push(...result[1]);
      }
    }
  }

  return [markdown, images];
};

/**
 * Translate raw HTML to Discord flavored markdown
 * @param raw Raw HTML
 * @returns Discord flavored markdown, images
 */
export default (raw: string): [string, Image[]] =>
{
  //Parse the HTML
  const root = parse(raw);

  //Translate
  const [markdown, images] = translate(root);

  //Trim markdown
  return [markdown.trim(), images];
};