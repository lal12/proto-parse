const parser = require('./parser.js');

/**
 * Parses a string representation of a protofile
 * @param {String} proto - The protofile string
 * @returns {Object} An AST
 */
function parse(proto) {
    return parser.parse(proto);
}

module.exports = parse;
