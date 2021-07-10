/**
 * @fileoverview Inline-style quote translator test
 */

//Imports
import test from 'ava';
import translator from './inline-quote';
import {parse, HTMLElement} from 'node-html-parser';

//Data
const quote = 'To be, or not to be, that is the question';
const citation = 'https://example.com';

test('translate inline-style quote without citation', ctx =>
{
  for (const rawTag of translator.tags)
  {
    //Format tag
    const tag = rawTag.toLowerCase();

    //Generate raw HTML
    const raw = `<${tag}>${quote}</${tag}>`;

    //Parse
    const html = parse(raw).childNodes[0] as HTMLElement;

    //Translate
    const {markdown} = translator.translate(html);

    //Assert
    ctx.is(markdown, `\`${quote}\``);
  }
});

test('translate inline-style quote with citation', ctx =>
{
  for (const rawTag of translator.tags)
  {
    //Format tag
    const tag = rawTag.toLowerCase();

    //Generate raw HTML
    const raw = `<${tag} cite="${citation}">${quote}</${tag}>`;

    //Parse
    const html = parse(raw).childNodes[0] as HTMLElement;

    //Translate
    const {markdown} = translator.translate(html);

    //Assert
    ctx.is(markdown, `\`${quote}\` ([Source](${citation}))`);
  }
});