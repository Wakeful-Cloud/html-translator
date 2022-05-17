# HTML Translator
[![Publish](https://img.shields.io/github/workflow/status/wakeful-cloud/html-translator/Publish?label=Publish&style=flat-square)](https://github.com/wakeful-cloud/html-translator/actions/Publish)
[![NPM](https://img.shields.io/npm/v/@wakeful-cloud/html-translator?label=NPM&style=flat-square)](https://npm.im/@wakeful-cloud/html-translator)

Translate [HTML5](https://developer.mozilla.org/en-US/docs/Glossary/HTML5) to [Discord flavored markdown](https://support.discord.com/hc/en-us/articles/210298617)

## Features
* Broad element support
* Fully tested
* Written in TypeScript
* Thoroughly commented

## Caveats
* Ignores interactive elements (Buttons, inputs, switches, etc.)
* Ignores CSS
* Poor invalid HTML support
* Provides no sanitization

## Usage
1. Install the package:
```bash
npm i @wakeful-cloud/html-translator
```
2. Add the below to your Discord bot:
```javascript
//Import
import translate from '@wakeful-cloud/html-translator'; //ES Modules
const translate = require('@wakeful-cloud/html-translator'); //CommonJS

//Translate
const html = '<b>Bold text</b> followed with <i>italicized text</i>.';
const {markdown, images} = translate(html); //"**Bold text** followed with *italicized text*."

//Compose the embed (With DiscordJS)
const embed = new MessageEmbed({
  title: 'Translator Test',
  description: markdown,
  color: '#005DAA'
});

//Add image (With DiscordJS)
if (images.length > 0)
{
  embed.image = {
    url: images[0].src
  };
}

//Send (With DiscordJS)
client.send(embed);
```
*See [src/test.html](src/test.html) and [src/test.txt](src/test.txt) for a more complex example.*

## Security
You should **NOT** call this package with unsanitized or untrusted HTML! This package
provides absolutely no protection against any form of attack, you should use something
like [DOMPurify](https://github.com/cure53/DOMPurify) to sanitize HTML prior to calling
this package.