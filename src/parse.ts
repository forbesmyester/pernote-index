const unified = require('unified');
const markdown = require('remark-parse');
import {VFile} from "vfile";
const toVfile = require("to-vfile");
const path = require("path");


import {writeRemarkWikiMetadata, collectRemarkWikiMetadata} from 'remark-wiki-metadata';

export default function parse(root: string, filepath: string): Promise<any> {

    return new Promise((resolve, reject) => {

        return toVfile.read(path.join(root, filepath))
            .then((vfile: VFile) => {
                return unified()
                    .use(markdown)
                    .use(collectRemarkWikiMetadata)
                    .use(writeRemarkWikiMetadata)
                    .process(vfile, function (err: Error, file: VFile) {
                        if (err) {
                            return reject(err);
                        }
                        resolve(String(file));
                    });
            });

    });

}

