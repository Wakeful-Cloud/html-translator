/**
 * @fileoverview Anchor translator test
 */

//Imports
import test from 'ava';
import translator from './anchor';
import {options} from '../utils';
import {parse, HTMLElement} from 'node-html-parser';

//Data
const href = 'https://example.com';
const name = 'Example';

test('translate anchors without names', ctx =>
{
  for (const rawTag of translator.tags)
  {
    //Format tag
    const tag = rawTag.toLowerCase();

    //Generate raw HTML
    const raw = `<${tag} href="${href}"></${tag}>`;

    //Parse
    const html = parse(raw, options).childNodes[0] as HTMLElement;

    //Translate
    const {markdown} = translator.translate(html);

    //Assert
    ctx.is(markdown, `[${href}](${href})`);
  }
});

test('translate anchors with names', ctx =>
{
  for (const rawTag of translator.tags)
  {
    //Format tag
    const tag = rawTag.toLowerCase();

    //Generate raw HTML
    const raw = `<${tag} href="${href}">${name}</${tag}>`;

    //Parse
    const html = parse(raw, options).childNodes[0] as HTMLElement;

    //Translate
    const {markdown} = translator.translate(html);

    //Assert
    ctx.is(markdown, `[${name}](${href})`);
  }
});