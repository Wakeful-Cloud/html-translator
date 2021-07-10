/**
 * @fileoverview TypeScript types
 */

//Imports
import {HTMLElement} from 'node-html-parser';

/**
 * Basic image metadata
 */
 export interface Image
 {
   /**
    * Alternate text
    */
   alt?: string;
 
   /**
    * Fully-qualified image source URI
    */
   src: string;
 }

/**
 * Result from a translator
 */
export interface TranslatorResult
{
  /**
   * Discord flavored markdown
   */
  markdown?: string;

  /**
   * Image
   */
  image: Image;
}

/**
 * HTML5 to Discord flavored markdown translator
 */
export interface Translator
{
  /**
   * Whether this translator produces inline (`true`) or block (`false`) style elements
   */
  inline: boolean;

  /**
   * HTML5 tags this translator should be used for
   */
  tags: string[];

  /**
   * Element translator
   */
  translate: (element: HTMLElement) => TranslatorResult;
}