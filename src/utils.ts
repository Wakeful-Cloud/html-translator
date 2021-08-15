/**
 * @fileoverview Utilities
 */

//Imports
import {Options} from 'node-html-parser';

/**
 * Parser options
 */
export const options = {
  blockTextElements: {
    code: true,
    noscript: true,
    script: true,
    style: true
  }
} as Partial<Options>;