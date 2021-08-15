/**
 * @fileoverview HTML translator test
 */

//Imports
import parse from 'node-html-parser';
import test from 'ava';
import translate from './translate';
import {join} from 'path';
import {options} from './utils';
import {readFileSync} from 'fs';

//Data
const raw = readFileSync(join(__dirname, 'test.html'), 'utf-8');
const markdownReference = readFileSync(join(__dirname, 'test.txt'), 'utf-8');

test('translate everything', async ctx =>
{
  //Parse
  const html = parse(raw, options);

  //Translate
  const result = translate(html, false);

  //Assert
  ctx.is(result.markdown.trim(), markdownReference);
  ctx.is(result.images.length, 2);
  ctx.deepEqual(result.images, [
    {
      src: 'https://via.placeholder.com/256x128'
    },
    {
      alt: 'Placeholder',
      src: 'https://via.placeholder.com/256x128'
    }
  ])
});