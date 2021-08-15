/**
 * @fileoverview Line break translator test
 */

//Imports
import test from 'ava';
import translator from './line-break';
import {options} from '../utils';
import {parse, HTMLElement} from 'node-html-parser';

test('translate line breaks', ctx =>
{
  for (const rawTag of translator.tags)
  {
    //Format tag
    const tag = rawTag.toLowerCase();

    //Generate raw HTML
    const raw = `<${tag}><${tag}/><${tag} />`;

    //Parse
    const html = parse(raw, options);

    for (const child of html.childNodes)
    {
      //Translate
      const {markdown} = translator.translate(child as HTMLElement);

      //Assert
      ctx.is(markdown, '\n');
    }
  }
});