/**
 * @fileoverview Inline-style code translator test
 */

//Imports
import test from 'ava';
import translator from './inline-code';
import {options} from '../utils';
import {parse, HTMLElement} from 'node-html-parser';

//Data
const code = 'Hello, world!';

test('translate inline-style code', ctx =>
{
  for (const rawTag of translator.tags)
  {
    //Format tag
    const tag = rawTag.toLowerCase();

    //Generate raw HTML
    const raw = `<${tag}>${code}</${tag}>`;

    //Parse
    const html = parse(raw, options).childNodes[0] as HTMLElement;

    //Translate
    const {markdown} = translator.translate(html);

    //Assert
    ctx.is(markdown, `\`${code}\``);
  }
});