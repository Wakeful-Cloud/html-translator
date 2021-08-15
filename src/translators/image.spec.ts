/**
 * @fileoverview Image translator test
 */

//Imports
import test from 'ava';
import translator from './image';
import {options} from '../utils';
import {parse, HTMLElement} from 'node-html-parser';

//Data
const src = 'https://via.placeholder.com/256x128';
const alt = 'Placeholder';

test('translate image without alternate text', ctx =>
{
  for (const rawTag of translator.tags)
  {
    //Format tag
    const tag = rawTag.toLowerCase();

    //Generate raw HTML
    const raw = `<${tag} src="${src}">`;

    //Parse
    const html = parse(raw, options).childNodes[0] as HTMLElement;

    //Translate
    const {images} = translator.translate(html);

    //Assert
    ctx.deepEqual(images, [
      {
        src
      }
    ]);
  }
});

test('translate image with alternate text', ctx =>
{
  for (const rawTag of translator.tags)
  {
    //Format tag
    const tag = rawTag.toLowerCase();

    //Generate raw HTML
    const raw = `<${tag} alt="${alt}" src="${src}">`;

    //Parse
    const html = parse(raw, options).childNodes[0] as HTMLElement;

    //Translate
    const {images} = translator.translate(html);

    //Assert
    ctx.deepEqual(images, [
      {
        alt,
        src
      }
    ]);
  }
});