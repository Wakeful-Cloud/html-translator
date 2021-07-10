/**
 * @fileoverview Block-style code translator test
 */

//Imports
import test from 'ava';
import translator from './block-code';
import {parse, HTMLElement} from 'node-html-parser';

//Data
const code = `const first = 'Hello';
const second = 'world!';
const combined = first + ' ' + second;`;
const lang = 'javascript';

test('translate block-style code without a language', ctx =>
{
  for (const rawTag of translator.tags)
  {
    //Format tag
    const tag = rawTag.toLowerCase();

    //Generate raw HTML
    const raw = `<${tag}>${code}</${tag}>`;

    //Parse
    const html = parse(raw).childNodes[0] as HTMLElement;

    //Translate
    const {markdown} = translator.translate(html);

    //Assert
    ctx.is(markdown, `\`\`\`\n${code}\n\`\`\``);
  }
});

test('translate block-style code with a language', ctx =>
{
  for (const rawTag of translator.tags)
  {
    //Format tag
    const tag = rawTag.toLowerCase();

    //Generate raw HTML
    const raw = `<${tag} lang="${lang}">${code}</${tag}>`;

    //Parse
    const html = parse(raw).childNodes[0] as HTMLElement;

    //Translate
    const {markdown} = translator.translate(html);

    //Assert
    ctx.is(markdown, `\`\`\`${lang}\n${code}\n\`\`\``);
  }
});

test('translate nested block-style code with language in the parent', ctx =>
{
  //Generate raw HTML
  const raw = `<pre lang="${lang}"><code>${code}</code></pre>`;

  //Parse
  const html = parse(raw).childNodes[0] as HTMLElement;

  //Translate
  const {markdown} = translator.translate(html);

  //Assert
  ctx.is(markdown, `\`\`\`${lang}\n${code}\n\`\`\``);
});

test('translate nested block-style code with language in the child', ctx =>
{
  //Generate raw HTML
  const raw = `<pre><code lang="${lang}">${code}</code></pre>`;

  //Parse
  const html = parse(raw).childNodes[0] as HTMLElement;

  //Translate
  const {markdown} = translator.translate(html);

  //Assert
  ctx.is(markdown, `\`\`\`${lang}\n${code}\n\`\`\``);
});