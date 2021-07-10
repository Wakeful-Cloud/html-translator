/**
 * @fileoverview Bold block-style element translator
 */

//Imports
import {Translator} from '../types';
import {table} from 'table';
import {HTMLElement, NodeType} from "node-html-parser";

/**
 * Extract data from a row
 * @param row Row to extract from
 * @returns Row data
 */
const extractRow = (row: HTMLElement) =>
{
  const data: string[] = [];

  //Iterate over cells
  for (const cell of row.childNodes)
  {
    //Only translate table cells 
    if (cell.nodeType == NodeType.ELEMENT_NODE &&
      (
        (cell as HTMLElement).tagName == 'TD' ||
        (cell as HTMLElement).tagName == 'TH')
    )
    {
      //Extract the data
      data.push(cell.text);
    }
  }

  return data;
};

//Export
export default {
  inline: false,
  tags: [
    'TABLE'
  ],
  translate: element =>
  {
    let header: string | undefined;
    const data: string[][] = [];

    //Iterate over children
    for (const child of element.childNodes)
    {
      //Only translate element nodes
      if (child.nodeType == NodeType.ELEMENT_NODE)
      {
        //Cast
        const tableChild = child as HTMLElement;

        //Get the header from the caption
        if (tableChild.tagName == 'CAPTION')
        {
          //Extract the header
          header = child.text;
        }
        //Get the data from the head or body
        else if (tableChild.tagName == 'THEAD' || tableChild.tagName == 'TBODY')
        {
          //Iterate over rows
          for (const row of tableChild.childNodes)
          {
            //Only translate table rows 
            if (child.nodeType == NodeType.ELEMENT_NODE && (row as HTMLElement).tagName == 'TR')
            {
              data.push(extractRow(row as HTMLElement));
            }
          }
        }
        //Get the data from rows
        else if (tableChild.tagName == 'TR')
        {
          data.push(extractRow(tableChild));
        }
      }
    }

    //Generate the table
    let markdown = table(data, {
      header: header != null ? {
        alignment: 'center',
        content: header
      } : undefined
    });

    //Remove trailing whitespace
    markdown = markdown.trimRight();

    //Wrap in code block
    markdown = `\`\`\`\n${markdown}\n\`\`\``;

    return {
      markdown
    };
  }
} as Translator;