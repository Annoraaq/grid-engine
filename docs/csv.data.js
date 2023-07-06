import fs from 'node:fs'
import { parse } from 'csv-parse/sync'

export default {
  watch: ['./data/*.csv'],
  load(watchedFiles) {
    // watchedFiles will be an array of absolute paths of the matched files.
    // generate an array of blog post metadata that can be used to render
    // a list in the theme layout
    return watchedFiles.map(file => {
      const parsed = parse(fs.readFileSync(file, 'utf-8'), {
        skip_empty_lines: true
      });

      const splitFilePath = file.split('/');
      const fileName = splitFilePath[splitFilePath.length - 1];
      const splitFileName = fileName.split('.');
      const fileNameWithoutEnding = splitFileName[0];

      return {
        name: fileNameWithoutEnding,
        content: parsed
      };
    })
  }
}
