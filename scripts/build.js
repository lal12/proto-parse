'use strict';

const peg = require('pegjs');
const fs = require('fs');
const ow = require('ow').default;

const ESLINT_DISABLE = '/* eslint-disable */';

const inputFilePath = './src/proto.peg';
const outputFilePath = './src/parser.js';

/**
 * Writes the parser to a file
 * @param {string} filePath - The path of the file
 * @param {string} parser - The parser
 * @returns {void} void
 */
function writeParserToFile(filePath, parser) {
    ow(filePath, ow.string.nonEmpty);
    ow(parser, ow.string.nonEmpty);

    let fileText = ESLINT_DISABLE;
    fileText += '\n\n';
    fileText += parser;
    fs.writeFileSync(filePath, fileText);
}

/**
 * Builds the parser
 * @param {string} pegFilePath - The path to the PEG file
 * @param {string} outputFilePath - The path to the file to write the parser
 * @returns {void} void
 */
function buildParser(pegFilePath, outputFilePath) {
    ow(pegFilePath, ow.string.nonEmpty);
    ow(outputFilePath, ow.string.nonEmpty);

    fs.readFile(pegFilePath, function (err, data) {
        const parser = peg.generate(data.toString(), { output: 'source', format: 'commonjs' });
        writeParserToFile(outputFilePath, parser);
    });
}

buildParser(inputFilePath, outputFilePath);
