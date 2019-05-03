const parser = require('./parser.js');

function parse(proto){
	console.log(parser)
	var data = parser.parse(proto);
	return data;
}

module.exports = parse;