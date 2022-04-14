# q4j-proto-parse
> Utility to parse a proto3 file, forked from [lal12/proto-parse](https://github.com/lal12/proto-parse)

## Usage

```javascript
const parse = require('proto-parse');
var data = parse(fs.readFileSync('example.proto').toString());
```

No options or other parameters are currently used. Just pass the string containing the proto description to the function.

### Returns

The function returns an array containing the following elements:

```
{
    "syntax": "proto3",
    "content": [ 
        // The top level elements, see below
    ]
}
```

#### Package

```
{
    "type": "package",
    "package": "MyCompany.MyPackage"
}
```

#### Service

```
{
    "type": "service",
    "name": "a",
    "content": [
        // Contains the RPCs
    ]
}
```

#### RPC

```
{
    "type": "rpc",
    "name": "MyRPC",
    "param": ... // Contains type of param
    "returns": ... // Contains type of return value
}
```

#### Message

```
{
    "type": "message",
    "name": "MY_MESSAGE" // Name of the message
    "content": [ 
     // Contains messages, fields, enums, etc.
    ]
}
```

#### Type

```
{
    "type": "userdef", // userdef, primitive or map
    "typename": "abc" // Name of the type
}
```

#### Special case map

```
map<int32, string> bla = 1;
```

results in:

```
{
    "type": "field",
    "typename": "map",
    "key": "int32",
    "value": "string",
    "name": "bla",
    "fieldNo": 1,
    "opts": {}
}
```

### Example

```proto3
syntax = "proto3";

message SearchRequest {
	string query = 1;
	int32 page_number = 2;
	int32 result_per_page = 3;
	message Exmpl{
		oneof test_oneof {
			string name = 4;
			SubMessage sub_message = 9;
		}
	}
	enum Corpus {
		UNIVERSAL = 0;
		WEB = 1;
		IMAGES = 2;
		LOCAL = 3;
		NEWS = 4;
		PRODUCTS = 5;
		VIDEO = 6;
	}
	Corpus corpus = 4;
	map<int32, string> bla = 1;
	repeated Exmpl results = 1;
	reserved 2, 15, 9 to 11;
}
```

turns into:

```JSON
{
  "syntax": "proto3",
  "content": [
    {
      "type": "message",
      "name": "SearchRequest",
      "content": [
        {
          "type": "field",
          "repeated": false,
          "typename": "string",
          "name": "query",
          "fieldNo": 1,
          "opts": {}
        },
        {
          "type": "field",
          "repeated": false,
          "typename": "int32",
          "name": "page_number",
          "fieldNo": 2,
          "opts": {}
        },
        {
          "type": "field",
          "repeated": false,
          "typename": "int32",
          "name": "result_per_page",
          "fieldNo": 3,
          "opts": {}
        },
        {
          "type": "message",
          "name": "Exmpl",
          "content": [
            {
              "type": "oneof",
              "name": "test_oneof",
              "content": [
                {
                  "type": "field",
                  "typename": "string",
                  "name": "name",
                  "fieldNo": 4,
                  "opts": {}
                },
                {
                  "type": "field",
                  "typename": "SubMessage",
                  "name": "sub_message",
                  "fieldNo": 9,
                  "opts": {}
                }
              ]
            }
          ],
          "opts": {}
        },
        {
          "type": "enum",
          "name": "Corpus",
          "content": [
            {
              "type": "enumField",
              "name": "UNIVERSAL",
              "val": 0,
              "opts": {}
            },
            {
              "type": "enumField",
              "name": "WEB",
              "val": 1,
              "opts": {}
            },
            {
              "type": "enumField",
              "name": "IMAGES",
              "val": 2,
              "opts": {}
            },
            {
              "type": "enumField",
              "name": "LOCAL",
              "val": 3,
              "opts": {}
            },
            {
              "type": "enumField",
              "name": "NEWS",
              "val": 4,
              "opts": {}
            },
            {
              "type": "enumField",
              "name": "PRODUCTS",
              "val": 5,
              "opts": {}
            },
            {
              "type": "enumField",
              "name": "VIDEO",
              "val": 6,
              "opts": {}
            }
          ],
          "opts": {}
        },
        {
          "type": "field",
          "repeated": false,
          "typename": "Corpus",
          "name": "corpus",
          "fieldNo": 4,
          "opts": {}
        },
        {
          "type": "field",
          "typename": "map",
          "key": "int32",
          "value": "string",
          "name": "bla",
          "fieldNo": 1,
          "opts": {}
        },
        {
          "type": "field",
          "repeated": true,
          "typename": "Exmpl",
          "name": "results",
          "fieldNo": 1,
          "opts": {}
        }
      ],
      "opts": {}
    }
  ]
}
```
## Contributing

### Change the parsing rules 

1. Update the grammar in `proto.peg`
2. Run `npm run build`. This generates a new `parser.js` file with the parsing rules.

### Format and style

Fix the formatting and styling issues according to ESLint and Prettier: `npm run prettify`

### Publish a new version of the package

1. Increment the package version number before submitting a PR
2. After the PR is merged, the "Publish" workflow will automatically run to publish a new version of the package
