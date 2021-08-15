/**
 * @fileoverview Deleted text translator test
 */

//Imports
import test from 'ava';
import translator from './deleted';
import {options} from '../utils';
import {parse, HTMLElement} from 'node-html-parser';

//Data
const text = 'Hello, world!';

test('translate deleted text', ctx =>
{
  for (const rawTag of translator.tags)
  {
    //Format tag
    const tag = rawTag.toLowerCase();

    //Generate raw HTML
    const raw = `<${tag}>${text}</${tag}>`;

    //Parse
    const html = parse(raw, options).childNodes[0] as HTMLElement;

    //Translate
    const {markdown} = translator.translate(html);

    //Assert
    ctx.is(markdown, `~~${text}~~`);
  }
});