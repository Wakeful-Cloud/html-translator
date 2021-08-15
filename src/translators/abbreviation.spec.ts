/**
 * @fileoverview Abbreviation translator test
 */

//Imports
import test from 'ava';
import translator from './abbreviation';
import {options} from '../utils';
import {parse, HTMLElement} from 'node-html-parser';

//Data
const text = 'HTML';
const title = 'Hyper Text Markup Language';

test('translate abbreviations without titles', ctx =>
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
    ctx.is(markdown, text);
  }
});

test('translate abbreviations with titles', ctx =>
{
  for (const rawTag of translator.tags)
  {
    //Format tag
    const tag = rawTag.toLowerCase();

    //Generate raw HTML
    const raw = `<${tag} title="${title}">${text}</${tag}>`;

    //Parse
    const html = parse(raw, options).childNodes[0] as HTMLElement;

    //Translate
    const {markdown} = translator.translate(html);

    //Assert
    ctx.is(markdown, `${text} (${title})`);
  }
});