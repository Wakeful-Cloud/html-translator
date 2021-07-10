/**
 * @fileoverview HTML translator test
 */

//Imports
import htmlTranslator from './index';
import test from 'ava';
import {join} from 'path';
import {readFileSync} from 'fs';

//Data
const html = readFileSync(join(__dirname, 'test.html'), 'utf-8');
const markdownReference = readFileSync(join(__dirname, 'test.txt'), 'utf-8');

test('translate everything', async ctx =>
{
  //Translate
  const [markdown, images] = htmlTranslator(html);

  //Assert
  ctx.is(markdown, markdownReference);
  ctx.is(images.length, 2);
  ctx.deepEqual(images, [
    {
      src: 'https://via.placeholder.com/256x128'
    },
    {
      alt: 'Placeholder',
      src: 'https://via.placeholder.com/256x128'
    }
  ])
});