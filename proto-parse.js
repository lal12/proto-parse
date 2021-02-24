const parser = require('./parser.js');

function parse(proto){
	var data = parser.parse(proto);
	return data;
}

module.exports = parse;
