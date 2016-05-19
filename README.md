fray.parser
===========

Template parser

Usage
-----

```js
var parser = require('../dist/parser');

var template = '<div class="greeting">Hello world!</div>';
console.log(parser.parse(template));
```

**Output:**

```json
{
  "type": "component",
  "root": {
    "type": "tag",
    "name": "div",
    "attrs": {},
    "children": [
      {
        "type": "tag",
        "name": "div",
        "attrs": {
          "class": "greeting"
        },
        "children": [
          {
            "type": "text",
            "value": "Hello world!"
          }
        ]
      }
    ]
  }
}
```

Install
-------

    npm install fray.parser

Contributing
------------

PRs are welcome!

### Unit tests

    git clone https://github.com/frayjs/parser
    cd parser
    npm install
    npm test

References
----------

  * <http://pegjs.org/>

License
-------

MIT
