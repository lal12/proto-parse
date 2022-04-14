const fs = require('fs');
const parse = require('./proto-parse');

describe('tests parsing a proto file', () => {
    test('tests parsing quest.proto', () => {
        parse(fs.readFileSync('./tests/assets/quest.proto').toString());
    });
});
