/**
 * @fileoverview Block-style quote translator test
 */

//Imports
import test from 'ava';
import translator from './block-quote';
import {parse, HTMLElement} from 'node-html-parser';

//Data
const quote = 'To be,\nor not to be,\nthat is the question';
const citation = 'https://example.com';

test('translate block-style quote without citation', ctx =>
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
    ctx.is(markdown, `> To be,\n> or not to be,\n> that is the question`);
  }
});

test('translate block-style quote with citation', ctx =>
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
    ctx.is(markdown, `> To be,\n> or not to be,\n> that is the question\n[Source](${citation})`);
  }
});