/**
 * @fileoverview Description list translator test
 */

//Imports
import test from 'ava';
import translator from './description-list';
import {parse, HTMLElement} from 'node-html-parser';

//Data
const descriptions = {
  'CSS': 'Cascading Style Sheets',
  'JS': 'Java Script',
  'HTML': 'Hyper Text Markup Language'
};

//Derived data
const htmlDescriptions = Object.entries(descriptions).map(([term, detail]) => `<dt>${term}</dt>\n<dd>${detail}</dd>`).join('\n');
const markdownDescriptions = Object.entries(descriptions).map(([term, detail]) => `**${term}**\n> ${detail}`).join('\n');

test('translate description list', ctx =>
{
  for (const rawTag of translator.tags)
  {
    //Format tag
    const tag = rawTag.toLowerCase();

    //Generate raw HTML
    const raw = `<${tag}>${htmlDescriptions}</${tag}>`;

    //Parse
    const html = parse(raw).childNodes[0] as HTMLElement;

    //Translate
    const {markdown} = translator.translate(html);

    //Assert
    ctx.is(markdown, markdownDescriptions);
  }
});