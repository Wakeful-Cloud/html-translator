/**
 * @fileoverview Unordered list translator test
 */

//Imports
import test from 'ava';
import translator from './unordered-list';
import {parse, HTMLElement} from 'node-html-parser';

//Data
const items = [
  'Cascading Style Sheets',
  'Java Script',
  'Hyper Text Markup Language'
];

//Derived data
const htmlItems = items.map(item => `<li>${item}</li>`).join('\n');
const markdownItems = items.map(item => `• ${item}`).join('\n');

test('translate unordered list', ctx =>
{
  for (const rawTag of translator.tags)
  {
    //Format tag
    const tag = rawTag.toLowerCase();

    //Generate raw HTML
    const raw = `<${tag}>${htmlItems}</${tag}>`;

    //Parse
    const html = parse(raw).childNodes[0] as HTMLElement;

    //Translate
    const {markdown} = translator.translate(html);

    //Assert
    ctx.is(markdown, markdownItems);
  }
});