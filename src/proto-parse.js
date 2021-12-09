const parser = require('./parser.js');
const ow = require('ow').default;

/**
 * Parses a string representation of a proto file
 * @param {String} proto - The proto file string
 * @returns {Object} An AST
 */
function parse(proto) {
    ow(proto, ow.string.nonEmpty);
    return parser.parse(proto);
}

module.exports = parse;
