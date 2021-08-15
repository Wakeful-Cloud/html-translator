/**
 * @fileoverview Table translator test
 */

//Imports
import test from 'ava';
import translator from './table';
import {options} from '../utils';
import {parse, HTMLElement} from 'node-html-parser';

//Data
const caption = 'Test Table';
const head = ['Column 1', 'Column 2', 'Column 3'];
const rows = [
  ['Cell A1', 'Cell A2', 'Cell A3'],
  ['Cell B1', 'Cell B2', 'Cell B3'],
  ['Cell C1', 'Cell C2', 'Cell C3']
];

//Derived data
const htmlHead = `<tr>\n${head.map(cell => '<th>' + cell + '</th>').join('\n')}\n</tr>`;
const htmlRows = rows.map(row => `<tr>${row.map(cell => '<td>' + cell + '</td>').join('\n')}</tr>`).join('\n');

test('translate bodiless table', ctx =>
{
  for (const rawTag of translator.tags)
  {
    //Format tag
    const tag = rawTag.toLowerCase();

    //Generate raw HTML
    const raw = `<${tag}>${htmlRows}</${tag}>`;

    //Parse
    const html = parse(raw, options).childNodes[0] as HTMLElement;

    //Translate
    const {markdown} = translator.translate(html);

    //Assert
    ctx.is(markdown,
      '```\n' +
      '╔═════════╤═════════╤═════════╗\n' +
      '║ Cell A1 │ Cell A2 │ Cell A3 ║\n' +
      '╟─────────┼─────────┼─────────╢\n' +
      '║ Cell B1 │ Cell B2 │ Cell B3 ║\n' +
      '╟─────────┼─────────┼─────────╢\n' +
      '║ Cell C1 │ Cell C2 │ Cell C3 ║\n' +
      '╚═════════╧═════════╧═════════╝\n' +
      '```');
  }
});

test('translate table with head and body', ctx =>
{
  for (const rawTag of translator.tags)
  {
    //Format tag
    const tag = rawTag.toLowerCase();

    //Generate raw HTML
    const raw = `<${tag}>\n<thead>\n${htmlHead}\n</thead>\n<tbody>\n${htmlRows}\n</tbody>\n</${tag}>`;

    //Parse
    const html = parse(raw, options).childNodes[0] as HTMLElement;

    //Translate
    const {markdown} = translator.translate(html);

    //Assert
    ctx.is(markdown,
      '```\n' +
      '╔══════════╤══════════╤══════════╗\n' +
      '║ Column 1 │ Column 2 │ Column 3 ║\n' +
      '╟──────────┼──────────┼──────────╢\n' +
      '║ Cell A1  │ Cell A2  │ Cell A3  ║\n' +
      '╟──────────┼──────────┼──────────╢\n' +
      '║ Cell B1  │ Cell B2  │ Cell B3  ║\n' +
      '╟──────────┼──────────┼──────────╢\n' +
      '║ Cell C1  │ Cell C2  │ Cell C3  ║\n' +
      '╚══════════╧══════════╧══════════╝\n' +
      '```');
  }
});

test('translate table with caption, head, and body', ctx =>
{
  for (const rawTag of translator.tags)
  {
    //Format tag
    const tag = rawTag.toLowerCase();

    //Generate raw HTML
    const raw = `<${tag}>\n<caption>${caption}</caption\n<thead>\n${htmlHead}\n</thead>\n<tbody>\n${htmlRows}\n</tbody>\n</${tag}>`;

    //Parse
    const html = parse(raw, options).childNodes[0] as HTMLElement;

    //Translate
    const {markdown} = translator.translate(html);

    //Assert
    ctx.is(markdown,
      '```\n' +
      '╔════════════════════════════════╗\n' +
      '║           Test Table           ║\n' +
      '╟──────────┬──────────┬──────────╢\n' +
      '║ Column 1 │ Column 2 │ Column 3 ║\n' +
      '╟──────────┼──────────┼──────────╢\n' +
      '║ Cell A1  │ Cell A2  │ Cell A3  ║\n' +
      '╟──────────┼──────────┼──────────╢\n' +
      '║ Cell B1  │ Cell B2  │ Cell B3  ║\n' +
      '╟──────────┼──────────┼──────────╢\n' +
      '║ Cell C1  │ Cell C2  │ Cell C3  ║\n' +
      '╚══════════╧══════════╧══════════╝\n' +
      '```');
  }
});