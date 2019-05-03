"use strict";

const peg = require("pegjs");
const fs = require("fs");

fs.readFile('./proto.peg', function(err, data){
	const parser = peg.generate(data.toString(), {output: "source", format: "commonjs"});
	fs.writeFileSync('./parser.js', parser);
});