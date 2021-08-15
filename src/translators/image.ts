/**
 * @fileoverview Image element translator
 */

//Imports
import {Image, Translator} from '../types';

//Export
export default {
  inline: true,
  tags: [
    'IMG'
  ],
  translate: element =>
  {
    //Ensure the image has source
    if (!element.hasAttribute('src'))
    {
      throw new Error('Image element must provide source (src)!');
    }

    //Get the source
    const src = element.getAttribute('src')!;

    //Construct the image metadata
    const image = {
      src: src
    } as Image;

    //Add alternate text
    if (element.hasAttribute('alt'))
    {
      image.alt = element.getAttribute('alt');
    }

    return {
      images: [
        image
      ]
    };
  }
} as Translator;