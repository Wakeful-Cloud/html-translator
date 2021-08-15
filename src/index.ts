/**
 * @fileoverview HTML translator
 */

//Imports
import translate from './translate';
import {TranslatorResult} from './types';
import {options} from './utils';
import {parse} from 'node-html-parser';

/**
 * Translate raw HTML to Discord flavored markdown
 * @param raw Raw HTML
 * @param plaintext Whether or not to capture untagged plaintext
 * @returns Discord flavored markdown, images
 */
const main = (raw: string, plaintext = false): TranslatorResult =>
{
  //Parse the HTML
  const root = parse(raw, options);

  //Translate
  const result = translate(root, plaintext);

  //Trim markdown
  result.markdown = result.markdown.trim();

  return result;
};

export default main;